import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ProgressBarAndroid, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { Card, Button, Avatar  } from 'react-native-elements';
import {connect} from 'react-redux';
import { voiceQuestionAnswerUpload } from '../../../actions/authAction'
import { RNCamera } from 'react-native-camera'
import Tts from 'react-native-tts'

const { width, height } = Dimensions.get('window');

var intro = [{"Answer": false, "Question": "We will record your video, Press start button below", "id": -1}]
var questionList = []
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
    classQuestionControl: 33,
    videoUri: '',
    start: true,
    questionFinish: false
  }
  
  componentWillMount(){
    Tts.getInitStatus().then(() => {
      Tts.speak('')
      Tts.setDucking(true)
    })
    try{
      questionList = this.props.QuestionList
      this.voiceQuestion()
    }catch(error){
      console.log("Error" + error)
    }
  }

  record = async () => {
    try {
      if (this.camera) {
        this.setState({ start: false})
        Tts.stop()
        Tts.speak(questionList[this.state.classQuestionControl].Question)
        console.log("starting recording.....")
        const options = { maxDuration: 120 };
        const data = await this.camera.recordAsync(options);
        this.setState({ videoUri: data.uri})
        const videoName = currentquestion.id + date + time + 'Answer'
        //this.props.voiceQuestionAnswerUpload("video", this.props.user.id, data.uri, videoName )
        if(this.state.classQuestionControl === questionList.length -1){
          console.log("finished")
          this.setState({ questionFinish: true})
        }else{
          this.setState({ classQuestionControl : this.state.classQuestionControl + 1})
          currentquestion = questionList[this.state.classQuestionControl]
        }
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
      Tts.speak(intro[0].Question)
      currentquestion=questionList[this.state.classQuestionControl]
    }catch(error){
      console.log("Error from voiceQuestion class component", error)
    }
  }

  questionFinished = () => {
    this.props.navigation.navigate('Profile')
  }

  render() {
    console.log("....props....",questionList)
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
            <View style={styles.front}>
              <View style={styles.FirstHalf}>
                <View style={styles.AvatarView}>
                  <Avatar
                    size='small'
                    rounded
                    source={{
                      uri: this.props.user.profileURL,
                    }}
                  />
                  <View style={{marginLeft: 8}}>
                    <Avatar
                      size="small"
                      rounded
                      source={{
                        uri: this.props.user.AvatarImg,
                      }}
                    />
                  </View>        
                  <View
                    style={styles.UserName}>
                    <Text style={{ fontSize: 18 }}>{this.props.user.fullname}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 0, justifyContent: 'center' }}>
              {!this.state.questionFinish && (
                <View>
                  {this.state.start && (
                    <View>
                      <View>
                        <Text style={styles.VideoQuestionText}>{intro[0].Question}</Text>
                      </View>
                      <TouchableOpacity onPress={this.record} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> start </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  {!this.state.start && (
                    <View>
                      <View>
                        <Text style={styles.VideoQuestionText}>{questionList[this.state.classQuestionControl].Question}</Text>
                      </View>
                      <Text style={styles.subCardRecordingText}>Recording....</Text>
                      <TouchableOpacity onPress={this.stopRecord.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> Finish recording </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>       
            {this.state.questionFinish && 
              (
                <View>
                    <View style={styles.SecondHalf}>
                      <Card containerStyle={{ borderRadius: 5, width: width / 1.1 }}>
                        <Avatar
                          size="small"
                          rounded
                          source={{
                            uri: this.props.user.AvatarImg,
                          }}
                        />
                        <Text style={styles.subCardFinishQuestionText}>
                          Thank you. Your ansers are recorded. You will get reports after
                          sometime in Reports section of profile.
                        </Text>
                        <Button
                          onPress={() => this.questionFinished()}
                          buttonStyle={{ borderRadius: 5 }}
                          title="Finish"
                        />
                      </Card>
                    </View>
              </View>
            )
          }
        </RNCamera>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  QuestionList: state.auth.QuestionList,
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
  front: {
    flex: 1
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
    marginTop: width/3,
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
    paddingLeft: 15,
    fontStyle: 'italic',
    fontSize: 16,
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
 