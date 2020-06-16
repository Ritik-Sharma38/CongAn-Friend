import React from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity, ProgressBarAndroid, PermissionsAndroid} from 'react-native';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State, TextInput} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {fbSignin, emailSignup, emailLogin, googleSignin} from '../../../actions/authAction';

const {width, height} = Dimensions.get('window');

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

class DoctorLoginSignup extends React.Component {

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage write Permission',
          message: 'App needs access to your write storage ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can write to storage');
      } else {
        console.log('write storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access to record audio');
      } else {
        console.log('Record audio permission denied');
      }
    } catch (err) {
      console.warn(err);
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage read Permission',
          message: 'App needs access to your read storage ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can read to storage');
      } else {
        console.log('read storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  constructor() {
    super();

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
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
        nativeEvent: ({state}) =>
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

    this.submitHandler = this.submitHandler.bind(this);
  }

  state = {
    email: '',
    password: '',
    errors: {},
  }

  submitHandler = func => {
    let foundError = false,
      errors = {};

    if (this.state.email.trim().length == 0) {
      errors["email"] = "Email can't be empty";
      foundError = true;
    }

    if (this.state.password.trim().length == 0) {
      errors["password"] = "Password can't be empty";
      foundError = true;
    }

    if (!foundError)
      func(this.state.email, this.state.password, "doctor");
    else
      this.setState({errors});
  }

  render() {
    console.log("rendering LoginSignup page", this.props.SignIn)
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 130, 255, 1)',
          justifyContent: 'flex-end'
        }}
      >
        <StatusBar backgroundColor='#fff' />
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: this.bgY}]
          }}
        >
          <Svg height={height + 50} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require('../../../assets/bgg.png')}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={{height: height / 3, justifyContent: 'center'}}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}]
              }}
            >
              <Text style={{fontSize: 20, }}>SIGN IN / LOG IN</Text>
            </Animated.View>
          </TapGestureHandler>

          {/**<TapGestureHandler onHandlerStateChange={this.onStateChange}>**/}
          <TouchableOpacity onPress={() => this.props.fbSignin("doctor")}>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: '#2E71DC',
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}]
              }}
            >
              <Text style={{fontSize: 20, color: 'white'}}>
                SIGN IN WITH FACEBOOK
            </Text>
            </Animated.View>
          </TouchableOpacity>
          {/**</TapGestureHandler>**/}
          {/** <TapGestureHandler onHandlerStateChange={this.onStateChange}>**/}
          <TouchableOpacity onPress={() => this.props.googleSignin("doctor")}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}]
              }}>
              <Text style={{fontSize: 20, }}>SIGN IN WITH GOOGLE</Text>
            </Animated.View>
            {this.props.progressBarStatus && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
            )}
          </TouchableOpacity>

          {/**</TapGestureHandler>**/}
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{translateY: this.textInputY}],
              height: height / 3,
              ...StyleSheet.absoluteFill, top: null, justifyContent: 'center'
            }}
          >
            <TapGestureHandler onHandlerStateChange=
              {this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{rotate: concat(this.rotateCross, 'deg')}]
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            <TextInput
              placeholder="Email"
              style={"email" in this.state.errors ? styles.textError : styles.textInput}
              placeholderTextColor='white'
              autoCompleteType='email'
              autoCorrect={true}
              keyboardType='email-address'
              onChangeText={email => {this.setState({email}); this.setState({errors: {}})}}
              value={this.state.email}
            />
            <TextInput
              placeholder="Password"
              style={"password" in this.state.errors ? styles.textError : styles.textInput}
              placeholderTextColor='white'
              autoCompleteType='password'
              secureTextEntry={true}
              onChangeText={password => {this.setState({password}); this.setState({errors: {}})}}
              value={this.state.password}
            />
            <View style={{flexDirection: 'row', }}>
              <TouchableOpacity onPress={() => this.submitHandler(this.props.emailSignup)}>
                <Animated.View style={styles.Lbutton}>
                  <Text Style={{fontsize: 20, fontWeight: 'bold'}}>SIGN IN</Text>
                </Animated.View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.submitHandler(this.props.emailLogin)}>
                <Animated.View style={styles.Rbutton}>
                  <Text Style={{fontsize: 20, fontWeight: 'bold'}}>LOG IN</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>
            {this.props.progressBarStatus && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
            )}
            {this.props.SignIn && (
              this.props.navigation.navigate('CreateProfile')
            )}
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
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  Lbutton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    marginHorizontal: 25,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: width / 2.47,
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  Rbutton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    width: width / 2.47,
    shadowOffset: {width: 0, height: 3},
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
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  textInput: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgba(0,0,0,0.2)',
  },
  textError: {
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: "red",
    borderWidth: 1,
  }
});

{/*
function mapStateToProps(state){
    return{
        loading: state.auth.loading
    }
}
*/}
const mapState = (state) => ({
  email: state.email,
  password: state.password,
  progressBarStatus: state.auth.progressBarStatus,
  SignIn: state.auth.SignIn
})

const mapDispatch = {fbSignin, emailSignup, emailLogin, googleSignin};
export default connect(mapState, mapDispatch)(DoctorLoginSignup)
