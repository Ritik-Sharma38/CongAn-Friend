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

const { width, height } = Dimensions.get('window')
var array=[]
const SelectedDoctorInformation = () => {
  const user = useSelector((state) => state.auth.user)
  const navigation = useNavigation()
  const DoctorList = useSelector((state) => state.auth.DoctorList)
  const dispatch = useDispatch()
  const route = useRoute();
  const DoctorsInfo = route.params;
  console.log('Doctor detils', DoctorsInfo)
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
            <Avatar
              size="large"
              rounded
              source={{
                uri: user.AvatarImg,
              }}
            />
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
                    <Text style={styles.DocBasicInfoName}>{DoctorsInfo.DoctorsInfo.doctorProfile.Full_Name}</Text>
                    <Text style={styles.DocBasicInfoAgeGender}>
                        {DoctorsInfo.DoctorsInfo.doctorProfile.DoctorProfile.age},
                        {'  '}
                        {DoctorsInfo.DoctorsInfo.doctorProfile.DoctorProfile.gender}
                    </Text>
                </View>
            </View>
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
      marginTop: 7,
      fontSize: 18,
  }
})

export default SelectedDoctorInformation
