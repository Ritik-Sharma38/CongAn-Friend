import React, { Component, useState, useEffect } from 'react';
import {RefreshControl, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Animated, ProgressBarAndroid, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {userSignout, docInitalize } from '../../../actions/authAction';
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
    const [refreshing, setRefreshing] = React.useState(false);
    const progressBar = useSelector(state => state.auth.progressBarStatus) 
    const [profile, setProfile] = useState({ profilePicture: 'https://image.flaticon.com/icons/png/512/17/17004.png', Full_Name: ''})
    const dispatch = useDispatch();
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        console.log("refreshing............")
        dispatch(docInitalize(user.id))
        setRefreshing(false);
    }, [refreshing]);
    useEffect(() => {
        dispatch(docInitalize(user.id))
    }, [])
    console.log("profile detils",user.profileURL)
    return ( 
        <SafeAreaView style = {styles.container}>
            <StatusBar backgroundColor='#2E71DC'/>
            <View style = {styles.FirstHalf}>
                <View style={styles.AvatarView}>
                    <Avatar
                        size='medium'
                        rounded
                        source={{
                            uri: user.profileURL,
                        }}
                    />      
                    <View style={styles.UserName}>
                        <Text style={{ fontSize: 18, color: '#fff' }}>{user.fullname}</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }>
                { trigerTimeline && trigerMps && trigerProfile &&  (
                    <View>
                        <TouchableOpacity onPress={() => alert("under development")}>
                            <Card
                                containerStyle={styles.Cards}>
                                <ImageLoader
                                style={{width: width/1.1, height: height/2.6,}}
                                source={require('../../../assets/healty0.png')}
                                />
                                {/*navigation.navigate('VideoCall', { channel: user.channel })*/} 
                                <Text style={{marginBottom: '2%', marginVertical: '3%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Timeline and Patient history</Text>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('BookedAppointment')} >
                            <Card 
                                containerStyle={styles.Cards}>
                                <ImageLoader
                                style={{width: width/1.1, height: height/2.6,}}
                                source={require('../../../assets/healty8.png')}
                                />
                                <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Booked appointments</Text>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile_Update')}>
                            <Card
                                containerStyle={{backgroundColor: '#2E71DC', height: height/2.5, width: width/1.08, borderRadius: 8, alignItems: 'center', justifyContent: 'center',}}>
                                <ImageLoader
                                style={{width: width, height: height/3,}}
                                source={require('../../../assets/healty12.png')}
                                />
                                <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Profile and account setting</Text>
                            </Card>
                        </TouchableOpacity>
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
        paddingBottom: 7,
    },
    SecondHalf: {
     
    },
    AvatarView: {
        padding: 10,
        width: width/1.08,
        flexDirection: 'row',
        backgroundColor: '#2E71DC',
        borderRadius: 10,
        marginTop: '4%',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#000',
        shadowOpacity: 0.4,
        elevation: 4,
      },
    UserName: {
        justifyContent: 'center',
        paddingLeft: 15,
    },
    Cards: {
      backgroundColor: '#2E71DC',
      height: height/2,
      width: width/1.08,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 3 },
      shadowColor: '#000',
      shadowOpacity: 0.4,
      elevation: 4,
    },
});

export default ProfileScreen
