import React, { Component, useState, useEffect, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Button,
  ProgressBarAndroid,
  StatusBar,
  Alert,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDoctorList } from '../../../actions/authAction'
import { Card, Avatar, ListItem } from 'react-native-elements'
import { useNavigation , useRoute} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DatePicker from 'react-native-datepicker'
import TimePicker from 'react-native-simple-time-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window')

const SelectedDoctorInformation = () => {
  const user = useSelector((state) => state.auth.user)
  const navigation = useNavigation()
  const DoctorList = useSelector((state) => state.auth.DoctorList)
  const dispatch = useDispatch()
  const route = useRoute();
  const DoctorsInfo = route.params;
  const [AppointmentDetails, setAppointment] = useState(
    {
      date: new Date(1598051730000),
      docDetails: DoctorsInfo,
      patientDetails: user,
      comunicationMode:{
        video: 0,
        call: 0,
        chat: 0
      },
    }
  )
  const sorter = {
    "mon": 1,
    "tue": 2,
    "wed": 3,
    "thr": 4,
    "fri": 5,
    "sat": 6,
    "sun": 7
  }
  var WorkingDaysArray = []
  for (var key in DoctorsInfo.DoctorsInfo.workingday){
    if(DoctorsInfo.DoctorsInfo.workingday[key]===1){
      WorkingDaysArray.push(key)
    }
  }
  WorkingDaysArray.sort(function sortByDay(a, b) {
    let day1 = a.toLowerCase();
    let day2 = b.toLowerCase();
    return sorter[day1] - sorter[day2];
  });
  for (let i=0; i<WorkingDaysArray.length; i++){
    
  }
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setAppointment({...AppointmentDetails, date: currentDate});
    setAppointment({...AppointmentDetails, date: AppointmentDetails.date.toString()})
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const selectComMode = (mode) => {
    if(AppointmentDetails.comunicationMode[mode]){
      setAppointment({...AppointmentDetails, comunicationMode:{...AppointmentDetails.comunicationMode, [mode]: 0}})
    }else{
      setAppointment({...AppointmentDetails, comunicationMode:{...AppointmentDetails.comunicationMode, [mode]: 1}})
    }
  }
  const bookAppointment = () => {
    navigation.navigate('Subscription', {AppointmentDetails})
    console.log("pressed button")
  }
  console.log('Doctors detils', DoctorsInfo, AppointmentDetails )
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E71DC" />
      <View style={styles.FirstHalf}>
        {/*<View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <Icon.Button
            backgroundColor="#2E71DC"
            name="menu"
            onPress={() => navigation.openDrawer()}
          />*/}
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <Avatar
              size="large"
              rounded
              source={{
                uri: user.profileURL,
              }}
            />
            <View style={{marginLeft: 8}}>
              <Avatar
                size="large"
                rounded
                source={{
                  uri: user.AvatarImg,
                }}
              />
            </View>
          </View>
        
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}>
          <Text style={{ fontSize: 18, color: '#fff' }}>{user.fullname}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.SecondHalf}>
        <View>
          <Card containerStyle={styles.card}>
              <View style={styles.CardDocRowInfo}>
                  <Image
                      style={styles.DoctorProfileImage}
                      source={{ uri: DoctorsInfo.DoctorsInfo.profilePicture }}
                  />
                  <View style={styles.DocBasicInfo}>
                      <Text style={styles.DocBasicInfoName}>{DoctorsInfo.DoctorsInfo.Full_Name}</Text>
                      <Text style={styles.DocBasicInfoAgeGender}>
                          {DoctorsInfo.DoctorsInfo.age},
                          {'  '}
                          {DoctorsInfo.DoctorsInfo.gender}
                      </Text>
                        <Text style={styles.DocBasicInfoAgeGender}>{DoctorsInfo.DoctorsInfo.specialization}</Text>
                      <Text style={styles.WorkingHours}>Working Hours:</Text>
                      <Text>from: {DoctorsInfo.DoctorsInfo.workingHours.fromHours}:{DoctorsInfo.DoctorsInfo.workingHours.fromMinutes}
                      {' '}To: {DoctorsInfo.DoctorsInfo.workingHours.toHours}:{DoctorsInfo.DoctorsInfo.workingHours.toMinutes}</Text>
                      <View style={styles.WorkingDays}>
                        {WorkingDaysArray.map((item)=>(
                          <View>
                            <Text style={styles.WorkingDaysText}>{item}{' '}</Text>
                          </View>
                        ))}
                      </View>
                  </View>
              </View>
          </Card>
          <Card containerStyle={styles.card}>
            <Text style={styles.HospiatalName}>Hospital/Clinic: {DoctorsInfo.DoctorsInfo.hospitalClinicName} </Text>
            <Text style={styles.HospitalAndLocation}>Address: {DoctorsInfo.DoctorsInfo.hospitalClinicAddress}</Text>
            <Text style={styles.HospitalAndLocation}>City: {DoctorsInfo.DoctorsInfo.cityTown}</Text>
            <Text>State: {DoctorsInfo.DoctorsInfo.state}</Text>
          </Card>
          <Card containerStyle={styles.card}>
            <Text style={styles.MessagePatientHeading}>Message for Patient</Text>
            <Text style={styles.MessageForPatient}>{DoctorsInfo.DoctorsInfo.messagePatient}</Text>
          </Card>
          <Card containerStyle={styles.card}>
            <Text style={styles.BookAppointmentHeading}>Book Appointment</Text>
            <View style={styles.SubCardView}>
              <View style={styles.DateTime}>
                <View style={styles.SelectDate}>
                  <Text style={styles.DateText}>Select Date</Text>
                  <View style={styles.DateIcon}>
                    <Icon
                      size={30}
                      name='insert-invitation'
                      type='MaterialIcons'
                      onPress={showDatepicker}
                    />
                  </View>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={AppointmentDetails.date}
                      mode={mode}
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
                <View Style={styles.SelectTime}>
                  <Text style={styles.TimeText}>Select Time</Text>
                  <View Style={styles.TimeIcon}>
                    <Icon
                      size={30}
                      name='schedule'
                      type='MaterialIcons'
                      onPress={showTimepicker}
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.DateTimeText}>{AppointmentDetails.date.toString()}</Text>
              <View style={styles.CommView}>
                <Text style={styles.SelectComModeText}>Select Communication Mode</Text>
                <View style={styles.SelectComMode}>
                  <TouchableOpacity style={AppointmentDetails.comunicationMode.video ? styles.VideoCallButtonOnn : styles.VideoCallButtonOff} onPress={()=> selectComMode('video')}>
                    <Text style={styles.VideoCallText}>{'  '}
                      <Icon
                        size={16}
                        name='personal-video'
                        type='MaterialIcons'
                      />
                      {' '}Video{'  '}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={AppointmentDetails.comunicationMode.call ? styles.VideoCallButtonOnn : styles.VideoCallButtonOff} onPress={()=> selectComMode('call')}>
                    <Text style={styles.VideoCallText}>{'  '}
                      <Icon
                        size={16}
                        name='phone-in-talk'
                        type='MaterialIcons'
                      />
                      {' '}Call{'  '}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={AppointmentDetails.comunicationMode.chat ? styles.VideoCallButtonOnn : styles.VideoCallButtonOff} onPress={()=> selectComMode('chat')}>
                    <Text style={styles.VideoCallText}>{'  '}
                      <Icon
                        size={16}
                        name='textsms'
                        type='MaterialIcons'
                      />
                      {' '}Chat{'  '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.BookAppointmentButton} onPress={() => bookAppointment()}>
              <Text style={styles.BookAppointmentButtonText}>Book Appointment</Text>
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  FirstHalf: {
    backgroundColor: '#2E71DC',
  },
  SecondHalf: {
    
  },
  DoctorProfileImage: {
    width: width / 2.3,
    height: width / 2.3,
    borderRadius: 3,
  },
  card: {
    borderRadius: 7,
    width: width / 1.07,
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
  CardDocRowInfo: {
    flexDirection: 'row'
  },
  DocBasicInfo: {
    paddingLeft: 15,
  },
  DocBasicInfoName: {
    fontSize: 18,
  },
  DocBasicInfoAgeGender: {
    marginTop: 1,
    fontSize: 18,
  },
  WorkingHours: {
    marginTop: 9,
    fontSize: 18,
    marginBottom: 5,
  },
  WorkingDays: {
    flexDirection: 'row'
  },
  WorkingDaysText: {
    flex: 1,
    flexWrap: 'wrap',
  },
  HospiatalName:{
    fontSize: 17,
    fontWeight: 'bold'
  },
  HospitalAndLocation: {
    fontSize: 15,
    marginTop: '1%'
  },
  MessagePatientHeading: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  MessageForPatient: {
    padding: 5,
  },
  BookAppointmentHeading: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  SubCardView: {
    padding: '1.5%'
  },
  DateTime: {
    flexDirection: 'row'
  },
  SelectDate: {
    marginRight: '4%'
  },
  SelectTime: {
    
  },
  DateIcon: {
    padding: '1.5%'
  },
  TimeIcon: {
    padding: '1.5%'
  },
  DateTimeText: {
    color: 'green'
  },
  CommView: {
    borderColor: '#D3D3D3',
    borderTopWidth: 1,
    marginTop: '3%',
    paddingTop: '1.5%'
  },
  SelectComMode: {
    marginTop: '2%',
    flexDirection: 'row',
    padding: '1.5%',
  },
  SelectComModeText: {
    fontSize: 16
  },
  VideoCallButtonOnn: {
    marginLeft: '4%',
    backgroundColor: '#00FF00'
  },
  VideoCallButtonOff: {
    marginLeft: '4%',
    backgroundColor: 'rgba(235, 235, 235, 1)'
  },
  VideoCallText: {
    fontSize: 16,
  },
  BookAppointmentButton: {
    backgroundColor: '#2E71DC',
    height: 35,
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
  BookAppointmentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default SelectedDoctorInformation
