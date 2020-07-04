import React, { useState, useEffect, useRef } from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native'
import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage,
  MessageText,
} from 'react-native-gifted-chat'
import { IconButton, Banner, Button } from 'react-native-paper'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'
import storage from '@react-native-firebase/storage'
import { Icon } from 'react-native-elements'
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'react-native-fetch-blob'
import RNFS from 'react-native-fs'
import Video from 'react-native-video'
import RNBackgroundDownloader from 'react-native-background-downloader'
import FileViewer from 'react-native-file-viewer'

async function handleSend(messages, user, userType, thread, ...media) {
  let text
  if (messages instanceof Array) text = messages[0].text
  else text = messages

  let mediaArr
  if (media.length) {
    mediaArr = media[0]
  }

  firestore()
    .collection(userType)
    .doc(user.id)
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
      ...(mediaArr != undefined &&
        mediaArr.image !== '' && { image: mediaArr.image }),
      ...(mediaArr != undefined &&
        mediaArr.video !== '' && { video: mediaArr.video }),
      ...(mediaArr != undefined &&
        mediaArr.audio !== '' && { audio: mediaArr.audio }),
      sent: true,
    })

  await firestore()
    .collection(userType)
    .doc(user.id)
    .collection('Messages')
    .doc(thread._id)
    .set(
      {
        latestMessage: {
          text,
          createdAt: new Date().getTime(),
          ...(mediaArr != undefined &&
            mediaArr.image !== '' && { image: mediaArr.image }),
          ...(mediaArr != undefined &&
            mediaArr.video !== '' && { video: mediaArr.video }),
          ...(mediaArr != undefined &&
            mediaArr.audio !== '' && { audio: mediaArr.audio }),
        },
      },
      { merge: true }
    )
}

export default function Chat({ route }) {
  const user = useSelector((state) => state.auth.user)
  const userType = user.profile === 'patient' ? 'users' : 'doctors'
  const { thread } = route.params
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [file, setFile] = useState({})
  const [uploadMsg, setUploadMsg] = useState('')
  const [pause, setPause] = useState(false)
  const player = useRef()

  console.log(user.fullname)

  useEffect(() => {
    if (loading) return
    const messagesListener = firestore()
      .collection(userType)
      .doc(user.id)
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
            received: true,
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
  }, [loading, thread._id, user.id, userType])

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const url = remoteMessage.data.file
      const fileType = remoteMessage.data.fileType
      const fileExt = remoteMessage.data.fileExt
      const fileName = remoteMessage.data.fileName
      console.log(`Received a file: ${url}`)
      console.log(`type: ${fileType}, ext:${fileExt}`)

      const media = {
        image: '',
        video: '',
        audio: '',
      }
      let other = false
      switch (fileType) {
        case 'image':
          media.image = url
          break
        case 'video':
          media.video = url
          break
        case 'audio':
          media.audio = url
          break
        default:
          other = true
      }
      let text
      if (other) text = `FILE: ${fileName}\nDownload: ${url}`
      else text = `FILE: ${fileName}`
      handleSend(text, user, userType, thread, media)
    })

    return unsubscribe
  }, [thread, user, userType])

  async function saveVideo(url, fileName) {
    const file = fileName.split(' ')[1]
    const path = `${RNBackgroundDownloader.directories.documents}/${file}`

    if (await RNFS.exists(path)) {
      FileViewer.open(path, {
        showAppsSuggestions: true,
        showOpenWithDialog: true,
      })
        .then(() => {
          console.log(`Opened ${file}`)
          return
        })
        .catch((error) => {
          console.log('Could not open', file)
          return
        })
    }

    Alert.alert('Do you want to save the video?', 'Press save if positive', [
      {
        text: 'Save',
        onPress: async () => {
          let task = RNBackgroundDownloader.download({
            id: `${user.id}_${messages.length}`,
            url: url,
            destination: path,
          })
            .begin((expectedBytes) => {
              console.log(`Going to download ${expectedBytes} bytes!`)
            })
            .progress((percent) => {
              console.log(`Downloaded: ${percent * 100}%`)
            })
            .done(() => {
              console.log(`Download is done! loc:${path}`)
              Alert.alert(
                'Download complete!',
                `Successfully downloaded ${file}`,
                [
                  {
                    text: 'Open',
                    onPress: () => {
                      FileViewer.open(path, {
                        showOpenWithDialog: true,
                        showAppsSuggestions: true,
                      })
                        .then(() => {
                          console.log(`Opened ${file}!`)
                        })
                        .catch((error) => {
                          console.log('File did not open', error)
                        })
                    },
                  },
                ]
              )
            })
            .error((error) => {
              console.log('Download canceled due to error: ', error)
            })
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  function renderMessageText(props) {
    const { currentMessage } = props
    let text = currentMessage.text.split(/\n| /)
    let x = ''
    let link = {
      isLink: false,
      url: '',
    }
    for (x of text) {
      if (x.startsWith('https://storage.googleapis.com/')) {
        link.isLink = true
        link.url = x
        break
      }
    }
    if (link.isLink) {
      console.log(text)
      let msg = `${text[0]} ${text[1]}`
      props.currentMessage.text = msg
    }
    return (
      <View>
        <View>
          <MessageText {...props} />
        </View>
        {link.isLink && (
          <View>
            <Button
              icon="download"
              mode="contained"
              color="#fff"
              style={{ margin: 5 }}
              onPress={() => Linking.openURL(link.url)}>
              Download
            </Button>
          </View>
        )}
      </View>
    )
  }

  function renderMessageVideo(props) {
    const { currentMessage } = props
    //TODO: if video exists offline, don't fetch from url
    // const file = currentMessage.text.split(' ')[1]
    // const path = `${RNBackgroundDownloader.directories.documents}/${file}`
    return (
      <View>
        <View>
          <TouchableOpacity onPress={() => player.current.seek(1)}>
            <Video
              source={{ uri: currentMessage.video }}
              ref={player}
              resizeMode="cover"
              style={styles.video}
              muted={true}
              paused={pause}
              onLoad={() => {
                player.current.seek(2)
                setPause(true)
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Button
            icon="download"
            mode="contained"
            color="#fff"
            style={{ margin: 5 }}
            onPress={() =>
              saveVideo(currentMessage.video, currentMessage.text)
            }>
            Download
          </Button>
        </View>
      </View>
    )
  }

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
            marginLeft: 50,
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontSize: 13,
            fontFamily: 'Ubuntu Mono',
          },
        }}
      />
    )
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#6646ee" />
        </View>
      </Send>
    )
  }

  function renderActions(props) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <IconButton
          icon="file-send"
          size={25}
          color="#6646ee"
          onPress={pickFile}
        />
      </View>
    )
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    )
  }

  async function pickFile() {
    try {
      setFile({})
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })

      const file = {
        uri: res.uri,
        type: res.type,
        name: res.name,
      }
      setFile(file)
      const uploadMsg = `Do you want to send ${file.name}?`
      setUploadMsg(uploadMsg)
      setVisible(true)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err
      }
    }
  }

  async function uploadToFirebase(base64, file) {
    const storageRef = storage()
      .ref()
      .child(`chatFileUpload/${userType}/${user.id}/${file.name}`)
    await storageRef.putString(base64, 'base64')
  }

  async function uploadFile() {
    setVisible(false)
    setLoading(true)
    try {
      const base64 = await RNFetchBlob.fs.readFile(file.uri, 'base64')
      await uploadToFirebase(base64, file)
      setLoading(false)
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {visible && (
        <Banner
          visible={visible}
          actions={[
            {
              label: 'Send',
              onPress: () => {
                uploadFile()
              },
            },
            {
              label: 'Cancel',
              onPress: () => {
                return setVisible(false)
              },
            },
          ]}
          icon={({ size }) => (
            <Icon
              name="file-check"
              type="material-community"
              color="#6646ee"
              size={35}
            />
          )}>
          {uploadMsg}
        </Banner>
      )}
      <View style={{ flex: 1 }}>
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#6646ee" />
          </View>
        )}
        <GiftedChat
          messages={messages}
          isTyping={true}
          onSend={(newMessage) =>
            handleSend(newMessage, user, userType, thread)
          }
          user={{ _id: user.id, name: user.name }}
          renderBubble={renderBubble}
          renderActions={renderActions}
          renderSend={renderSend}
          placeholder="Type your message here..."
          scrollToBottomComponent={scrollToBottomComponent}
          renderLoading={renderLoading}
          renderSystemMessage={renderSystemMessage}
          renderMessageVideo={renderMessageVideo}
          renderMessageText={renderMessageText}
          scrollToBottom
        />
      </View>
    </View>
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
    padding: 5,
  },
  systemMessageText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: 'grey',
  },
  video: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 100,
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#F5FCFF88',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
