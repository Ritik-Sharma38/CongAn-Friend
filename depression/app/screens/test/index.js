import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { View, Text, Button } from 'react-native';
import {useRoute, useNavigation } from '@react-navigation/native';

const Test = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const channel = route.params;
  console.log(channel.channel)
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appid: '34f0ee59b86a4fb295ddf82332a459c6',
    channel: channel.channel,
  };
  const callbacks = {
    onEndCall: () => setVideoCall(false)
  }
 
  return (
    videoCall ?
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} /> : <></>

  );
};

export default Test;