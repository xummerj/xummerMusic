
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
} = React;
var Sound = require('react-native-sound');
var Spectrum = require('./CanvasView');
var Lrc = require('./Lrc');
var Player = React.createClass({
	sound:null,
  getInitialState: function() {
    return {
      musicUrl:"",
      isPlay:false,
      isStop:true,
      output:"",
      spectrumData:[],
      currentime:0

    };
  },
  componentWillReceiveProps: function(nextProps){
  	console.log(this.props.musicUrl,nextProps.musicUrl);
    if(this.props.musicUrl !== nextProps.musicUrl){
      this.playMusic(nextProps.musicUrl);
    }
  },
  playMusic: function(url){

	  	var Visualizer = data => {
	  		//this.spectrumData = data.waveform;
	      // var text = JSON.stringify(data);
	      this.sound.getCurrentTime((seconds) => this.setState({currentime:seconds}) );
	      this.setState({spectrumData: data.waveform});
	    };
    	this.sound = new Sound(url, Sound.MAIN_BUNDLE, (error) => {
	        if (error) {
	          console.log('failed to load the sound', error);
	        } else { // loaded successfully
	          this.sound.play(
	          function(){

	          },Visualizer);
	          console.log('duration in seconds: ' + this.sound._duration +
	              'number of channels: ' + this.sound._numberOfChannels);
	        }
      });
  },
  render: function(){
  	//console.log(2222222222222222,typeof this.state.spectrumData);
  	return (
  		<View style={styles.container}>
  			<Spectrum style={{width:200,height:100,backgroundColor: '#000'}} fft={this.state.spectrumData}/>
  		</View>
  	);
  },
  playCompletion: function(){

  }
});
const styles = StyleSheet.create({
  container: {
    flex: 5,
    height:200,
    flexDirection:'column',
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

module.exports = Player;



    