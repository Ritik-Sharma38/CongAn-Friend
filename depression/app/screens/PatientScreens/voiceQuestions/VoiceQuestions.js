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
import { RNCamera } from 'react-native-camera'
import {connect} from 'react-redux';

const { width, height } = Dimensions.get('window')

var questionControl = 0
var voiceControl = 0
var startRecordingVoice = 0
var questionList = [{"Answer": false, "Question": "We will record your video, Press start button below", "id": -1}, {"Answer": false, "Question": "How are you doing today?", "id": 0}, {"Answer": false, "Question": "- Where are you from originally?", "id": 1}, {"Answer": false, "Question": "How do you like it there?", "id": 2}, {"Answer": false, "Question": "What are the things you like the most about it?", "id": 3}, {"Answer": false, "Question": "How easy for you to get adjusted to your place?", "id": 4}, {"Answer": false, "Question": "What is it that you don't really like about the place?", "id": 5}, {"Answer": false, "Question": "What did you study at the school?", "id": 6}, {"Answer": false, "Question": "Do you still pursue it?", "id": 7}, {"Answer": false, "Question": "What is your dream job?", "id": 8}, {"Answer": false, "Question": "How hard is that?", "id": 9}, {"Answer": false, "Question": "- Do you travel a lot?", "id": 10}, {"Answer": false, "Question": "How often do you go to your hometown?", "id": 11}, {"Answer": false, "Question": "Who is someone that is a positive influence in your life?", "id": 12}, {"Answer": false, "Question": "- Do you have roommates?", "id": 13}, {"Answer": false, "Question": "- Do you consider yourself an introvert?", "id": 14}, {"Answer": false, "Question": "Why?", "id": 15}, {"Answer": false, "Question": "How are you at controlling your anger?", "id": 16}, {"Answer": false, "Question": "When was the last time you argued with someone and what was it about?", "id": 17}, {"Answer": false, "Question": "Is there anything that you regret?", "id": 18}, {"Answer": false, "Question": "What was the most memorable memory you've had?", "id": 19}, {"Answer": false, "Question": "How easy is it to get a good night's sleep?", "id": 20}, {"Answer": false, "Question": "How often do you get good sleep?", "id": 21}, {"Answer": false, "Question": "How are you when you don't get enough sleep?", "id": 22}, {"Answer": false, "Question": "Do you feel down?", "id": 23}, {"Answer": false, "Question": "Have you ever been diagnosed with depression?", "id": 24}, {"Answer": false, "Question": "Were you ever diagnosed with PTSD? ", "id": 25}, {"Answer": false, "Question": "Did you serve in military?", "id": 26}, {"Answer": false, "Question": "How would your best friend describe you?", "id": 27}, {"Answer": false, "Question": "How do you know them?", "id": 28}, {"Answer": false, "Question": "How close are you to them?", "id": 29}, {"Answer": false, "Question": "What do you do to relax?", "id": 30}, {"Answer": false, "Question": "What advice will you give yourself in the next ten to twenty years?", "id": 31}, {"Answer": false, "Question": "What was the last time you were really happy?", "id": 32}, {"Answer": false, "Question": "What do you think of today's kids?", "id": 33}]
var currentquestion = {}
var currentUser = {}
var date = new Date().getDate()
var month = new Date().getMonth() + 1
var year = new Date().getFullYear()
var hours = new Date().getHours()
var min = new Date().getMinutes()
var sec = new Date().getSeconds()
var date = '_' + date + '_' + month + '_' + year + '_'
var time = hours + '_' + min + '_' + sec + '_'
var videoData = {
  video: false,
  videoName: '',
  videofile: '',
  audfile: '',
  audName: ''
}

class Example extends Component {
  constructor(){
    super();
  }
  state = {
    classQuestionControl: 0,
    videoUri: {},
    options: {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: currentquestion.id + date + time + 'Answer.wav', // default 'audio.wav'
    }
  }
  
  componentWillMount(){
    Tts.getInitStatus().then(() => {
      Tts.speak('')
      Tts.setDucking(true)
    })
    console.log("calling....record and voice fucntions")
    AudioRecord.init(this.state.options)
    this.voiceQuestion()
  }
  record = async () => {
    try {
      if (this.camera) {
        Tts.stop()
        Tts.speak(questionList[this.state.classQuestionControl].Question)
        console.log("starting recording.....")
        const options = { maxDuration: 120 };
        //AudioRecord.start()
        const data = await this.camera.recordAsync(options);
        this.setState({ videoUri: data.uri})
        console.log("...from start recording...", this.state.videoUri)
      }else {
        console.log("else.........")
      }
    }catch(error){
      console.log("Error from record", error)
      Alert.alert("Error in Video Recording", "Please report error and restart the application \n Error:")
    }
  };
  stopRecord = async () => {
    if (this.camera) {
      Tts.stop()
      //const audioFile = await AudioRecord.stop()
      const data = await this.camera.stopRecording();
      console.log("...from stop recording.." );
      const videoName = currentquestion.id + date + time + 'Answer'
      console.log("videoName", videoName)
      videoData = {
        video: true,
        videoName: videoName,
        videofile: this.state.videoUri,
        audfile: null,
        audName: this.state.options.wavFile
      }
      //this.voiceQuestionAnswerUpload("video", currentUser.id, audioFile, this.state.options.wavFile , this.state.videoUri, videoName )
      if(this.state.classQuestionControl === questionList.length -1){
        console.log("finished")
      }else{
        console.log("......control variables...", questionList.length, this.state.classQuestionControl)
        this.setState({ classQuestionControl : this.state.classQuestionControl + 1})
        console.log("...variable counter....", this.state.classQuestionControl)
        currentquestion = questionList[this.state.classQuestionControl]
        console.log(".....current question......", currentquestion)
        setTimeout(() => {
          this.record()
        }, 500);
      }
    }
  };
  voiceQuestion = async () => {
    try{
      Tts.stop()
      Tts.speak(questionList[this.state.classQuestionControl].Question)
      currentquestion=questionList[this.state.classQuestionControl]
    }catch(error){
      console.log("Error from voiceQuestion class component", error)
    }
  }
  render() {
    console.log("printign length............")
    return (
      <View style={styles.containertwo}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          <View>
            <Text style={styles.VideoQuestionText}>{questionList[this.state.classQuestionControl].Question}</Text>
          </View>
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.record} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> start </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.stopRecord.bind(this)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> Stop </Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      </View>
    );
  }
}

const mapState = (state) => ({
  progressBarStatus: state.auth.progressBarStatus,
})

const mapDispatch = {voiceQuestionAnswerUpload};
connect(mapState, mapDispatch)(Example)

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
  currentUser = user
  const QuestionList = useSelector((state) => state.auth.QuestionList)
  const [questions, setQuestions] = useState(QuestionList[questionControl])
  const navigation = useNavigation()
  const [items, setVoices] = useState()
  const [changeVoices, setChangeVoices] = useState(false)
  const [questionFinish, setQuestionFinish] = useState(true)
  const [audioFile, setAudioFile] = useState([])
  const intro = "Hello, I will ask you few questions. It will help me analyse your depression. Please select from below options to get started"
  const [introAudVidSelect, setAutVid] = useState(true)
  const [videoDisplay, setVidDisplay] = useState(false)
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

  if (videoData.video) {
    console.log("calling.... upload function", videoData)
    dispatch(voiceQuestionAnswerUpload("video", currentUser.id, videoData.audfile, videoData.audName , videoData.videofile, videoData.videoName ))
    videoData = {
      ...videoData,
      video: false,
    }
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
    navigation.navigate("Video Questions", {questionList} )
  }
  console.log('rendring voice question page', props)

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
        { !videoDisplay && (
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
          </View>
        )}
        {videoDisplay && (
          <View style={styles.containertwo}>
            <Example/>
          </View>
        )}
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