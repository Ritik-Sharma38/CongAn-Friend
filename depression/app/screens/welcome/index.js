import React, { Component, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Animated,
  Alert,
} from 'react-native'

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }

  render() {
    return (
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
                }),
              },
            ],
          },
          this.props.style,
        ]}
      />
    )
  }
}

export default class Welcome extends Component {
  appDescriptionCall() {
    setTimeout(() => {
      {
        this.props.navigation.navigate('authStack')
      }
    }, 2000)
  }

  render() {
    console.log('rendering welcome page')
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0, 130, 255, 1)" />
        <ImageLoader
          style={{ flex: 1, resizeMode: 'center' }}
          source={require('../../assets/Logo.png')}
        />
        <Text style={styles.logoText}>CogAn Friend</Text>
        {this.appDescriptionCall()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(0, 130, 255, 1)',
    alignItems: 'center',
  },

  logoText: {
    marginVertical: 140,
    fontSize: 30,
    color: 'white',
  },
})
