import { Icon } from 'react-native-elements'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { View, StyleSheet, ScrollView, FlatList, Text } from 'react-native'
import { List, Divider } from 'react-native-paper'
import Loading from '../components/Loading.js'
import firestore from '@react-native-firebase/firestore'

export default function AddRoomScreen({ navigation }) {
  const [loading, setLoading] = useState(true)
  const [contacts, setContact] = useState([])
  const user = useSelector((state) => state.auth.user)
  const profile = user.profile === 'patient' ? 'doctors' : 'users'
  const userType = profile === 'doctors' ? 'users' : 'doctors'

  useEffect(() => {
    const unsubscribe = firestore()
      .collection(profile)
      .onSnapshot((querySnapshot) => {
        const contact = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
          }
        })

        setContact(contact)

        if (loading) {
          setLoading(false)
        }
      })

    return () => unsubscribe()
  }, [loading, profile])

  if (loading) {
    return <Loading />
  }

  async function handleButtonPress(docData) {
    if (docData.id != undefined) {
      const Name =
        profile === 'doctors'
          ? docData.DoctorProfileDetails.Full_Name
          : docData.fullname

      let exists = {
        state: false,
        _id: 0,
        talkingTo: 0,
      }
      const msgRef = firestore()
        .collection(userType)
        .doc(user.id)
        .collection('Messages')
      await msgRef.get().then((msgs) => {
        msgs.forEach((msg) => {
          if (msg.data().name === Name) {
            exists.state = true
            exists._id = msg.id
            exists.talkingTo = docData.id
            console.log(exists)
            return exists
          }
        })
      })

      if (exists.state) {
        console.log('chat exists..')
        navigation.navigate('Chat', {
          thread: { _id: exists._id, talkingTo: exists.talkingTo },
        })
      } else {
        const sendRef = firestore().collection(profile)
        await sendRef
          .doc(docData.id)
          .collection('Messages')
          .add({
            name: user.fullname,
            latestMessage: {
              text: `${user.fullname} started a conversation with you.`,
              createdAt: new Date().getTime(),
            },
          })
          .then((docRef) => {
            docRef.collection('Texts').add({
              text: `${user.fullname} started a conversation with you.`,
              createdAt: new Date().getTime(),
              system: true,
            })
          })

        const userRef = firestore().collection(userType)
        await userRef
          .doc(user.id)
          .collection('Messages')
          .add({
            name: Name,
            latestMessage: {
              text: `Started a conversation with ${Name}.`,
              createdAt: new Date().getTime(),
            },
          })
          .then((docRef) => {
            docRef.collection('Texts').add({
              text: `Started a coversation with ${Name}.`,
              createdAt: new Date().getTime(),
              system: true,
            })
            // console.log(docRef.id)
            navigation.navigate('Chat', {
              thread: { _id: docRef.id, talkingTo: docData.id },
            })
          })
      }
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
            marginBottom: 5,
          }}>
          <Icon
            name="address-book"
            type="font-awesome"
            size={25}
            color="#6646ee"
          />
        </View>
        <Divider />
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <List.Item
              title={
                profile === 'doctors'
                  ? 'DoctorProfileDetails' in item
                    ? item.DoctorProfileDetails.Full_Name
                    : 'No Name'
                  : item.fullname
              }
              description={
                profile === 'doctors'
                  ? 'DoctorProfileDetails' in item
                    ? item.DoctorProfileDetails.hospitalClinicName
                    : 'null'
                  : item.email
              }
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={profile === 'doctors' ? 'doctor' : 'account-circle'}
                  color="#6646ee"
                />
              )}
              right={(props) => (
                <List.Icon {...props} icon="send" color="#6646ee" />
              )}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              onPress={() => handleButtonPress(item)}
            />
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  addBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 15,
    marginRight: 10,
  },
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 5,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: 22,
    color: '#6646ee',
  },
  listDescription: {
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  buttonLabel: {
    fontSize: 22,
  },
})
