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
import { Card, Avatar, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { LineChart } from "react-native-chart-kit";

const { width, height } = Dimensions.get('window')
var depressionStatus = ''
var depressionOverTimeGraphValue=[]
var depressionOverTimeGraphLable=[]

const HealthTimeline = () => {
  useEffect(() => {
  }, [])
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user);
  const firebaseUser = useSelector((state) => state.auth.firebaseUser);
  const depressionLevel = firebaseUser.healthTimeline.PHQ8Value[(firebaseUser.healthTimeline.PHQ8Value.length)-1]
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
  for(let i=0; i<firebaseUser.healthTimeline.PHQ8Value.length; i++){
    depressionOverTimeGraphValue.push(firebaseUser.healthTimeline.PHQ8Value[i].ScaleValue)
    depressionOverTimeGraphLable.push(firebaseUser.healthTimeline.PHQ8Value[i].Date)
  }
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
  console.log("printing firebase user data", firebaseUser.healthTimeline.PHQ8Value, depressionLevel)
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
  }
})

export default HealthTimeline
