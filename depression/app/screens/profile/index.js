import React, { Component, useState } from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {userSignout} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import { Button, Avatar, Card, Image, Icon } from 'react-native-elements';

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
    const [talkToAvatarState, setTalkToAvatarState] = useState(false);
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch();
    console.log("profile detils",user)
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.FirstHalf}>
                <Avatar
                    size="large"
                    rounded
                    source={{
                        uri: user.profileURL
                    }}
                    showEditButton
                />
                <Text style={{fontSize: 18,color: '#fff' }}>{user.fullname}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.SecondHalf}>
                <Card
                    containerStyle={styles.Cards}>
                    <ImageLoader
                    style={{width: width/1.1, height: height/2.6,}}
                    source={require('../../assets/healty0.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '3%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Check your health timeline</Text>
                </Card>
                <Card
                    containerStyle={styles.Cards}>
                    <ImageLoader
                    style={{width: width/1.1, height: height/2.6,}}
                    source={require('../../assets/healty3.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Daily Activity</Text>
                </Card>
                <Card
                    containerStyle={{ 
                        backgroundColor: '#2E71DC',
                        height: height/2,
                        width: width/1.08,
                        borderRadius: 15,
                        shadowOffset: { width: 0, height: 3 },
                        shadowColor: '#000',
                        shadowOpacity: 0.4,
                        elevation: 4,}}
                    >
                    { talkToAvatarState || (
                        <View>
                            <ImageLoader 
                                style={{width: width/1.2, height: height/2.6, alignContent: 'center'}}
                                source={require('../../assets/healty7.png')}
                            />
                            <TouchableOpacity onPress={() => setTalkToAvatarState(true)}>
                                <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Talk to Avatar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    { talkToAvatarState && (
                        <View>
                            <View style={{ flexDirection: 'row',}}>
                                <TouchableOpacity onPress={() => alert("under development")}>
                                    <ImageLoader
                                        style={{width: width/2.5, height: height/5.3}}
                                        source={require('../../assets/chat.png')}
                                    />
                                    <Text style={{alignSelf: 'center', fontSize: 18, color: '#fff'}}>Message</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => alert("under development")}>
                                    <ImageLoader
                                        style={{ marginHorizontal: '5%', width: width/2.5, height: height/5.3}}
                                        source={require('../../assets/videocall3.png')}
                                    />
                                    <Text style={{alignSelf: 'center', fontSize: 18, color: '#fff'}}>video call</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row',}}>
                                <TouchableOpacity onPress={() => alert("under development")}>
                                    <ImageLoader
                                        style={{marginVertical: '4%', width: width/2.5, height: height/5.3}}
                                        source={require('../../assets/voiceChat.png')}
                                    />
                                    <Text style={{alignSelf: 'center', fontSize: 18, color: '#fff'}}>Voice call</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => alert("under development")}>
                                    <ImageLoader
                                        style={{ marginHorizontal: '5%', marginVertical: '4%', width: width/2.5, height: height/5.3}}
                                        source={require('../../assets/imageChat.png')}
                                    />
                                    <Text style={{alignSelf: 'center', fontSize: 18, color: '#fff'}}>Photo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </Card>
                <Card
                    containerStyle={styles.Cards}>
                    <ImageLoader
                    style={{width: width/1.1, height: height/2.5}}
                    source={require('../../assets/healty9.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Social life </Text>
                </Card>
                <Card
                    containerStyle={styles.Cards}>
                    <ImageLoader
                    style={{width: width/1.1, height: height/2.6,}}
                    source={require('../../assets/healty8.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Medical prescription</Text>
                </Card>
                <Card
                    containerStyle={{backgroundColor: '#2E71DC', height: height/2.5, width: width/1.08, borderRadius: 15, alignItems: 'center', justifyContent: 'center',}}>
                    <ImageLoader
                    style={{width: width, height: height/3,}}
                    source={require('../../assets/healty12.png')}
                    />
                    <Text style={{marginBottom: '2%', marginVertical: '2%', color: '#fff', alignSelf: 'center', fontSize: 22}}>Profile and account setting</Text>
                </Card>
                <Button onPress={()=>{dispatch(userSignout())}}  title="LogOut"/>
            </ScrollView>
		</SafeAreaView>
      );
};

export default ProfileScreen;


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    FirstHalf: {
      height: height/8,
      alignItems: 'center',
      alignContent: 'center',
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
  
  