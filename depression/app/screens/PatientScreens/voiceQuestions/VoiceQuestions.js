import React, { Component, useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Button,
  ProgressBarAndroid,
  StatusBar,
  Alert,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Avatar, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tts from 'react-native-tts'
import AudioRecord from 'react-native-audio-record'
import { voiceQuestionAnswerUpload } from '../../../actions/authAction'

const { width, height } = Dimensions.get('window')

var questionControl = 0
var voiceControl = 0
var startRecordingVoice = 0

const VoiceQuestions = () => {
  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.speak('')
      Tts.setDucking(true)
      voiceControl = 1
      startRecordingVoice = 1
    })
    Tts.voices().then((voices) => setVoices(voices))
  }, [])
  var date = new Date().getDate()
  var month = new Date().getMonth() + 1
  var year = new Date().getFullYear()
  var hours = new Date().getHours()
  var min = new Date().getMinutes()
  var sec = new Date().getSeconds()
  var date = '_' + date + '_' + month + '_' + year + '_'
  var time = hours + '_' + min + '_' + sec + '_'
  const user = useSelector((state) => state.auth.user)
  const QuestionList = useSelector((state) => state.auth.QuestionList)
  const [questions, setQuestions] = useState(QuestionList[voiceControl])
  const navigation = useNavigation()
  const [items, setVoices] = useState()
  const [changeVoices, setChangeVoices] = useState(false)
  const [questionFinish, setQuestionFinish] = useState(true)
  const [audioFile, setAudioFile] = useState([])
  const dispatch = useDispatch()
  const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: questions.id + date + time + 'Answer.wav', // default 'audio.wav'
  }
  AudioRecord.init(options)

  if (voiceControl) {
    if (questionFinish) {
      setTimeout(async () => {
        console.log('narrating question')
        await Tts.speak(questions.Question)
      }, 800)
    }
  }

  if (startRecordingVoice) {
    console.log('recording........')
    AudioRecord.start()
  }

  const questionFinished = () => {
    console.log('finished')
    questionControl = 0
    navigation.navigate('Profile')
  }

  const StopRecording = async () => {
    Tts.stop()
    console.log('stopping...............')
    const audioFile = await AudioRecord.stop()
    console.log('printing audioFile', audioFile)
    dispatch(voiceQuestionAnswerUpload(user.id, audioFile, options.wavFile))
    if (questionControl === QuestionList.length - 1) {
      setQuestionFinish(false)
      startRecordingVoice = 0
    } else {
      questionControl = questionControl + 1
      setQuestions(QuestionList[questionControl])
    }
    console.log('printing audio file', audioFile)
  }

  console.log('printing doctorlist', questions)
  console.log('rendring voice question page')

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E71DC" />
      <View style={styles.FirstHalf}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Icon.Button
            backgroundColor="#2E71DC"
            name="menu"
            onPress={() => navigation.openDrawer()}
          />
          <View style={{ flexDirection: 'row', marginHorizontal: '20%' }}>
            <Avatar
              size="large"
              rounded
              source={{
                uri: user.profileURL,
              }}
              showEditButton
              onEditPress={() => alert('not allowed now')}
            />
            <Avatar
              size="large"
              rounded
              source={{
                uri: user.AvatarImg,
              }}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <Text style={{ fontSize: 18, color: '#fff' }}>{user.fullname}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.SecondHalf}>
        <TouchableOpacity onPress={() => setChangeVoices(true)}>
          <Text style={styles.changeVoiceButton}>Change voice</Text>
        </TouchableOpacity>
        <View>
          {questionFinish && (
            <Card containerStyle={{ borderRadius: 8, width: width / 1.1 }}>
              <Avatar
                size="small"
                rounded
                source={{
                  uri: user.AvatarImg,
                }}
              />
              <Text style={styles.subCardQuestionText}>
                {questions.Question}
              </Text>
              <View>
                <View>
                  <Text style={styles.subCardRecordingText}>Recording....</Text>
                </View>
                <View>
                  <Button
                    onPress={() => StopRecording()}
                    title="Finish Recording"
                  />
                </View>
              </View>
            </Card>
          )}
          {!questionFinish && (
            <Card containerStyle={{ borderRadius: 5, width: width / 1.1 }}>
              <Avatar
                size="small"
                rounded
                source={{
                  uri: user.AvatarImg,
                }}
              />
              <Text style={styles.subCardFinishQuestionText}>
                Thank you. Your ansers are recorded. You will get reports after
                sometime in Reports section of profile.
              </Text>
              <Button
                onPress={() => questionFinished()}
                buttonStyle={{ borderRadius: 5 }}
                title="Finished"
              />
            </Card>
          )}
        </View>
        <View>
          {changeVoices && (
            <View>
              {items.map((item) => (
                <ListItem
                  leftAvatar={{
                    title: item.language,
                    source: {
                      uri:
                        'https://cdn2.iconfinder.com/data/icons/calendar-36/64/5-512.png',
                    },
                  }}
                  title={item.language}
                  subtitle={item.name}
                  onPress={() => setChangeVoices(false)}
                  chevron
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FirstHalf: {
    backgroundColor: '#2E71DC',
  },
  SecondHalf: {},
  AvailableDoc: {
    fontSize: 25,
    padding: 8,
  },
  appointment: {
    padding: 10,
    fontSize: 25,
  },
  appointmentBox: {
    height: height / 4,
    backgroundColor: '#fff',
  },
  card: {
    borderRadius: 7,
    width: width / 1.07,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  image: {
    width: width / 1.155,
    height: width / 1.155,
    borderRadius: 3,
  },
  DocName: {
    fontSize: 25,
    padding: 10,
  },
  message: {
    paddingLeft: 19,
    fontSize: 15,
  },
  appointmentButton: {
    backgroundColor: '#2E71DC',
    height: 40,
    marginHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  Lbutton: {
    backgroundColor: '#2E71DC',
    height: 40,
    marginHorizontal: 25,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: width / 2.9,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  Rbutton: {
    backgroundColor: '#2E71DC',
    height: 40,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: width / 2.9,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  changeVoiceButton: {
    fontSize: 20,
  },
  subCardRecording: {
    flexDirection: 'row',
  },
  subCardQuestionText: {
    marginBottom: '30%',
    marginVertical: '2%',
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
  subCardRecordingText: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  subCardFinishQuestionText: {
    marginBottom: '2%',
    marginVertical: '2%',
    alignSelf: 'center',
    fontSize: 20,
  },
  subCardAvatar: {
    flexDirection: 'row',
  },
})

export default VoiceQuestions
