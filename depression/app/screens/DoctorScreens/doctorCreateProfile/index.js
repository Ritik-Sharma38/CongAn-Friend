import React, { Component , useState} from 'react';
import { Text, View, Alert, StyleSheet, StatusBar, TouchableOpacity, Animated, Dimensions, TextInput, ProgressBarAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Swiper from 'react-native-swiper'
import {doctorProfileUpload, } from '../../../actions/authAction';

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
  
const DoctorCreateProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const [uploadImg, setUploadImg] = useState('Upload profile pic')
    const [firstName, setFirstName] = useState('')
    const [lastNmae, setLastName] = useState('')
    const [hospitalClinic, setHospiatalClinic] = useState('')
    const [specialization, setSpecialization] = useState('')
    const [messagePatient, setMessagePatient] = useState('')
    const progressBar = useSelector(state => state.auth.progressBarStatus)
    function uploadData(){
      dispatch(doctorProfileUpload(
        user.id,
        firstName,
        lastNmae,
        hospitalClinic,
        specialization,
        messagePatient
      ))
      setUploadImg('Creating profile.....')
    }
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="rgba(0, 130, 255, 1)" barStyle="light-content" />
            <View style = {styles.FirstHalf}>
                <ImageLoader
                    style={{marginTop:'15%', width: width/2, height: height/4}}
                    source={require('../../../assets/Logo.png')}
                />
                <View style={{paddingLeft: '15%', marginTop: '20%'}}>
                    <Text style={{fontSize: 30, color: '#fff'}}>Create your profile to help patient reach you</Text>
                </View>
            </View>
            <View style={{width: width, height: '35%'}}>
                <Swiper style={styles.wrapper}>
                    <View style={styles.swiperPage}>
                        <TextInput
                            placeholder="First Name"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { firstName => setFirstName(firstName)}
                        />
                        <TextInput
                            placeholder="Last Name"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { lastNmae => setLastName(lastNmae)}
                        />
                        <TextInput
                            placeholder="Hospital/Clinic name"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { hospitalClinic => setHospiatalClinic(hospitalClinic)}
                        />
                        <TextInput
                            placeholder="Specialization"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { specialization => setSpecialization(specialization)}
                        />
                    </View>
                    <View>
                        <TextInput
                            placeholder="Message for patient"
                            style={styles.messageInput}
                            placeholderTextColor='black'
                            onChangeText = { messagePatient => setMessagePatient(messagePatient)}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => uploadData()}>
                            <Text style={{color: '#fff'}}>{uploadImg}</Text>
                        </TouchableOpacity>
                        {progressBar && (
                            <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
                        )}
                    </View>
                </Swiper>
            </View>
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      
    },
    FirstHalf: {
      height: '65%',
      backgroundColor: 'rgba(0, 130, 255, 1)',
      alignContent: 'center',
      alignItems: 'center'
    },
    wrapper: {

    },
    swiperPage: {
        alignContent: 'center',
        padding: 10,
    },
    textInput: {
        height:50,
        marginHorizontal:'6%',
        borderBottomWidth: 1,
        marginVertical:'1%',
        borderColor:'rgba(0,0,0,0.02)',
    },
    messageInput: {
        height:'40%',
        marginHorizontal:'6%',
        borderRadius: 5,
        borderWidth: 1,
        marginVertical:'5%',
        borderColor:'rgba(0,0,0,0.1)',
    },
    button: {
        backgroundColor: '#2E71DC',
        height: 40,
        marginHorizontal: 25,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 4,
      },
});

export default DoctorCreateProfile
  