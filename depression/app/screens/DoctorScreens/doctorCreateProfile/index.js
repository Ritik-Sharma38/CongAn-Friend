import React, { Component , useState} from 'react';
import { Text, View, Alert, StyleSheet, StatusBar, TouchableOpacity, Animated, Dimensions, TextInput, ProgressBarAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Swiper from 'react-native-swiper'
import {doctorProfileUpload, } from '../../../actions/authAction';
import { ScrollView } from 'react-native-gesture-handler';
import TimePicker from 'react-native-simple-time-picker';
import { useNavigation} from '@react-navigation/native'

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
    const navigation = useNavigation()
    const [uploadImg, setUploadImg] = useState('Upload profile pic')
    const [DoctorProfileDetails, setDocProfile] = useState(
      {
        uid: user.id,
        firstName: '',
        lastName: '',
        age: 0,
        gender: '',
        specialization: '',
        country: '',
        state: '',
        cityTown: '',
        hospitalClinicName: '',
        hospitalClinicAddress: '',
        postalCode: '',
        licenceNumer: '',
        messagePatient: '',
        workingday: {Mon: 0, Tue: 0, Wed: 0, Thr: 0, Fri: 0, Sat: 0, Sun: 0},
        workingHours: {fromHours: 0, fromMinutes: 0, toHours: 0, toMinutes: 0},
        
      }
    )
    const selectDays = (day) => {
      if(DoctorProfileDetails.workingday[day]){
        setDocProfile({...DoctorProfileDetails, workingday:{...DoctorProfileDetails.workingday, [day]: 0}})
      }else{
        setDocProfile({...DoctorProfileDetails, workingday:{...DoctorProfileDetails.workingday, [day]: 1}})
      }
    }
    console.log(DoctorProfileDetails)
    const progressBar = useSelector(state => state.auth.progressBarStatus)
    function uploadData(){
      dispatch(doctorProfileUpload(user.id, DoctorProfileDetails))
      setUploadImg('Creating profile.....')
    }
    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor="rgba(0, 130, 255, 1)" barStyle="light-content" />
            <View style = {styles.FirstHalf}>
                <ImageLoader
                    style={{marginTop:'15%', width: width/2, height: width/2}}
                    source={require('../../../assets/Logo.png')}
                />
                <View style={{padding: '7%'}}>
                    <Text style={{fontSize: 30, color: '#fff'}}>Complete your profile to help patient reach you</Text>
                </View>
            </View>
            <View style={{width: width}}>
                <Swiper style={styles.wrapper}>
                    <View style={styles.swiperPage}>
                    <TextInput
                            placeholder="First Name"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCompleteType='name'
                            autoCapitalize='characters'
                            importantForAutofill='yes'
                            onChangeText = { FirstName => { DoctorProfileDetails.firstName=FirstName }}
                        />
                        <TextInput
                            placeholder="Last Name"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCompleteType='name'
                            autoCapitalize='characters'
                            onChangeText = { lastNmae => { DoctorProfileDetails.lastName=lastNmae}}
                        />
                        <TextInput
                            placeholder="Age"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            keyboardType='numeric'
                            onChangeText = { age => { DoctorProfileDetails.age=age}}
                        />
                        <TextInput
                            placeholder="Gender"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCapitalize='characters'
                            onChangeText = { gender => { DoctorProfileDetails.gender=gender}}
                        />
                        <TextInput
                            placeholder="Country"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            textContentType='countryName'
                            autoCapitalize='characters'
                            onChangeText = { country => { DoctorProfileDetails.country=country}}
                        />
                        <TextInput
                            placeholder="State"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            textContentType='addressState'
                            autoCapitalize='characters'
                            onChangeText = { state => { DoctorProfileDetails.state=state}}
                        />
                        <TextInput
                            placeholder="City/Town"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            textContentType='addressCityAndState'
                            autoCapitalize='characters'
                            onChangeText = { cityTown => { DoctorProfileDetails.cityTown=cityTown}}
                        />
                        <TextInput
                            placeholder="Hospital/Clinic Name"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { hospitalClinicName => { DoctorProfileDetails.hospitalClinicName=hospitalClinicName}}
                        />
                        <TextInput
                            placeholder="Hospital/Clinic Address"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { hospitalClinicAddress => { DoctorProfileDetails.hospitalClinicAddress=hospitalClinicAddress}}
                        />
                        <TextInput
                            placeholder="Postal code"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCompleteType='postal-code'
                            onChangeText = { postalCode => { DoctorProfileDetails.postalCode=postalCode}}
                        />
                        <TextInput
                            placeholder="Specialization"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCapitalize='characters'
                            onChangeText = { specialization => { DoctorProfileDetails.specialization=specialization}}
                        />
                        <TextInput
                            placeholder="Licence Number"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { licenceNumer => { DoctorProfileDetails.licenceNumer=licenceNumer}}
                        />
                    </View>
                    <View>
                        <View style={styles.WorkingDays}>
                          <Text style={styles.WorkingDaysText}>Select working days</Text>
                        </View>
                        <View style={styles.SelectDays}>
                          <TouchableOpacity style={DoctorProfileDetails.workingday.Mon ? styles.DaysButtonFirstOnn : styles.DaysButtonFirstOff} onPress={()=> selectDays('Mon')}>
                            <Text style={styles.DaysText}>{'  '}Mon{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetails.workingday.Tue ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Tue')}>
                            <Text style={styles.DaysText}>{'  '}Tue{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetails.workingday.Wed ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Wed')}>
                            <Text style={styles.DaysText}>{'  '}Wed{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetails.workingday.Thr ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Thr')}>
                            <Text style={styles.DaysText}>{'  '}Thr{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetails.workingday.Fri ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Fri')}>
                            <Text style={styles.DaysText}>{'  '}Fri{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetails.workingday.Sat ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Sat')}>
                            <Text style={styles.DaysText}>{'  '}Sat{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetails.workingday.Sun ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Sun')}>
                            <Text style={styles.DaysText}>{'  '}Sun{'  '}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.TimePicker}>
                          <Text style={styles.WorkingDaysText}>Select working Hours</Text>
                          <View style={styles.TimeFrom}>
                            <Text style={styles.TimeFromToText}>From:</Text>
                            <TimePicker
                              selectedHours={DoctorProfileDetails.workingHours.fromHours}
                              selectedMinutes={DoctorProfileDetails.workingHours.fromMinutes}
                              onChange={(hours, minutes) => setDocProfile({
                                ...DoctorProfileDetails, 
                                workingHours:{
                                  ...DoctorProfileDetails.workingHours, 
                                  fromHours: hours, 
                                  fromMinutes: minutes
                                }
                              })}
                            />
                            <Text style={styles.TimeFromToText}>To:</Text>
                            <TimePicker
                              selectedHours={DoctorProfileDetails.workingHours.toHours}
                              selectedMinutes={DoctorProfileDetails.workingHours.toMinutes}
                              onChange={(hours, minutes) => setDocProfile({
                                ...DoctorProfileDetails, 
                                workingHours:{
                                  ...DoctorProfileDetails.workingHours, 
                                  toHours: hours, 
                                  toMinutes: minutes
                                }
                              })}
                            />
                          </View>
                        </View>
                        <TextInput
                            placeholder="Message for patient"
                            style={styles.messageInput}
                            placeholderTextColor='black'
                            multiline={true}
                            onChangeText = {messagePatient => { DoctorProfileDetails.messagePatient=messagePatient}}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => uploadData()}>
                            <Text style={{color: '#fff'}}>{uploadImg}</Text>
                        </TouchableOpacity>
                        {progressBar && (
                            <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
                        )}
                        { uploadImg==='Creating profile.....' && (
                          <View>
                            {!progressBar && (
                              navigation.navigate('Profile')
                            )}
                          </View>
                        )}
                    </View>
                </Swiper>
            </View>
      </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
      
    },
    FirstHalf: {
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
    WorkingDays: {
      marginTop: '6%',
      marginHorizontal: '6%'
    },
    SelectDays: {
      flexDirection: 'row',
      marginTop: '4%',
      marginHorizontal: '6%'
    },
    DaysButtonFirstOff: {
      backgroundColor: 'white'
    },
    DaysButtonFirstOnn: {
      backgroundColor: '#00FF00'
    },
    DaysButtonOff: {
      marginLeft: '3%',
      backgroundColor: 'white'
    },
    DaysButtonOnn: {
      marginLeft: '3%',
      backgroundColor: '#00FF00'
    },
    WorkingDaysText: {
      fontWeight: 'bold'
    },  
    DaysText: {
      fontSize: 18,
    },
    TimePicker: {
      marginTop: '4%',
      marginHorizontal: '6%',
      width: width/2,
    },
    TimeFromToText: {

    },
    TimeFrom: {
      padding: 6,
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
  