import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import Svg, { Image, Circle, ClipPath } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { TapGestureHandler, State, TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import {fbSignin} from '../../actions/authAction';
const { width, height } = Dimensions.get('window');

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class Depression extends React.Component {
  constructor() {
    super();

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 50, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });
  }
  render() {
    console.log("rendering LoginSignup page")
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 130, 255, 1)',
          justifyContent: 'flex-end'
        }}
      >
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }]
          }}
        >
        <Svg height={height + 50} width={width}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require('../../assets/bgg.png')}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clip)"
          />
        </Svg>
        </Animated.View>
        <View style={{ height: height / 3, justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', }}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.Lbutton,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, }}>SIGN IN</Text>
            </Animated.View>
          </TapGestureHandler>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.Rbutton,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, }}>LOG IN</Text>
            </Animated.View>
          </TapGestureHandler>
          </View>
        {/**<TapGestureHandler onHandlerStateChange={this.onStateChange}>**/}
          <TouchableOpacity onPress={this.props.fbSignin}>
            <Animated.View
            style={{
              ...styles.button,
              backgroundColor: '#2E71DC',
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }]
            }}
          >
            <Text style={{ fontSize: 20, color: 'white' }}>
              SIGN IN WITH FACEBOOK
            </Text>
          </Animated.View>
        </TouchableOpacity>
        {/**</TapGestureHandler>**/}
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }]
              }}
            >
              <Text style={{ fontSize: 20, }}>SIGN IN WITH GOOGLE</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{zIndex: this.textInputZindex,
            opacity: this.textInputOpacity,
            transform:[{translateY: this.textInputY}],
            height: height/3,
            ...StyleSheet.absoluteFill, top: null, justifyContent: 'center'}}
          >
            <TapGestureHandler onHandlerStateChange=
            {this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{fontSize: 15,
                  transform: [{rotate: concat(this.rotateCross, 'deg') }] }}>
                    X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              placeholderTextColor='white'
              autoCompleteType='email'
              autoCorrect={true}
              keyboardType='email-address'
            />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              placeholderTextColor='white'
              autoCompleteType='password'
              secureTextEntry={true}
            />
            <Animated.View style={styles.button}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectYourAvtar')}>
              <Text Style= {{ fontsize: 20, fontWeight: 'bold' }}>SIGN IN</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    height: 40,
    marginHorizontal: 25,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  Lbutton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    marginHorizontal: 25,
    borderBottomLeftRadius: 35,
    borderTopLeftRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: width/2.47,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  Rbutton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    borderBottomRightRadius: 35,
    borderTopRightRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: width/2.47,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  textInput: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    height:50,
    borderRadius: 25,
    borderWidth:0.5,
    marginHorizontal:20,
    paddingLeft:10,
    marginVertical:5,
    borderColor:'rgba(0,0,0,0.2)',
  }
});

export default connect(null,{fbSignin})(Depression)
