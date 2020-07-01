import React, { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { List, Divider } from 'react-native-paper'
import { Icon } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'
import Loading from '../components/Loading.js'
import useStatsBar from '../utils/useStatusBar'

export default function ChatRooms({ navigation }) {
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = firestore()
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
  }, [loading])

  if (loading) {
    return <Loading />
  }

  return (
    <View style={{ flex: 1 }}>
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
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
  addBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 15,
    marginRight: 10,
  },
})
