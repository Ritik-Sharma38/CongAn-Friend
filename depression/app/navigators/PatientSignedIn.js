import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from '../screens/PatientScreens/profile/patient'
import Video from '../screens/video'
import AvtarSelection from '../screens/PatientScreens/avatar/index'
import Test from '../screens/test'
import TalkToDoctor from '../screens/PatientScreens/talkToDoctor/TalkToDoctor'
import VoiceQuestions from '../screens/PatientScreens/voiceQuestions/VoiceQuestions'
import SurveyScreen from '../screens/PatientScreens/Survey/SurveyScreen'
import SurveyComplete from '../screens/PatientScreens/Survey/SurveyComplete'
import HealthTimeline from '../screens/PatientScreens/HealthTimeline/HealthTimeline'
import SelectedDoctorInformation from '../screens/PatientScreens/selectedDoctor/SelectedDoctor' 
import SubscriptionType from '../screens/PatientScreens/talkToDoctor/Payment/SubscriptionType'
import RecorderTest from '../screens/PatientScreens/recorder/RecorderTest'
import BookedAppointment from '../screens/PatientScreens/talkToDoctor/BookedAppointment/BookedAppointment'
import VideoScreen from '../components/VideoScreen'
import ExampleApp from '../screens/ExampleApp'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

export class PatientSignedIn extends Component {
  createSurveyStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
      <Stack.Screen name="SurveyComplete" component={SurveyComplete} />
    </Stack.Navigator>
  )

  render() {
    return (
      <Drawer.Navigator
        initialRouteName="Profile"
        screenOptions={{
          header: () => null,
        }}>
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Change Avatar" component={AvtarSelection} />
        <Drawer.Screen name="Voice Questions" component={VoiceQuestions} />
        <Drawer.Screen name="Health Timeline" component={HealthTimeline} />
        {/*<Drawer.Screen name="Video" component={Video} />*/}
        <Drawer.Screen name="Video_Call" component={Test} />
        <Drawer.Screen name="Talk To Doctor" component={TalkToDoctor} />
        <Drawer.Screen name="Selected Doctor" component={SelectedDoctorInformation} />
        <Drawer.Screen name="Subscription" component={SubscriptionType} />
        <Drawer.Screen name="recorder" component={RecorderTest} />
        <Drawer.Screen name="Booked Appointment" component={BookedAppointment} />
        <Drawer.Screen name="Video call" component={VideoScreen} />
        <Drawer.Screen name="ExampleApp" component={ExampleApp} />
        {/*
        <Drawer.Screen name="Survey" children={this.createSurveyStack} />
         */}
      </Drawer.Navigator>
    )
  }
}
