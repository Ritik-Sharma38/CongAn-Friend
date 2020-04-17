import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
  ProgressBarAndroid,
  StatusBar
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
  userSignout,
  pickImage,
  pickVideo,
  fetchDoctorList
} from '../../actions/authAction'
import { Button, Avatar, Card } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('window')

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0)
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start()
  }

  render() {
    return (
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
                  outputRange: [0.5, 1]
                })
              }
            ]
          },
          this.props.style
        ]}
      />
    )
  }
}

const ProfileScreen = () => {
  const [talkToAvatarState, setTalkToAvatarState] = useState(false)
  const [trigerImg, setTrigerImg] = useState(true)
  const [trigerHltme, setTrigerHltme] = useState(true)
  const [trigerDact, setTrigerDact] = useState(true)
  const [trigerSlyf, setTrigerSlyf] = useState(true)
  const [trigerMps, setTrigerMps] = useState(true)
  const [trigerProfile, setTrigerProfile] = useState(true)
  const [trigerAvtarVideo, setTrigerAvatarVideo] = useState(true)
  const user = useSelector(state => state.auth.user)
  const navigation = useNavigation()
  const imageSource = useSelector(state => state.auth.imageSource)
  const progressBar = useSelector(state => state.auth.progressBarStatus)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchDoctorList())
  }, [])
  console.log('profile details', user)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2E71DC" />
      <View style={styles.FirstHalf}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center'
          }}>
          <Icon.Button
            backgroundColor="#2E71DC"
            name="menu"
            onPress={() => navigation.openDrawer()}
          />{' '}
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: '20%'
            }}>
            <Avatar
              size="large"
              rounded
              source={{
                uri: user.profileURL
              }}
              showEditButton
              onEditPress={() => alert('not allowed now')}
            />{' '}
            <Avatar
              size="large"
              rounded
              source={{
                uri: user.AvatarImg
              }}
              showEditButton
              onEditPress={() => navigation.navigate('Avatar')}
            />{' '}
          </View>{' '}
        </View>{' '}
        <View
          style={{
            alignItems: 'center',
            alignContent: 'center',
            paddingTop: 5,
            paddingBottom: 5
          }}>
          <Text
            style={{
              fontSize: 18,
              color: '#fff'
            }}>
            {' '}
            {user.fullname}{' '}
          </Text>{' '}
        </View>{' '}
      </View>{' '}
      <ScrollView contentContainerStyle={styles.SecondHalf}>
        {' '}
        {trigerImg &&
          trigerHltme &&
          trigerDact &&
          trigerSlyf &&
          trigerMps &&
          trigerProfile &&
          trigerAvtarVideo && (
            <View>
              <Card containerStyle={styles.Cards}>
                <ImageLoader
                  style={{
                    width: width / 1.1,
                    height: height / 2.6
                  }}
                  source={require('../../assets/healty0.png')}
                />{' '}
                <TouchableOpacity onPress={() => setTrigerHltme(false)}>
                  <Text
                    style={{
                      marginBottom: '2%',
                      marginVertical: '3%',
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 22
                    }}>
                    {' '}
                    Check your health timeline{' '}
                  </Text>{' '}
                </TouchableOpacity>{' '}
              </Card>{' '}
              <Card containerStyle={styles.Cards}>
                <ImageLoader
                  style={{
                    width: width / 1.1,
                    height: height / 2.6
                  }}
                  source={require('../../assets/healty3.png')}
                />{' '}
                <TouchableOpacity onPress={() => setTrigerDact(false)}>
                  <Text
                    style={{
                      marginBottom: '2%',
                      marginVertical: '2%',
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 22
                    }}>
                    {' '}
                    Daily Activity{' '}
                  </Text>{' '}
                </TouchableOpacity>{' '}
              </Card>{' '}
              <Card
                containerStyle={{
                  backgroundColor: '#2E71DC',
                  height: height / 2,
                  width: width / 1.08,
                  borderRadius: 15,
                  shadowOffset: {
                    width: 0,
                    height: 3
                  },
                  shadowColor: '#000',
                  shadowOpacity: 0.4,
                  elevation: 4
                }}>
                {' '}
                {talkToAvatarState || (
                  <View>
                    <ImageLoader
                      style={{
                        width: width / 1.2,
                        height: height / 2.6,
                        alignContent: 'center'
                      }}
                      source={{
                        uri: user.AvatarImg
                      }}
                    />{' '}
                    <TouchableOpacity
                      onPress={() => setTalkToAvatarState(true)}>
                      <Text
                        style={{
                          marginBottom: '2%',
                          marginVertical: '2%',
                          color: '#fff',
                          alignSelf: 'center',
                          fontSize: 22
                        }}>
                        {' '}
                        Talk to Avatar{' '}
                      </Text>{' '}
                    </TouchableOpacity>{' '}
                  </View>
                )}{' '}
                {talkToAvatarState && (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row'
                      }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('SurveyScreen')}>
                        <ImageLoader
                          style={{
                            width: width / 2.5,
                            height: height / 5.3
                          }}
                          source={require('../../assets/chat.png')}
                        />{' '}
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#fff'
                          }}>
                          {' '}
                          Message{' '}
                        </Text>{' '}
                      </TouchableOpacity>{' '}
                      <TouchableOpacity
                        onPress={() => setTrigerAvatarVideo(false)}>
                        <ImageLoader
                          style={{
                            marginHorizontal: '5%',
                            width: width / 2.5,
                            height: height / 5.3
                          }}
                          source={require('../../assets/videocall3.png')}
                        />{' '}
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#fff'
                          }}>
                          {' '}
                          video call{' '}
                        </Text>{' '}
                      </TouchableOpacity>{' '}
                    </View>{' '}
                    <View
                      style={{
                        flexDirection: 'row'
                      }}>
                      <TouchableOpacity
                        onPress={() => alert('under development')}>
                        <ImageLoader
                          style={{
                            marginVertical: '4%',
                            width: width / 2.5,
                            height: height / 5.3
                          }}
                          source={require('../../assets/voiceChat.png')}
                        />{' '}
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#fff'
                          }}>
                          {' '}
                          Voice call{' '}
                        </Text>{' '}
                      </TouchableOpacity>{' '}
                      <TouchableOpacity onPress={() => setTrigerImg(false)}>
                        <ImageLoader
                          style={{
                            marginHorizontal: '5%',
                            marginVertical: '4%',
                            width: width / 2.5,
                            height: height / 5.3
                          }}
                          source={require('../../assets/imageChat.png')}
                        />{' '}
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#fff'
                          }}>
                          {' '}
                          Photo{' '}
                        </Text>{' '}
                      </TouchableOpacity>{' '}
                    </View>{' '}
                  </View>
                )}{' '}
              </Card>{' '}
              <Card containerStyle={styles.Cards}>
                <ImageLoader
                  style={{
                    width: width / 1.1,
                    height: height / 2.5
                  }}
                  source={require('../../assets/healty9.png')}
                />{' '}
                <TouchableOpacity onPress={() => setTrigerSlyf(false)}>
                  <Text
                    style={{
                      marginBottom: '2%',
                      marginVertical: '2%',
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 22
                    }}>
                    {' '}
                    Social life{' '}
                  </Text>{' '}
                </TouchableOpacity>{' '}
              </Card>{' '}
              <Card containerStyle={styles.Cards}>
                <ImageLoader
                  style={{
                    width: width / 1.1,
                    height: height / 2.6
                  }}
                  source={require('../../assets/healty8.png')}
                />{' '}
                <TouchableOpacity
                  onPress={() => navigation.navigate('TalkToDoctor')}>
                  <Text
                    style={{
                      marginBottom: '2%',
                      marginVertical: '2%',
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 22
                    }}>
                    {' '}
                    Talk to Doctor{' '}
                  </Text>{' '}
                </TouchableOpacity>{' '}
              </Card>{' '}
              <Card
                containerStyle={{
                  backgroundColor: '#2E71DC',
                  height: height / 2.5,
                  width: width / 1.08,
                  borderRadius: 15,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <ImageLoader
                  style={{
                    width: width,
                    height: height / 3
                  }}
                  source={require('../../assets/healty12.png')}
                />{' '}
                <TouchableOpacity onPress={() => setTrigerProfile(false)}>
                  <Text
                    style={{
                      marginBottom: '2%',
                      marginVertical: '2%',
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 22
                    }}>
                    {' '}
                    Profile and account setting{' '}
                  </Text>{' '}
                </TouchableOpacity>{' '}
              </Card>{' '}
              <Button
                onPress={() => {
                  dispatch(userSignout())
                }}
                title="LogOut"
              />
            </View>
          )}{' '}
        {!trigerImg && (
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center'
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center'
              }}>
              <Button
                onPress={() => dispatch(pickImage(user.id, user.fullname))}
                title="Upload image"
              />
              <Button
                style={{
                  marginHorizontal: '2%'
                }}
                onPress={() => setTrigerImg(true)}
                title="back"
              />
            </View>{' '}
            <ImageLoader
              style={{
                width: width / 2,
                height: height / 3
              }}
              source={{
                uri: imageSource.uri
              }}
            />{' '}
            {progressBar && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
            )}{' '}
          </View>
        )}{' '}
        {!trigerAvtarVideo && (
          <View
            style={{
              alignItems: 'center',
              alignContent: 'center'
            }}>
            <Button
              style={{
                marginHorizontal: '2%'
              }}
              onPress={() => dispatch(pickVideo(user.id, user.fullname))}
              title="Upload video"
            />
            <Button
              style={{
                marginHorizontal: '2%'
              }}
              onPress={() => setTrigerAvatarVideo(true)}
              title="back"
            />
            <Button
              style={{
                marginHorizontal: '2%'
              }}
              onPress={() => setTrigerAvatarVideo(true)}
              title="Start a video call to Avatar"
            />
            <Button
              style={{
                marginHorizontal: '2%'
              }}
              onPress={() => navigation.navigate('Video')}
              title="Start a video call to Doctor"
            />
            <ImageLoader
              style={{
                width: width / 2,
                height: height / 3
              }}
              source={{
                uri: imageSource.uri
              }}
            />{' '}
            {progressBar && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
            )}{' '}
          </View>
        )}{' '}
        {!trigerDact && (
          <View>
            <Text> triger form Daily Activity </Text>{' '}
          </View>
        )}{' '}
        {!trigerHltme && (
          <View>
            <Text> triger form Health timeline </Text>{' '}
          </View>
        )}{' '}
        {!trigerMps && <View />}{' '}
        {!trigerProfile && (
          <View>
            <Text> triger form profile and setting </Text>{' '}
          </View>
        )}{' '}
        {!trigerSlyf && (
          <View>
            <Text> triger form social life </Text>{' '}
          </View>
        )}{' '}
      </ScrollView>{' '}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  FirstHalf: {
    backgroundColor: '#2E71DC'
  },
  SecondHalf: {},
  Cards: {
    backgroundColor: '#2E71DC',
    height: height / 2,
    width: width / 1.08,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4
  }
})

export default ProfileScreen
