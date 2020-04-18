import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import ProfileScreen from '../screens/profile/patient'
import Video from '../screens/video'
import AvtarSelection from '../screens/avatar'
import Test from '../screens/test'
import TalkToDoctor from '../screens/PatientScreens/TalkToDoctor'
import SurveyCompletedScreen from '../screens/Survey/SurveyComplete'
import SurveyScreen from '../screens/Survey/SurveyScreen'

const Drawer = createDrawerNavigator()

export const PatientSignedIn = () => (
  <Drawer.Navigator
    initialRouteName="Profile"
    screenOptions={{
      header: () => null
    }}>
    <Drawer.Screen name="Profile" component={ProfileScreen} />
    <Drawer.Screen name="Video" component={Video} />
    <Drawer.Screen name="Avatar" component={AvtarSelection} />
    <Drawer.Screen name="VideoCall" component={Test} />
    <Drawer.Screen name="TalkToDoctor" component={TalkToDoctor} />
    <Drawer.Screen name="SurveyScreen" component={SurveyScreen} />
    <Drawer.Screen name="SurveyComplete" component={SurveyCompletedScreen} />
  </Drawer.Navigator>
)