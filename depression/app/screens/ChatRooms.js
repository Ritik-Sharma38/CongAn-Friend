import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {
  List,
  Divider,
  Caption,
  Headline,
  Subheading,
} from 'react-native-paper'
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'
import Loading from '../components/Loading.js'
import { useSelector } from 'react-redux'

async function saveTokenToDatabase(token, userType, id) {
  // Add the token to the users datastore
  await firestore()
    .collection(userType)
    .doc(id)
    .set(
      {
        tokens: firestore.FieldValue.arrayUnion(token),
      },
      { merge: true }
    )
}

export default function ChatRooms({ navigation }) {
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.auth.user)
  const userType = user.profile === 'patient' ? 'users' : 'doctors'

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(userType)
      .doc(user.id)
      .collection('Messages')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            name: '',
            latestMessage: {
              text: '',
            },
            ...documentSnapshot.data(),
          }
        })

        setThreads(threads)

        if (loading) {
          setLoading(false)
        }
      })

    return () => unsubscribe()
  }, [loading, user.id, userType])

  useEffect(() => {
    // Get the device token
    messaging()
      .getToken()
      .then((token) => {
        return saveTokenToDatabase(token, userType, user.id)
      })

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      return saveTokenToDatabase(token, userType, user.id)
    })
  }, [user.id, userType])

  if (loading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
      {threads.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="message" color="#6646ee" size={150} />
          <Headline>You have no messages</Headline>
          <Subheading>Start a conversation using the add button</Subheading>
        </View>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={threads}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat', { thread: item })}>
                <List.Item
                  title={item.name}
                  description={item.latestMessage.text}
                  titleNumberOfLines={1}
                  titleStyle={styles.listTitle}
                  descriptionStyle={styles.listDescription}
                  descriptionNumberOfLines={1}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <View style={styles.addBtn}>
        <Icon
          raised
          reverse
          name="add"
          color="#6646ee"
          size={25}
          onPress={() => navigation.navigate('AddRoom')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
    color: '#6646ee',
  },
  listDescription: {
    fontSize: 16,
  },
  addBtn: {
    position: 'absolute',
    bottom: 15,
    right: 10,
  },
})
