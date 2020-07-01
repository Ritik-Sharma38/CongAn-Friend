import { Icon } from 'react-native-elements'
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { List, Divider, IconButton, Title } from 'react-native-paper'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import Loading from '../components/Loading.js'
import firestore from '@react-native-firebase/firestore'

export default function AddRoomScreen({ navigation }) {
  const [loading, setLoading] = useState(true)
  // const [Name, setName] = useState('')
  const [docs, setDocs] = useState([])

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('doctors')

      .onSnapshot((querySnapshot) => {
        const docs = querySnapshot.docs.map((documentSnapshot) => {
          return {
            ...documentSnapshot.data(),
          }
        })

        setDocs(docs)

        if (loading) {
          setLoading(false)
        }
      })

    return () => unsubscribe()
  }, [loading])

  if (loading) {
    return <Loading />
  }

  function handleButtonPress(docData) {
    if (docData.id != undefined) {
      const Name = docData.DoctorProfileDetails.Full_Name
      firestore()
        .collection('Messages')
        .add({
          name: Name,
          latestMessage: {
            text: `Started conversation with ${Name}.`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection('Texts').add({
            text: `Started coversation with ${Name}.`,
            createdAt: new Date().getTime(),
            system: true,
          })
          // console.log(docRef.id)
          navigation.navigate('Chat', { thread: { _id: docRef.id } })
        })
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <FlatList
          data={docs}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <List.Item
              title={item.DoctorProfileDetails.Full_Name}
              description={item.DoctorProfileDetails.hospitalClinicName}
              left={(props) => (
                <List.Icon {...props} icon="doctor" color="#6646ee" />
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
