
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


var Spectrum = React.createClass({
	sound:null,
  getInitialState: function() {
    return {
      spectrumData: null,
      capHeightData: []
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
    //this.state.capHeightData.map(function(height){return <View style={[styles.caps, {height:height}]}></View>})
    console.log(this.state.capHeightData);
    var i=0;
    return (
      <View style={styles.container}>{
        this.state.capHeightData.map(function(height){i++;return <View key={i} style={[styles.caps, {height:height}]}></View>})
      }
      </View>
    );
  },
  _getCapHeight: function(spectrumData) {
            var meterNum = 40;
            var step = Math.round(spectrumData.length / meterNum); //计算采样步长
            var arr = [];

            for (var i = 2,j=1; j < meterNum; i++) {

                var val = Math.hypot(spectrumData[i], spectrumData[i + 1]);

                i += 2; 
                arr[j] = val/256 * 100; 
                j++;
                //获取当前能量值
                // if (capYPositionArray.length < Math.round(meterNum)) {
                //     capYPositionArray.push(value); //初始化保存帽头位置的数组，将第一个画面的数据压入其中
                // };
                // ctx.fillStyle = capStyle;
                // //开始绘制帽头
                // if (value < capYPositionArray[i]) { //如果当前值小于之前值
                //     ctx.fillRect(i * capWidth, cheight - (--capYPositionArray[i]), meterWidth, capHeight); //则使用前一次保存的值来绘制帽头
                // } else {
                //     ctx.fillRect(i * capWidth, cheight - value, meterWidth, capHeight); //否则使用当前值直接绘制
                //     capYPositionArray[i] = value;
                // };
                // //开始绘制频谱条
                // ctx.fillStyle = gradient;
                // ctx.fillRect(i * capWidth, cheight - value + capHeight, meterWidth, cheight);
            }
            arr.reverse();
            this.setState({capHeightData:arr});
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