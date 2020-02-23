import React, {Component }from 'react'
import { View, Text, StyleSheet, StatusBar,Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

export default class Avtar extends React.Component {

  render( ) {
  return (
    <Onboarding 
    onSkip={() => {
      alert("further app is under development")
    }}
    onDone={() => {
          alert("further app is under development")
        }}
    pages={[
      {
        backgroundColor: 'rgba(0, 130, 255, 1)',
        image: <Image 
                style={{ resizeMode: 'center',}}
                source={require('../assets/teenGirl2.png')} />,
        title: 'Page 1',
        subtitle: 'app description ',
      },
      {
        backgroundColor: 'rgba(0, 130, 255, 1)',
        image: <Image 
                style={{ resizeMode: 'center', }}
                source={require('../assets/teenBoy2.png')} />,
        title: 'Page 2',
        subtitle: 'app description',
      },
      {
        backgroundColor: 'rgba(0, 130, 255, 1)',
        image: <Image 
                style={{ resizeMode: 'center', }}
                source={require('../assets/women.png')} />,
        title: "Page 3",
        subtitle: "app discription",

      },
      {
        backgroundColor: 'rgba(0, 130, 255, 1)',
        image: <Image 
                style={{ resizeMode: 'center', }}
                source={require('../assets/man2.png')} />,
        title: "Page 4",
        subtitle: "app discription",

      },
    ]}
  />
  );  
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    }
  }
);