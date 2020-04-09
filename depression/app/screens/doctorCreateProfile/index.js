import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, StatusBar, TouchableOpacity, Animated, Dimensions, Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const { width, height } = Dimensions.get('window');

class ImageLoader extends Component {
    state = {
      opacity: new Animated.Value(0),
    }
  
    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  
    render() {
      return(
        <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              }
            ]
          },
            this.props.style,
          ]}
          />
        )
    }
}
  
export default class DoctorCreateProfile extends Component {
  render() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="rgba(0, 130, 255, 1)" barStyle="light-content" />
            <View style = {styles.FirstHalf}>
                <ImageLoader
                    style={{marginTop:'15%', width: width/2, height: height/4}}
                    source={require('../../assets/Logo.png')}
                />
                <View style={{paddingLeft: '15%', marginTop:'5%'}}>
                    <Text style={{fontSize: 30, color: '#fff'}}>Create your profile to help patient reach you</Text>
                </View>
            </View>
            <View style={{width: width, height: height/2}}>
                
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      
    },
    FirstHalf: {
      height: '50%',
      backgroundColor: 'rgba(0, 130, 255, 1)',
      alignContent: 'center',
      alignItems: 'center'
    },
});
  