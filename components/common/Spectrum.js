
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
  Easing,
  TouchableHighlight,
  Image,
} = React;


var Spectrum = React.createClass({
	sound:null,
  odata:[],
  getInitialState: function() {
    return {
      spectrumData: null,
      capHeightData: [],
      anim: Array(40).fill(0).map(() => new Animated.Value(0)),// 初始化3个值
      anim_h: Array(40).fill(0).map(() => new Animated.Value(0)),
    };
  },
  componentWillReceiveProps: function(nextProps){
    if(this.props.spectrumData !== nextProps.spectrumData){
      this._getCapHeight(nextProps.spectrumData);
      //this.setState({spectrumData:nextProps.spectrumData});
    }
  },
  render: function() {
    var i=0;
    let _this= this;
    return (
      <View style={styles.container}>{
        this.state.anim.map(function(height){i++;return <View key={"v"+i}><Animated.View key={"a"+i} style={[styles.caps_h, {marginBottom:_this.state.anim_h[i]}]}></Animated.View><Animated.View key={i} style={[styles.caps, {height:height}]} /></View>})
      }
      </View>
    );
  },
  _getCapHeight: function(spectrumData) {

    var timing = Animated.timing;
    //console.log(spectrumData);
    for(let i=0;i<40;i++){
      timing(this.state.anim[i], {toValue: spectrumData[i]<1?0:spectrumData[i+1],duration:50}).start();
      timing(this.state.anim_h[i], {toValue: spectrumData[i+1]>this.odata[i]?10:0,duration:100}).start();
    }
    this.odata = spectrumData;  
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
    backgroundColor: '#000',
  },
  caps: {
    width: 4,
    marginRight:0.8,
    backgroundColor:'#0f0',
    height:10,
  },
  caps_h: {
    width: 4,
    marginRight:0.8,
    backgroundColor:'#FFF',
    height:1,
  },

});
module.exports = Spectrum;