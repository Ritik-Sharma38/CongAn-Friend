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
        <Drawer.Screen name="Avatar" component={AvtarSelection} />
        <Drawer.Screen name="VoiceQuestions" component={VoiceQuestions} />
        {/*
        <Drawer.Screen name="Video" component={Video} />
        <Drawer.Screen name="VideoCall" component={Test} />
        <Drawer.Screen name="TalkToDoctor" component={TalkToDoctor} />
        <Drawer.Screen name="Survey" children={this.createSurveyStack} />
         */}
      </Drawer.Navigator>
    )
  }
}
