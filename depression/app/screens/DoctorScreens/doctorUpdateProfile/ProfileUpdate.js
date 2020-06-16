import React, { Component , useState} from 'react';
import { Text, View, Alert, StyleSheet, StatusBar, TouchableOpacity, Animated, Dimensions, TextInput, ProgressBarAndroid} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Swiper from 'react-native-swiper'
import {updateDoctorProfile, } from '../../../actions/authAction';
import { ScrollView } from 'react-native-gesture-handler';
import TimePicker from 'react-native-simple-time-picker';
import { useNavigation} from '@react-navigation/native'
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

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
const UpdateDoctorProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user)
    const navigation = useNavigation()
    const [uploadImg, setUploadImg] = useState('Update profile')
    const [profileImage, setProfileImage] = useState(user.profilePicture)
    const [DoctorProfileDetail, setDocProfile] = useState(
      {
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
      if(DoctorProfileDetail.workingday[day]){
        setDocProfile({...DoctorProfileDetail, workingday:{...DoctorProfileDetail.workingday, [day]: 0}})
      }else{
        setDocProfile({...DoctorProfileDetail, workingday:{...DoctorProfileDetail.workingday, [day]: 1}})
      }
    }
    console.log(DoctorProfileDetail)
    const progressBar = useSelector(state => state.auth.progressBarStatus)
    function pickProfileImage(){
      ImagePicker.showImagePicker((response) => {
        if (response.didCancel) {
          console.log('user cancelled the image operation')
        } else if (response.error) {
          alert('Error: ', response.error)
        } else {
          const source = { uri: response.uri }
          console.log('printing image uri: ', source)
          setProfileImage(source.uri)
        }
      })
    }
    function uploadData(){
      dispatch(updateDoctorProfile(user.id, DoctorProfileDetail, profileImage))
      setUploadImg('updating profile.....')
    }
    return (
        <ScrollView style={styles.container}>
            <StatusBar backgroundColor="rgba(0, 130, 255, 1)" barStyle="light-content" />
            <View style = {styles.FirstHalf}>
              <View style={styles.AvatarImg}>
                <Avatar
                  size="xlarge"
                  rounded
                  source={{uri: profileImage}}
                  showEditButton
                  onEditPress={() => pickProfileImage() }
                />
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
                            onChangeText = { FirstName => { DoctorProfileDetail.firstName=FirstName }}
                        />
                        <TextInput
                            placeholder="Last Name"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCompleteType='name'
                            autoCapitalize='characters'
                            onChangeText = { lastNmae => { DoctorProfileDetail.lastName=lastNmae}}
                        />
                        <TextInput
                            placeholder="Age"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            keyboardType='numeric'
                            onChangeText = { age => { DoctorProfileDetail.age=age}}
                        />
                        <TextInput
                            placeholder="Gender"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCapitalize='characters'
                            onChangeText = { gender => { DoctorProfileDetail.gender=gender}}
                        />
                        <TextInput
                            placeholder="Country"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            textContentType='countryName'
                            autoCapitalize='characters'
                            onChangeText = { country => { DoctorProfileDetail.country=country}}
                        />
                        <TextInput
                            placeholder="State"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            textContentType='addressState'
                            autoCapitalize='characters'
                            onChangeText = { state => { DoctorProfileDetail.state=state}}
                        />
                        <TextInput
                            placeholder="City/Town"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            textContentType='addressCityAndState'
                            autoCapitalize='characters'
                            onChangeText = { cityTown => { DoctorProfileDetail.cityTown=cityTown}}
                        />
                        <TextInput
                            placeholder="Hospital/Clinic Name"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { hospitalClinicName => { DoctorProfileDetail.hospitalClinicName=hospitalClinicName}}
                        />
                        <TextInput
                            placeholder="Hospital/Clinic Address"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { hospitalClinicAddress => { DoctorProfileDetail.hospitalClinicAddress=hospitalClinicAddress}}
                        />
                        <TextInput
                            placeholder="Postal code"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCompleteType='postal-code'
                            onChangeText = { postalCode => { DoctorProfileDetail.postalCode=postalCode}}
                        />
                        <TextInput
                            placeholder="Specialization"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            autoCapitalize='characters'
                            onChangeText = { specialization => { DoctorProfileDetail.specialization=specialization}}
                        />
                        <TextInput
                            placeholder="Licence Number"
                            style={styles.textInput}
                            placeholderTextColor='black'
                            onChangeText = { licenceNumer => { DoctorProfileDetail.licenceNumer=licenceNumer}}
                        />
                    </View>
                    <View>
                        <View style={styles.WorkingDays}>
                          <Text style={styles.WorkingDaysText}>Select working days</Text>
                        </View>
                        <View style={styles.SelectDays}>
                          <TouchableOpacity style={DoctorProfileDetail.workingday.Mon ? styles.DaysButtonFirstOnn : styles.DaysButtonFirstOff} onPress={()=> selectDays('Mon')}>
                            <Text style={styles.DaysText}>{'  '}Mon{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetail.workingday.Tue ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Tue')}>
                            <Text style={styles.DaysText}>{'  '}Tue{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetail.workingday.Wed ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Wed')}>
                            <Text style={styles.DaysText}>{'  '}Wed{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetail.workingday.Thr ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Thr')}>
                            <Text style={styles.DaysText}>{'  '}Thr{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetail.workingday.Fri ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Fri')}>
                            <Text style={styles.DaysText}>{'  '}Fri{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetail.workingday.Sat ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Sat')}>
                            <Text style={styles.DaysText}>{'  '}Sat{'  '}</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={DoctorProfileDetail.workingday.Sun ? styles.DaysButtonOnn : styles.DaysButtonOff} onPress={()=> selectDays('Sun')}>
                            <Text style={styles.DaysText}>{'  '}Sun{'  '}</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.TimePicker}>
                          <Text style={styles.WorkingDaysText}>Select working Hours</Text>
                          <View style={styles.TimeFrom}>
                            <Text style={styles.TimeFromToText}>From:</Text>
                            <TimePicker
                              selectedHours={DoctorProfileDetail.workingHours.fromHours}
                              selectedMinutes={DoctorProfileDetail.workingHours.fromMinutes}
                              onChange={(hours, minutes) => setDocProfile({
                                ...DoctorProfileDetail, 
                                workingHours:{
                                  ...DoctorProfileDetail.workingHours, 
                                  fromHours: hours, 
                                  fromMinutes: minutes
                                }
                              })}
                            />
                            <Text style={styles.TimeFromToText}>To:</Text>
                            <TimePicker
                              selectedHours={DoctorProfileDetail.workingHours.toHours}
                              selectedMinutes={DoctorProfileDetail.workingHours.toMinutes}
                              onChange={(hours, minutes) => setDocProfile({
                                ...DoctorProfileDetail, 
                                workingHours:{
                                  ...DoctorProfileDetail.workingHours, 
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
                            onChangeText = {messagePatient => { DoctorProfileDetail.messagePatient=messagePatient}}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => uploadData()}>
                            <Text style={{color: '#fff'}}>{uploadImg}</Text>
                        </TouchableOpacity>
                        {progressBar && (
                            <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
                        )}
                        { uploadImg==='Updating profile.....' && (
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
    AvatarImg: {
      padding: 10,
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

export default UpdateDoctorProfile
  