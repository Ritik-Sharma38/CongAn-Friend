import React, { useState } from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Test = () => {
  const [videoCall, setVideoCall] = useState(true);
  const rtcProps = {
    appid: '34f0ee59b86a4fb295ddf82332a459c6',
    channel: 'test',
  };
  const navigation = useNavigation();
  const callbacks = {
    onEndCall: () => setVideoCall(false)
  }
 
  return (
    videoCall ?
        <AgoraUIKit rtcProps={rtcProps} callbacks={callbacks} /> : <></>

  );
};

export default Test;