import React, { Component, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Animated, ProgressBarAndroid, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {userSignout, pickImage, pickVideo} from '../../actions/authAction';
import { Button, Avatar, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

class ImageLoader extends Component {
    state = {
      opacity: new Animated.Value(0),
    }
  
    onLoad = () => {
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 800,
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
                        outputRange: [0.5, 1],
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

 
const ProfileScreen = () => {
    const [trigerTimeline, setTrigerTimeline] = useState(true)
    const [trigerMps, setTrigerMps] = useState(true)
    const [trigerProfile, setTrigerProfile] = useState(true)
    const user = useSelector(state => state.auth.user)
    const navigation = useNavigation();
    const progressBar = useSelector(state => state.auth.progressBarStatus) 
    const dispatch = useDispatch();
    console.log("profile detils",user)
    return (
        <SafeAreaView style = {styles.container}>
            <StatusBar backgroundColor='#2E71DC'/>
            <View style = {styles.FirstHalf}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Icon.Button 
                        backgroundColor="#2E71DC"
                        name="menu"
                        onPress={() => navigation.openDrawer()}
                    />
                    <View style={{marginLeft: '30%'}}>
                        <Avatar
                            size="large"
                            rounded
                            source={{
                                uri: user.profileURL
                            }}
                            showEditButton
                            onEditPress={() => alert("not allowed now")}
                        />
                    </View>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 18,color: '#fff'}}>{user.fullname}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
                { trigerTimeline && trigerMps && trigerProfile &&  (
                    <View>
                        <Card
                            containerStyle={styles.Cards}>
                            <ImageLoader
                            style={{width: width/1.1, height: height/2.6,}}
                            source={require('../../assets/healty0.png')}
                            />
                            <TouchableOpacity onPress={() => setTrigerTimeline(false)}>
                                <Text style={{marginBottom: '2%', marginVertical: '3%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Timeline and Patient history</Text>
                            </TouchableOpacity>
                        </Card>
                        <Card 
                            containerStyle={styles.Cards}>
                            <ImageLoader
                            style={{width: width/1.1, height: height/2.6,}}
                            source={require('../../assets/healty8.png')}
                            />
                            <TouchableOpacity onPress={() => setTrigerMps(false)} >
                                <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Booked appointments</Text>
                            </TouchableOpacity>
                        </Card>
                        <Card
                            containerStyle={{backgroundColor: '#2E71DC', height: height/2.5, width: width/1.08, borderRadius: 15, alignItems: 'center', justifyContent: 'center',}}>
                            <ImageLoader
                            style={{width: width, height: height/3,}}
                            source={require('../../assets/healty12.png')}
                            />
                            <TouchableOpacity onPress={() => setTrigerProfile(false)}>
                                <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Profile and account setting</Text>
                            </TouchableOpacity>
                        </Card>
                        <Button onPress={()=>{dispatch(userSignout())}}  title="LogOut"/>
                    </View>
                )}
                { !trigerTimeline && (
                    <View>
                        <Text>triger form timeline</Text>
                    </View>
                )}
                { !trigerMps && (
                    <View>
                        <Button 
                            style={{marginHorizontal: '2%'}}
                            onPress={()=> setTrigerMps(true)} title="back"/>
                    </View>
                )}
                { !trigerProfile && (
                    <View>
                        <Text>triger form profile and setting</Text>
                    </View>
                )}
            </ScrollView>
		</SafeAreaView>
      );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    FirstHalf: {
      height: height/8,
      backgroundColor: '#2E71DC',
    },
    SecondHalf: {
     
    },
    Cards: {
      backgroundColor: '#2E71DC',
      height: height/2,
      width: width/1.08,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 3 },
      shadowColor: '#000',
      shadowOpacity: 0.4,
      elevation: 4,
    },
});

export default ProfileScreen