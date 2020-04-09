import React, { Component } from 'react';
import { Text, View, Alert, StyleSheet, StatusBar, TouchableOpacity, Animated, Dimensions} from 'react-native';
import { Avatar } from 'react-native-elements';

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
  
export default class PatientDoctor extends Component {
  render() {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="rgba(0, 130, 255, 1)" barStyle="light-content" />
            <View style = {styles.FirstHalf}>
                <ImageLoader
                    style={{resizeMode: 'center'}}
                    source={require('../../assets/Logo.png')}
                />
                <Text style={{fontSize: 30, color: '#fff'}}>Let's us know about you</Text>
            </View>
            <View>
                <View style={{flexDirection: 'row' , marginLeft: '10%', marginTop: '15%'}}>
                    <View>
                        <Avatar
                            size="xlarge"
                            rounded
                            source={require('../../assets/doctor.png')}
                            title="Doctor"
                            onPress={() => this.props.navigation.navigate('dloginSignup')}
                        />
                        <View style={{alignSelf:'center'}}>
                                <Text style={{fontSize: 25,color: '#000'}}>Doctor</Text>
                        </View>
                    </View>
                    <View style={{marginLeft: '8%'}}>
                        <Avatar
                            size="xlarge"
                            rounded
                            source={require('../../assets/patient.png')}
                            title="Patient"
                            onPress={() => this.props.navigation.navigate('ploginSignup')}
                        />
                        <View style={{alignSelf:'center'}}>
                            <Text style={{fontSize: 25,color: '#000'}}>Patient</Text>
                        </View>
                   </View>
                </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    FirstHalf: {
      height: height/1.5,
      backgroundColor: 'rgba(0, 130, 255, 1)',
      alignContent: 'center',
      alignItems: 'center'
    },
});
  