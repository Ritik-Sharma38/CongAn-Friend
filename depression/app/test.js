import React, { Component }from 'react'
import { View, FlatList, Text, StyleSheet, StatusBar,Image, Dimensions, } from 'react-native';
import { Avatar, Card, Button, Icon  } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');

export default class AvtarSelection extends React.Component {

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
      entries: [
        { 
          id: 1,
          title: 'https://reactnative.dev/img/tiny_logo.png' 
        },
        { 
          id: 2,
          title: 'https://reactnative.dev/img/tiny_logo.png' 
        },
        { 
          id: 2,
          title: 'https://reactnative.dev/img/tiny_logo.png' 
        },
      ],
    }
  }

  componentDidMount() {
    this._carousel.snapToItem(2);
  }

  handleSnapToItem(index){
    console.log("snapped to ", index)
  }

  _renderItem = ({item, index}) => {
    return (
          <Card
            containerStyle={{borderRadius: 30, height: height/2, width: width/1.08,}}>
            <Image
              style={{width: width, height: height/3,}}
              source={{uri: item.title}}
            />
            <Text style={{marginBottom: '2%', marginVertical: '2%'}}>
              Write something about the teen girl.
            </Text>
            <Button
              buttonStyle={{borderRadius: 25 , marginVertical: height/15 }}
              title='This is me' />
          </Card>
  );}

  render =() => {
    return (
      <View style = {styles.container}>
        <View style = {styles.FirstHalf}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.entries}
          renderItem={this._renderItem.bind(this)}
          onSnapToItem={this.handleSnapToItem.bind(this)}
          sliderWidth={150}
          itemWidth={100}
          layout={'default'}
          firstItem={0}
        />
        </View>
        <View style = {styles.SecondHalf}>
          <Text style={{fontSize: 50}}>Avtar Selection</Text>
        </View>
      </View>
    );  
  }
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