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

const VoiceQuestions = (props) => {
  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.speak('')
      Tts.setDucking(true)
      introduction()
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
  const [questions, setQuestions] = useState(QuestionList[questionControl])
  const navigation = useNavigation()
  const [items, setVoices] = useState()
  const [changeVoices, setChangeVoices] = useState(false)
  const [questionFinish, setQuestionFinish] = useState(true)
  const intro = "Hello, I will ask you few questions. It will help me analyse your depression. Please select from below options to get started"
  const [introAudVidSelect, setAutVid] = useState(true)
  const dispatch = useDispatch()
  const options = {
    sampleRate: 16000, // default 44100
    channels: 1, // 1 or 2, default 1
    bitsPerSample: 16, // 8 or 16, default 16
    audioSource: 6, // android only (see below)
    wavFile: questions.id + date + time + 'Answer.wav', // default 'audio.wav'
  }
  AudioRecord.init(options)
  const introduction = async() => {
    try{
      questionList.push({"Answer": false, "Question": "We will record your video, Press start button below", "id": -1})
      for(let i=0; i<QuestionList.length; i++)
      {
        questionList.push(QuestionList[i])
      }
      await Tts.speak(intro)
    }catch(error){
      console.log("Error from Questions introduction", error)
    }
  }

  const AudioRecording = async() => {
    try{
      setAutVid(false)
      Tts.stop()
      setTimeout(async () => {
        Tts.speak(QuestionList[questionControl].Question)
        startRecording()
      }, 500)
    }catch(error){
      console.log("Error from Audio Recording", error)
      Alert.alert("Error code: AtARx1018","It looks Audio Recording is not working. Please report error on app store with error code")
    }
  }

  const narrateQuestion = async(question) => {
    console.log("narrating question",question)
    const value = Tts.speak(question.Question)
    setQuestions(QuestionList[questionControl])
  }

  const startRecording = async() => {
    console.log('recording........')
    AudioRecord.start()
  }

  const questionFinished = () => {
    console.log('finished')
    questionControl = 0
    navigation.navigate('Profile')
  }

  const StopRecording = async () => {
    try{
      Tts.stop()
      console.log('stopping...............')
      const audioFile = await AudioRecord.stop()
      console.log('printing audioFile', audioFile)
      dispatch(voiceQuestionAnswerUpload("voice", user.id, audioFile, options.wavFile, null, null))
      if (questionControl === QuestionList.length - 1) {
        setQuestionFinish(false)
        startRecordingVoice = 0
      } else {
        questionControl = questionControl + 1
        narrateQuestion(QuestionList[questionControl])
        startRecording()
      }
    }catch(error){
      console.log("Error at stopping voice question recording")
      Alert.alert("Error code: AtSARx190118","It looks Audio Recording is not working. Please report error on app store with error code")
    }
    
  }

  const AudioVideoRecording = async() => {
    navigation.navigate("Video Questions")
  }
  console.log('rendring voice question page')

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E71DC" />
      <View style={styles.FirstHalf}>
          <View style={styles.AvatarView}>
            <Avatar
              size='small'
              rounded
              source={{
                uri: user.profileURL,
              }}
            />
            <View style={{marginLeft: 8}}>
              <Avatar
                size="small"
                rounded
                source={{
                  uri: user.AvatarImg,
                }}
              />
            </View>        
            <View
              style={styles.UserName}>
              <Text style={{ fontSize: 18 }}>{user.fullname}</Text>
            </View>
          </View>
      </View>
      <ScrollView contentContainerStyle={styles.SecondHalf}>
        
          <View>
            {/*
            <TouchableOpacity onPress={() => setChangeVoices(true)}>
              <Text style={styles.changeVoiceButton}>Change voice</Text>
            </TouchableOpacity>
            */}
            <View>
              {questionFinish && (
                <Card containerStyle={styles.cardSetting}>
                  <Avatar
                    size="small"
                    rounded
                    source={{
                      uri: user.AvatarImg,
                    }}
                  />
                    {introAudVidSelect && (
                      <View>
                        <Text style={styles.subCardIntroText}>
                          {intro}
                        </Text>
                        <View>
                          <TouchableOpacity style={styles.AudioVideoButton} onPress={()=> AudioRecording()}>
                            <Text style={styles.AudioVideoButtonText}>Audio Recording</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.AudioVideoButton} onPress={()=> AudioVideoRecording()}>
                            <Text style={styles.AudioVideoButtonText}>Audio Video Recording</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    {!introAudVidSelect && (
                      <View>
                        <Text style={styles.subCardQuestionText}>
                          {QuestionList[questionControl].Question}
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
                      </View>
                    )}
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
                    title="Finish"
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
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containertwo: {
    flex: 1,
    height: height/1.08,
    flexDirection: "column"
  },
  preview: {
    flex: 1,
    padding: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  FirstHalf: {
    
  },
  AvatarView: {
    padding: 10,
    width: width/1.1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: '4%',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  UserName: {
    justifyContent: 'center',
    paddingLeft: 15,
  },
  SecondHalf: {
    
  },
  cardSetting: {
    padding: 10,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 4,
  },
  AudioVideoButton: {
    backgroundColor: '#2E71DC',
    height: 35,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  AudioVideoButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  changeVoiceButton: {
    fontSize: 20,
  },
  subCardRecording: {
    flexDirection: 'row',
  },
  subCardIntroText: {
    marginBottom: '30%',
    marginVertical: '2%',
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subCardQuestionText: {
    marginBottom: '30%',
    marginVertical: '2%',
    alignSelf: 'center',
    fontSize: 35,
    fontWeight: 'bold',
  },
  subCardRecordingText: {
    fontStyle: 'italic',
    fontSize: 15,
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
  videoView: {
    padding: 15,
    marginTop: '65%',
  },
  videoCard: {
    width: '50%',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.3,
    elevation: 4,
  },
  VideoQuestionText: {
    padding: '5%',
    marginBottom: '20%',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 35,
    color: '#fff'
  },
  example: {
    width: '20%'
  }
})

export default VoiceQuestions