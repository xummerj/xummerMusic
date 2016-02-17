
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
var RNFS = require('react-native-fs');
var musicDir = RNFS.DocumentDirectoryPath + '/music';
var jobId1 = -1;
var Player = React.createClass({
  getInitialState: function() {
    return {
      musicUrl:"",
      output: 'Doc folder: ' + RNFS.DocumentDirectoryPath
    };
  },
  componentWillReceiveProps: function(){
    if(this.props.musicUrl!=this.state.musicUrl){
      this.downloadMusic(this.props.musicUrl);
    }
  },
  mkdirMusic: function() {
    return RNFS.mkdir(musicDir).then(success => {
      var text = success.toString();
      this.setState({ output: text });
    }).catch(err => this.showError(err));
  },
  downloadMusic: function(downloadUrl) {
    var progress1 = data => {
      var text = JSON.stringify(data);
      this.setState({ output: text });
    };
    var begin1 = res => {
      jobId1 = res.jobId;
    };
    let localMusic = musicDir + '/' + decodeURI(downloadUrl.substr(downloadUrl.lastIndexOf("/")+1));
    
    RNFS.downloadFile(downloadUrl, localMusic, begin1, progress1).then(
      res => {
          this.setState({ output: JSON.stringify(res), musicurl:downloadUrl})
          var whoosh = new Sound(localMusic, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
            } else { // loaded successfully
              whoosh.play();
              console.log(localMusic);
              console.log('duration in seconds: ' + whoosh._duration +
                  'number of channels: ' + whoosh._numberOfChannels);
              
            }
          });
    }).catch(err => this.showError(err));

    

  },
  showError: function(err){
    console.log(err);
    //this.setState({ output: err.toString() });
  },
  stopDownloadTest: function() {
    RNFS.stopDownload(jobId1);
    RNFS.stopDownload(jobId2);
  },
  render: function() {
    return (
      <View style={styles.container}> 
        <Text style={styles.text}>{this.state.output}</Text>
      </View>
    );
  }
});
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  }
});

module.exports = Player;