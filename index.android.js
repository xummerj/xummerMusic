/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TouchableHighlight,
  Text,
  View
} from 'react-native';
var Lrc = require('./components/common/Lrc');
var Sound = require('react-native-sound');
class xummerMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {time:0};
  }    
  render() {

    return (
      <View>
        

        <TouchableHighlight onPress={this._onPressButton.bind(this)}>
          <Text>点我</Text>
        </TouchableHighlight>
      </View>
    );
  }
  _onPressButton() {
    this.setState({time: 50});


    // Load the sound file 'whoosh.mp3' from the app bundle
    var whoosh = new Sound('music.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
      } else { // loaded successfully
        whoosh.setVolume(1).play();
        console.log(whoosh);
        console.log('duration in seconds: ' + whoosh._duration +
            'number of channels: ' + whoosh._numberOfChannels);
        
      }
    });

    

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('xummerMusic', () => xummerMusic);
