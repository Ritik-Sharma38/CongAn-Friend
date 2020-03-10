import React, {Component }from 'react'
import { View, Text, StyleSheet, StatusBar,Image, Dimensions} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const { width, height } = Dimensions.get('window');

function AppDiscription (){
  return (
    <Onboarding
    onSkip={() => {
      this.props.navigation.navigate('Depression')
    }}
    onDone={() => {
        this.props.navigation.navigate('Depression')
        }}
    pages={[
      {
        backgroundColor: 'white',
        image: <Image
                style={{ width: '100%', height: '60%'}}
                source={require('../../assets/ap4.jpg')} />,
        title: 'Page 1',
        subtitle: 'app description ',
      },
      {
        backgroundColor: 'white',
        image: <Image
                style={{ width: '100%', height: '60%'}}
                source={require('../../assets/ap2.png')} />,
        title: 'Page 2',
        subtitle: 'app description',
      },
      {
        backgroundColor: 'white',
        image: <Image
                style={{ width: '100%', height: '60%'}}
                source={require('../../assets/ap3.jpg')} />,
        title: "Page 3",
        subtitle: "app description",

      },
      {
        backgroundColor: 'white',
        image: <Image
                style={{ width: '100%', height: '60%'}}
                source={require('../../assets/ap1.png')} />,
        title: "Page 4",
        subtitle: "app description",

      },
      {
        backgroundColor: 'rgba(234, 240, 255, 1)',
        image: <Image
                style={{ width: '100%', height: '60%'}}
                source={require('../../assets/ap5.jpg')} />,
        title: "Page 5",
        subtitle: "app description",

      },
    ]}
  />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    }
  }
);
export default AppDiscription;
