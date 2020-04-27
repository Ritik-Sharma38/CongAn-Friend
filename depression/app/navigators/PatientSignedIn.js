import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '../screens/profile/patient';
import Video from '../screens/video';
import AvtarSelection from '../screens/avatar';
import Test from '../screens/test';
import TalkToDoctor from '../screens/PatientScreens/TalkToDoctor';
import SurveyScreen from '../screens/Survey/SurveyScreen';
import SurveyComplete from '../screens/Survey/SurveyComplete';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export class PatientSignedIn extends Component {
  createSurveyStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
      <Stack.Screen name="SurveyComplete" component={SurveyComplete} />
    </Stack.Navigator>
  );

  render() {
    return (
      <Drawer.Navigator
        initialRouteName="Profile"
        screenOptions={{
          header: () => null,
        }}>
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Video" component={Video} />
        <Drawer.Screen name="Avatar" component={AvtarSelection} />
        <Drawer.Screen name="VideoCall" component={Test} />
        <Drawer.Screen name="TalkToDoctor" component={TalkToDoctor} />
        <Drawer.Screen name="Survey" children={this.createSurveyStack} />
      </Drawer.Navigator>
    );
  }
}
