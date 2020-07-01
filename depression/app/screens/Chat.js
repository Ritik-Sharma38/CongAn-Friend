import React, { useState, useEffect } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat'
import { IconButton } from 'react-native-paper'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'

export default function Chat({ route }) {
  const user = useSelector((state) => state.auth.user)
  const { thread } = route.params
  const [messages, setMessages] = useState([])

  console.log(user.fullname)

  async function handleSend(messages) {
    const text = messages[0].text

    firestore()
      .collection('Messages')
      .doc(thread._id)
      .collection('Texts')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.id,
          email: user.email,
        },
      })

    await firestore()
      .collection('Messages')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true }
      )
  }

  useEffect(() => {
    const messagesListener = firestore()
      .collection('Messages')
      .doc(thread._id)
      .collection('Texts')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data()

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          }

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            }
          }

          return data
        })

        setMessages(messages)
      })

    return () => messagesListener()
  }, [thread._id])

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    )
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    )
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    )
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={30} color="#6646ee" />
        </View>
      </Send>
    )
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessage) => handleSend(newMessage)}
      user={{ _id: user.id, name: user.name }}
      renderBubble={renderBubble}
      renderSend={renderSend}
      placeholder="Type your message here..."
      scrollToBottomComponent={scrollToBottomComponent}
      renderLoading={renderLoading}
      renderSystemMessage={renderSystemMessage}
      showUserAvatar
      alwaysShowSend
      scrollToBottom
    />
  )
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 5,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: '#fff',
  },
})
