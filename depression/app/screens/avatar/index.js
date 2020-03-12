<<<<<<< HEAD:depression/app/Avtar.js
import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar,Image, Dimensions, TouchableOpacity } from 'react-native';
import { Avatar, Card, Button, Icon  } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel'; 

const { width, height } = Dimensions.get('window');

export default class AvtarSelection extends Component {

  constructor(props){
    super();
    this.state = {
      errors: []
    }
    this.props = props;
    this._carousel = {};
    this.init();
  }

  init(){
    this.state = {
      videos: [
        { 
          uri: require('../assets/teenGirl2.png'),
          title: 'Write something about the TeenGirl.'
        },
        { 
          uri: require('../assets/teenBoy2.png'),
          title: 'Write something about the TeenBoy.' 
        },
        { 
          uri: require('../assets/women.png'),
          title: 'Write something about the Woman.' 
        },
        { 
          uri: require('../assets/man2.png'),
          title: 'Write something about the Man.' 
        },
        { 
          uri: require('../assets/teenboy.png'),
          title: 'Write something about the avatar.' 
        },
        { 
          uri: require('../assets/teenGirl.jpg'),
          title: 'Write something about the avatar.' 
        },
        { 
          uri: require('../assets/unname.png'),
          title: 'Write something about the avatar.' 
        },
        { 
          uri: require('../assets/man.jpg'),
          title: 'Write something about the avatar.' 
        },
      ]
    };

  }

  componentDidMount() {
    this._carousel.snapToItem(2);
  }

  _renderItem = ( {item, index} ) => {
    return (
      <Card
        containerStyle={{borderRadius: 30, height: height/2, width: width/1.1,}}>
        <Image
          style={{width: width/1.2, height: height/3,}}
          source={item.uri}
        />
        <Text style={{marginBottom: '2%', marginVertical: '2%'}}>
          {item.title}
        </Text>
        <Button
          onPress = { () => alert("Further app under development")}
          buttonStyle={{borderRadius: 25 , marginVertical: height/15 }}
          title='This is me' />
      </Card>  
    );
  }

  render = () => {
    console.log("rendering Avtar selection page")
    return (
      <View style = {styles.container}>
        <View style = {styles.FirstHalf}>
          <Carousel
            ref={ (c) => { this._carousel = c; } }
            data={this.state.videos}
            renderItem={this._renderItem.bind(this)}
            sliderWidth={width}
            itemWidth={width}
            layout={'stack'}
            layoutCardOffset={8}
            firstItem={0}
          />
        </View>
        <View style = {styles.SecondHalf}>
          <Text style={{fontSize: 50}}>Write about why do user need to select avatar ?</Text>
        </View>
      </View>
    );
  }
=======
import React, {Component }from 'react'
import { View, Text, StyleSheet, StatusBar,Image} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
function Avtar(){
  const navigation = useNavigation();
  return (
    <Onboarding
    onSkip={() => {
        navigation.navigate("Profile")
    }}
    onDone={() => {
          navigation.navigate("Profile")//alert("further app is under development")
        }}
    pages={[
      {
        backgroundColor: 'rgba(0, 130, 255, 1)',
        image: <Image
                style={{ resizeMode: 'center',}}
                source={require('../../assets/teenGirl2.png')} />,
        title: 'Select your avatar',
        subtitle: "Description",
      },
      {
        backgroundColor: 'rgba(0, 130, 255, 1)',
        image: <Image
                style={{ resizeMode: 'center', }}
                source={require('../../assets/teenBoy2.png')} />,
        title: 'Page 2',
        subtitle: 'app description',
      },
      {
        backgroundColor: 'rgba(0, 130, 255, 1)',
        image: <Image
                style={{ resizeMode: 'center', }}
                source={require('../../assets/women.png')} />,
        title: "Page 3",
        subtitle: "app discription",

      },
      {
        backgroundColor: 'rgba(0, 130, 255, 1)',
        image: <Image
                style={{ resizeMode: 'center', }}
                source={require('../../assets/man2.png')} />,
        title: "Page 4",
        subtitle: "app discription",

      },
    ]}
  />
  );
>>>>>>> redux-thunk_integration:depression/app/screens/avatar/index.js
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
    FirstHalf: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
      height: height/1.5,
      alignItems: 'center',
      alignContent: 'center',
      backgroundColor: '#2E71DC',
    },
    SecondHalf: {
      alignItems: 'center',
    },
    Cards: {
      backgroundColor: 'white',
      height: height/3,
      width: width/1.5,
      borderRadius: 75,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 3 },
      shadowColor: '#000',
      shadowOpacity: 0.4,
      elevation: 4,
    },
  }
);
export default Avtar;
