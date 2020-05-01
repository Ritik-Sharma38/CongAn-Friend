import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ProgressBarAndroid, StatusBar } from 'react-native';
import { Card, Button  } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel'; 
import {connect} from 'react-redux';
import {firestoreUpload} from '../../../actions/authAction';

const { width, height } = Dimensions.get('window');

class AvtarSelection extends Component {

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
          uri: require('../../../assets/teenGirl2.png'),
          title: 'Write something about the TeenGirl.',
          name: 'teenGirl2.png'
        },
        { 
          uri: require('../../../assets/teenBoy2.png'),
          title: 'Write something about the TeenBoy.',
          name: 'teenBoy2.png'
        },
        { 
          uri: require('../../../assets/women.png'),
          title: 'Write something about the Woman.',
          name: 'women.png'
        },
        { 
          uri: require('../../../assets/man2.png'),
          title: 'Write something about the Man.',
          name: 'man2.png' 
        },
        { 
          uri: require('../../../assets/teenboy.png'),
          title: 'Write something about the avatar.',
          name: 'teenboy.png' 
        },
        { 
          uri: require('../../../assets/teenGirl.jpg'),
          title: 'Write something about the avatar.',
          name: 'teenGirl.jpg'
        },
        { 
          uri: require('../../../assets/unname.png'),
          title: 'Write something about the avatar.',
          name: 'unname.png'
        },
        { 
          uri: require('../../../assets/man.jpg'),
          title: 'Write something about the avatar.',
          name: 'man.jpg'
        },
      ]
    };
  }
 
  componentDidMount() {
    this._carousel.snapToItem(2);
  }

  profilePage = async(name) => {
    var uid = this.props.user.id
    console.log("user uid = ", uid)
    console.log(name)
    await this.props.firestoreUpload(name, uid)
    console.log("upload success")
  }

  _renderItem = ( {item} ) => {
    var buttonHeight = height/2
    return (
      <Card
        containerStyle={{borderRadius: 25, height: height/2, width: width/1.1,}}>
        <Image
          style={{width: width/1.2, height: height/3,}}
          source={item.uri}
        />
        <Text style={{marginBottom: '2%', marginVertical: '2%', alignSelf: 'center'}}>
          {item.title}
        </Text>
        <Button
          onPress={()=>this.profilePage(item.name)}
          buttonStyle={{borderRadius: 25, marginVertical: buttonHeight/14}}
          title='This is me' />
      </Card>  
    );
  }

  render = () => {
    console.log("rendering Avtar selection page", this.props.user)
    return (
      <View style = {styles.container}>
        <StatusBar backgroundColor='#2E71DC'/>
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
          { this.props.progressBarStatus && (
              <ProgressBarAndroid styleAttr="Horizontal" color="#fff" />
          )}
        </View>
        <View style = {styles.SecondHalf}>
          <Text style={{fontSize: 50}}>
            Write about why do user need to select avatar ?
          </Text>
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
    backgroundColor: '#2E71DC',
  },
  SecondHalf: {
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  progressBarStatus: state.auth.progressBarStatus
});
const mapDispatch = { firestoreUpload };
export default connect(mapStateToProps,mapDispatch)(AvtarSelection);
 