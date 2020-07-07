import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ProgressBarAndroid, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { Card, Button  } from 'react-native-elements';
import {connect} from 'react-redux';
import { voiceQuestionAnswerUpload } from '../../../actions/authAction'
import { RNCamera } from 'react-native-camera'
import Tts from 'react-native-tts'
import AudioRecord from 'react-native-audio-record'
import storage from '@react-native-firebase/storage'


const { width, height } = Dimensions.get('window');

var questionList = [{"Answer": false, "Question": "We will record your video, Press start button below", "id": -1}, {"Answer": false, "Question": "How are you doing today?", "id": 0}, {"Answer": false, "Question": "- Where are you from originally?", "id": 1}, {"Answer": false, "Question": "How do you like it there?", "id": 2}, {"Answer": false, "Question": "What are the things you like the most about it?", "id": 3}, {"Answer": false, "Question": "How easy for you to get adjusted to your place?", "id": 4}, {"Answer": false, "Question": "What is it that you don't really like about the place?", "id": 5}, {"Answer": false, "Question": "What did you study at the school?", "id": 6}, {"Answer": false, "Question": "Do you still pursue it?", "id": 7}, {"Answer": false, "Question": "What is your dream job?", "id": 8}, {"Answer": false, "Question": "How hard is that?", "id": 9}, {"Answer": false, "Question": "- Do you travel a lot?", "id": 10}, {"Answer": false, "Question": "How often do you go to your hometown?", "id": 11}, {"Answer": false, "Question": "Who is someone that is a positive influence in your life?", "id": 12}, {"Answer": false, "Question": "- Do you have roommates?", "id": 13}, {"Answer": false, "Question": "- Do you consider yourself an introvert?", "id": 14}, {"Answer": false, "Question": "Why?", "id": 15}, {"Answer": false, "Question": "How are you at controlling your anger?", "id": 16}, {"Answer": false, "Question": "When was the last time you argued with someone and what was it about?", "id": 17}, {"Answer": false, "Question": "Is there anything that you regret?", "id": 18}, {"Answer": false, "Question": "What was the most memorable memory you've had?", "id": 19}, {"Answer": false, "Question": "How easy is it to get a good night's sleep?", "id": 20}, {"Answer": false, "Question": "How often do you get good sleep?", "id": 21}, {"Answer": false, "Question": "How are you when you don't get enough sleep?", "id": 22}, {"Answer": false, "Question": "Do you feel down?", "id": 23}, {"Answer": false, "Question": "Have you ever been diagnosed with depression?", "id": 24}, {"Answer": false, "Question": "Were you ever diagnosed with PTSD? ", "id": 25}, {"Answer": false, "Question": "Did you serve in military?", "id": 26}, {"Answer": false, "Question": "How would your best friend describe you?", "id": 27}, {"Answer": false, "Question": "How do you know them?", "id": 28}, {"Answer": false, "Question": "How close are you to them?", "id": 29}, {"Answer": false, "Question": "What do you do to relax?", "id": 30}, {"Answer": false, "Question": "What advice will you give yourself in the next ten to twenty years?", "id": 31}, {"Answer": false, "Question": "What was the last time you were really happy?", "id": 32}, {"Answer": false, "Question": "What do you think of today's kids?", "id": 33}]
var currentquestion = questionList[0]
var date = new Date().getDate()
var month = new Date().getMonth() + 1
var year = new Date().getFullYear()
var hours = new Date().getHours()
var min = new Date().getMinutes()
var sec = new Date().getSeconds()
var date = '_' + date + '_' + month + '_' + year + '_'
var time = hours + '_' + min + '_' + sec + '_'

class VideoQuestions extends Component {

  state = {
    classQuestionControl: 0,
    videoUri: '',
  }
  
  componentWillMount(){
    Tts.getInitStatus().then(() => {
      Tts.speak('')
      Tts.setDucking(true)
    })
    this.voiceQuestion()
  }

  record = async () => {
    try {
      if (this.camera) {
        Tts.stop()
        Tts.speak(questionList[this.state.classQuestionControl].Question)
        console.log("starting recording.....")
        const options = { maxDuration: 120 };
        const data = await this.camera.recordAsync(options);
        this.setState({ videoUri: data.uri})
        const videoName = currentquestion.id + date + time + 'Answer'
        console.log("...from start recording...", this.state.videoUri)
        this.props.voiceQuestionAnswerUpload("video", this.props.user.id, data.uri, videoName )
        if(this.state.classQuestionControl === questionList.length -1){
          console.log("finished")
        }else{
          console.log("......control variables...", questionList.length, this.state.classQuestionControl)
          this.setState({ classQuestionControl : this.state.classQuestionControl + 1})
          console.log("...variable counter....", this.state.classQuestionControl)
          currentquestion = questionList[this.state.classQuestionControl]
          console.log(".....current question......", currentquestion)
        }
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
      const data = await this.camera.stopRecording();
      console.log("...from stop recording.." );
      setTimeout(() => {
        console.log("calling record function again.....")
        this.record()
      }, 500);
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
    console.log("....props....",this.props.navigation)
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

const mapStateToProps = (state) => ({
  user: state.auth.user,
  progressBarStatus: state.auth.progressBarStatus
});
const mapDispatch = { voiceQuestionAnswerUpload };
export default connect(mapStateToProps,mapDispatch)(VideoQuestions);

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
 