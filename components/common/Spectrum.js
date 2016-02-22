
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
  Animated,
  TouchableHighlight,
  Image,
} = React;


var Spectrum = React.createClass({
	sound:null,
  getInitialState: function() {
    return {
      spectrumData: null,
      capHeightData: [],
      anim: Array(40).fill(0).map(() => new Animated.Value(0)) // 初始化3个值
    };
  },
  componentWillReceiveProps: function(nextProps){
    if(this.props.spectrumData !== nextProps.spectrumData){
      this._getCapHeight(nextProps.spectrumData);
      //this.setState({spectrumData:nextProps.spectrumData});
    }
  },
  render: function() {
    //renderCanvas();
    console.log(this.state);
    //this.state.capHeightData.map(function(height){return <View style={[styles.caps, {height:height}]}></View>})
    var i=0;
    return (
      <View style={styles.container}>{
        this.state.anim.map(function(height){i++;return <Animated.View key={i} style={[styles.caps, {height:height}]}></Animated.View>})
      }
      </View>
    );
  },
  _getCapHeight: function(spectrumData) {
    var timing = Animated.timing;
    for(let i=0;i<40;i++){
      timing(this.state.anim[i], {toValue: spectrumData[i],duration}).start();
    }     
            // var meterNum = 40;
            // var step = Math.round(spectrumData.length / meterNum); //计算采样步长
            // var arr = [];

            // for (var i = 0; i < meterNum; i++) {
            //     arr[i] = spectrumData[i*step];
            //     //获取当前能量值
            //     // if (capYPositionArray.length < Math.round(meterNum)) {
            //     //     capYPositionArray.push(value); //初始化保存帽头位置的数组，将第一个画面的数据压入其中
            //     // };
            //     // ctx.fillStyle = capStyle;
            //     // //开始绘制帽头
            //     // if (value < capYPositionArray[i]) { //如果当前值小于之前值
            //     //     ctx.fillRect(i * capWidth, cheight - (--capYPositionArray[i]), meterWidth, capHeight); //则使用前一次保存的值来绘制帽头
            //     // } else {
            //     //     ctx.fillRect(i * capWidth, cheight - value, meterWidth, capHeight); //否则使用当前值直接绘制
            //     //     capYPositionArray[i] = value;
            //     // };
            //     // //开始绘制频谱条
            //     // ctx.fillStyle = gradient;
            //     // ctx.fillRect(i * capWidth, cheight - value + capHeight, meterWidth, cheight);
            // }
            this.setState({capHeightData:spectrumData});
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#F5FCFF',
  },
  caps: {
    width: 5,
    marginLeft:1,
    backgroundColor:'#0f0',
    height:10,
  },

});
module.exports = Spectrum;