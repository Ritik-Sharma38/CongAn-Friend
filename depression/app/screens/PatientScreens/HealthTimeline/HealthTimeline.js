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
import { Card, Avatar } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window')

var depressionLevel = 0
var depressionStatus = ''
var depressionOverTimeGraphValue=[]
var depressionOverTimeGraphLable=[]
var loadingState=true

const HealthTimeline = () => {
  useEffect(() => {
  }, [])
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user);
  const firebaseUser = useSelector((state) => state.auth.firebaseUser);
  if(firebaseUser.healthTimeline){
    depressionLevel = firebaseUser.healthTimeline.PHQ8Value[(firebaseUser.healthTimeline.PHQ8Value.length)-1]
    for(let i=0; i<firebaseUser.healthTimeline.PHQ8Value.length; i++){
      depressionOverTimeGraphValue.push(firebaseUser.healthTimeline.PHQ8Value[i].ScaleValue)
      depressionOverTimeGraphLable.push(firebaseUser.healthTimeline.PHQ8Value[i].Date)
    }
    if(depressionLevel.ScaleValue<5){
        depressionStatus = 'Not Depressed'
    }
    else if(depressionLevel.ScaleValue>4 && depressionLevel.ScaleValue<10){
        depressionStatus = 'Mild Depression'
    }
    else if(depressionLevel.ScaleValue>9 && depressionLevel.ScaleValue<15){
      depressionStatus = 'Moderate Depression'
    }
    else if(depressionLevel.ScaleValue>14 && depressionLevel.ScaleValue<20){
      depressionStatus = 'Moderately severe depression'
    }
    else if(depressionLevel.ScaleValue>19 && depressionLevel.ScaleValue<25){
      depressionStatus = 'Severe depression'
    }
    console.log("printing firebase user data", firebaseUser)
    loadingState=false
  }
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.2,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true // optional
  };
  const data = {
    labels: depressionOverTimeGraphLable,
    datasets: [
      {
        data: depressionOverTimeGraphValue,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E71DC" />
      <View style={styles.FirstHalf}>
        {/* 
        <View
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
          />
          */}
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
        {loadingState && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
        )}
        {!loadingState && (
            <View>
              <Text>Last update: {depressionLevel.Date} :{depressionLevel.Time}</Text>
              <View style={styles.DepressionStatusView}>
                <Text style={styles.DepressionText}>Your level of depression is: {depressionLevel.ScaleValue}</Text>
                <Text style={styles.DepressionText}>Your Depression status is: {depressionStatus}</Text>
              </View>
              <View style={styles.GraphView}>
                <Text style={styles.DepressionOverTimeGraphHeading}>Depression over time:</Text>
                <LineChart
                  data={data}
                  width={width}
                  height={height/3}
                  chartConfig={chartConfig}
                  withInnerLines={true}
                  withOuterLines={true}
                />
              </View>
              <View style={styles.OnlineCBT}>
                <View style={styles.CBT_Hedline}>
                  <Text style={styles.CBT_HeadlineText}>Online CBT</Text>
                  <Icon
                    size={30}
                    name='info-outline'
                    type='MaterialIcons'
                    onPress={()=> Alert.alert(
                      "Cognitive Behavioral Therapy",
                      "Cognitive behavioral therapy is a psycho-social intervention that aims to improve mental health. CBT focuses on challenging and changing unhelpful cognitive distortions and behaviors, improving emotional regulation, and the development of personal coping strategies that target solving current problems."
                    )}  
                  />
                </View>
                <Button
                  onPress={()=> alert("under development")}
                  title="Launch CBT"
                />
              </View>
              <View style={styles.TalkToDoctor}>
                <View style={styles.DoctorHeadline}>
                  <Text style={styles.DoctorHeadlineText}>Talk to Doctor</Text>
                  <Icon
                    size={30}
                    name='info-outline'
                    type='MaterialIcons'
                    onPress={()=> Alert.alert(
                      "Talk to Doctor",
                      "How it works? \n 1. Click the button below \n 2. Select a doctor from list \n 3. Buy subscription or select pay as you go \n 4. Book appointment with doctor"
                    )}  
                  />
                </View>
                <Button
                  onPress={()=> navigation.navigate("Talk To Doctor")}
                  title="Talk to a doctor"
                />
              </View>
            </View>
        )}
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
  DepressionStatusView: {
    backgroundColor: 'white',
    borderBottomColor: '#D3D3D3',
    borderBottomWidth: 1
  },
  DepressionText: {
    marginBottom: '2%',
    marginVertical: '2%',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  GraphView: {

  },
  DepressionOverTimeGraphHeading: {
    padding: 10,
    fontSize: 18,
    marginBottom: 5,
  },
  OnlineCBT: {
    padding: 10,
    backgroundColor: 'white'
  },
  CBT_HeadlineText: {
    fontSize: 20
  },
  CBT_Hedline: {
    flexDirection: 'row',
    marginBottom: 7
  },
  TalkToDoctor: {
    padding: 10,
    backgroundColor: 'white'
  },
  DoctorHeadline: {
    flexDirection: 'row',
    marginBottom: 7
  },
  DoctorHeadlineText: {
    fontSize: 20
  }
})

export default HealthTimeline
