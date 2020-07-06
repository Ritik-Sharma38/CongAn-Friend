import React, {Component, useState, useEffect} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Animated,
  ProgressBarAndroid,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  userSignout,
  pickImage,
  pickVideo,
  initalize,
} from '../../../actions/authAction';
import {Button, Avatar, Card} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('window');

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  };

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

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
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}

const ProfileScreen = () => {
  const [talkToAvatarState, setTalkToAvatarState] = useState(false);
  const [trigerImg, setTrigerImg] = useState(true);
  const [trigerHltme, setTrigerHltme] = useState(true);
  const [trigerDact, setTrigerDact] = useState(true);
  const [trigerSlyf, setTrigerSlyf] = useState(true);
  const [trigerMps, setTrigerMps] = useState(true);
  const [trigerProfile, setTrigerProfile] = useState(true);
  const [trigerAvtarVideo, setTrigerAvatarVideo] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  var user = useSelector((state) => state.auth.user);
  const navigation = useNavigation();
  const imageSource = useSelector((state) => state.auth.imageSource);
  const progressBar = useSelector((state) => state.auth.progressBarStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initalize(user.id));
  }, []);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(initalize(user.id));
    setRefreshing(false);
  }, [refreshing]);
  console.log('profile detils', user);
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
          <View style={styles.AvatarView}>
            <Avatar
              size='medium'
              rounded
              source={{
                uri: user.profileURL,
              }}
              showEditButton
              onEditPress={() => alert('not allowed now')}
            />
            <View style={{marginLeft: 8}}>
              <Avatar
                size="medium"
                rounded
                source={{
                  uri: user.AvatarImg,
                }}
                showEditButton
                onEditPress={() => navigation.navigate('Change Avatar')}
              />
            </View>        
            <View
              style={styles.UserName}>
              <Text style={{ fontSize: 18, color: '#fff' }}>{user.fullname}</Text>
            </View>
          </View>
      </View>
      <ScrollView 
        contentContainerStyle={styles.SecondHalf}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        >
        {progressBar && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
        )}
        { trigerImg &&
          trigerHltme &&
          trigerDact &&
          trigerSlyf &&
          trigerMps &&
          trigerProfile &&
          trigerAvtarVideo && (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Voice Questions') }>
                <Card containerStyle={styles.Cards}>
                  <ImageLoader
                    style={{width: width / 1.1, height: height / 2.6}}
                    source={require('../../../assets/healty0.png')}
                  />
                  <Text
                    style={{
                      marginBottom: '2%',
                      marginVertical: '3%',
                      color: '#fff',
                      alignSelf: 'center',
                      fontSize: 22,
                    }}>
                    Questions
                  </Text>
                </Card>
              </TouchableOpacity>
              {/*
              <Card
                containerStyle={{
                  backgroundColor: '#2E71DC',
                  height: height / 2,
                  width: width / 1.08,
                  borderRadius: 15,
                  shadowOffset: {width: 0, height: 3},
                  shadowColor: '#000',
                  shadowOpacity: 0.4,
                  elevation: 4,
                }}>
                {talkToAvatarState || (
                  <View>
                    <ImageLoader
                      style={{
                        width: width / 1.2,
                        height: height / 2.6,
                        alignContent: 'center',
                      }}
                      source={{uri: user.AvatarImg}}
                    />
                    <TouchableOpacity
                      onPress={() => setTalkToAvatarState(true)}>
                      <Text
                        style={{
                          marginBottom: '2%',
                          marginVertical: '2%',
                          color: '#fff',
                          alignSelf: 'center',
                          fontSize: 22,
                        }}>
                        Talk to Avatar
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {talkToAvatarState && (
                  <View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Survey')}>
                        <ImageLoader
                          style={{width: width / 2.5, height: height / 5.3}}
                          source={require('../../../assets/chat.png')}
                        />
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#fff',
                          }}>
                          Questions
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setTrigerAvatarVideo(false)}>
                        <ImageLoader
                          style={{
                            marginHorizontal: '5%',
                            width: width / 2.5,
                            height: height / 5.3,
                          }}
                          source={require('../../../assets/videocall3.png')}
                        />
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#fff',
                          }}>
                          video call
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('VoiceQuestions')}>
                        <ImageLoader
                          style={{
                            marginVertical: '4%',
                            width: width / 2.5,
                            height: height / 5.3,
                          }}
                          source={require('../../../assets/voiceChat.png')}
                        />
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#fff',
                          }}>
                          Voice call
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setTrigerImg(false)}>
                        <ImageLoader
                          style={{
                            marginHorizontal: '5%',
                            marginVertical: '4%',
                            width: width / 2.5,
                            height: height / 5.3,
                          }}
                          source={require('../../../assets/imageChat.png')}
                        />
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            color: '#fff',
                          }}>
                          Photo
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </Card>
              */}
              <TouchableOpacity
                onPress={() => navigation.navigate('Health Timeline')}>
                <Card containerStyle={styles.Cards}>
                  <ImageLoader
                    style={{width: width / 1.1, height: height / 2.6}}
                    source={require('../../../assets/healty8.png')}
                  />
                    <Text
                      style={{
                        marginBottom: '2%',
                        marginVertical: '2%',
                        color: '#fff',
                        alignSelf: 'center',
                        fontSize: 22,
                      }}>
                      Health Timeline
                    </Text>
                </Card>
              </TouchableOpacity>
              
              <Button
                onPress={() => {
                  dispatch(userSignout());
                }}
                title="LogOut"
              />
            </View>
          )}
        {/*
        {!trigerImg && (
          <View style={{alignItems: 'center', alignContent: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <Button
                onPress={() => dispatch(pickImage(user.id, user.fullname))}
                title="Upload image"
              />
              <Button
                style={{marginHorizontal: '2%'}}
                onPress={() => setTrigerImg(true)}
                title="back"
              />
            </View>
            <ImageLoader
              style={{width: width / 2, height: height / 3}}
              source={{uri: imageSource.uri}}
            />
            {progressBar && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
            )}
          </View>
        )}
        {!trigerAvtarVideo && (
          <View style={{alignItems: 'center', alignContent: 'center'}}>
            <Button
              style={{marginHorizontal: '2%'}}
              onPress={() => dispatch(pickVideo(user.id, user.fullname))}
              title="Upload video"
            />
            <Button
              style={{marginHorizontal: '2%'}}
              onPress={() => setTrigerAvatarVideo(true)}
              title="back"
            />
            <Button
              style={{marginHorizontal: '2%'}}
              onPress={() => setTrigerAvatarVideo(true)}
              title="Start a video call to Avatar"
            />
            <Button
              style={{marginHorizontal: '2%'}}
              onPress={() => navigation.navigate('Video')}
              title="Start a video call to Doctor"
            />
            <ImageLoader
              style={{width: width / 2, height: height / 3}}
              source={{uri: imageSource.uri}}
            />
            {progressBar && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#2E71DC" />
            )}
          </View>
        )}
        {!trigerDact && (
          <View>
            <Text>triger form Daily Activity</Text>
          </View>
        )}
        {!trigerHltme && (
          <View>
            <Text>triger form Health timeline</Text>
          </View>
        )}
        {!trigerMps && <View></View>}
        {!trigerProfile && (
          <View>
            <Text>triger form profile and setting</Text>
          </View>
        )}
        {!trigerSlyf && (
          <View>
            <Text>triger form social life</Text>
          </View>
        )}
        */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  FirstHalf: {
    paddingBottom: "1.5%"
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
  SecondHalf: {},
  Cards: {
    backgroundColor: '#2E71DC',
    height: height / 2,
    width: width / 1.08,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 3},
    shadowColor: '#000',
    shadowOpacity: 0.4,
    elevation: 4,
  },
});

export default ProfileScreen;
