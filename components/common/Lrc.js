/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
var React = require('react-native');
var Util = require('./Util');

var {
    AppRegistry,
    StyleSheet,
    AsyncStorage,
    Component,
    Animated,
    Text,
    View,
    } = React;
var lrcData = null;

var Lrc = React.createClass({
  componentDidMount() {
    this._loadLrcRow(this.props.lrcUrl);
  },
  componentWillReceiveProps(nextProps){
    if(this.props.lrcUrl!=nextProps.lrcUrl){
      this._loadLrcRow(nextProps.lrcUrl);
    }
    if(this.state.currentime.toFixed(1)!=nextProps.currentime.toFixed(1)){
      let index = 0;
      let lrcRow = this.state.lrcRow;
      for(let i=0; i<lrcRow.length; i++){
         if(lrcRow[i].timed.toFixed(1) == nextProps.currentime.toFixed(1)){
           index=i;
           break;
         }
      }
      if(index > 0){
        this.setState({currentime:nextProps.currentime});
        let times = (lrcRow[index].timed-lrcRow[index-1].timed)*1000;
        //console.log(times,-(26*index))
        Animated.timing(this.state.marginTop, {
                toValue: -(32*index), // 目标值
                duration: times // 动画时间
              }).start();
        this._setLrcView(index);
      }
    }
  },
  getInitialState() {
    return {
      marginTop :new Animated.Value(0),
      lrcUrl:"",
      lrcRow :[],
      lrcView :[],
      currentime :0
    };
  },
  render() {

    //console.log(view);
    //this.state.lrcRow.map(function(row){return <div>Hello, {row.time}!</div>})
    return (
      <Animated.View style={[styles.container,{marginTop:this.state.marginTop}]}>
        {this.state.lrcView}
      </Animated.View>
    );
  },
  _onValueChange(key,value) {
    //this.setState({selectedValue});
    AsyncStorage.setItem(key, value)
      .then(() => this._appendMessage('Saved selection to disk: ' + value))
      .catch((error) => this._appendMessage('AsyncStorage error1: ' + error.message))
      .done();
  },
  _removeStorage() {
    AsyncStorage.removeItem(STORAGE_KEY)
      .then(() => this._appendMessage('Selection removed from disk.'))
      .catch((error) => { this._appendMessage('AsyncStorage error: ' + error.message) })
      .done();
  },
  _appendMessage(message) {
    this.setState({message: message});
  },
  _getLrcData(url,data,callback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
      //callback(responseText);
    });
  },
  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {

  },
  _parseLrc: function(lrc){
        var regex = /^[^\[]*((?:\s*\[\d+\:\d+(?:\.\d+)?\])+)([\s\S]*)$/; /* 提取歌词内容行 */
        var regex_time =  /\[(\d+)\:((?:\d+)(?:\.\d+)?)\]/g; /* 提取歌词时间轴 */
        var regex_trim = /^\s+|\s+$/; /* 过滤两边空格 */
        //var format = '<li class="time_{time}">{html}</li>'; /* 模板 */
        var html = '';
        var txt = lrc.split("\n");
        var list = [];
        //对拆分的每行进行提取时间和歌词内容
        for(var i = 0; i < txt.length; i++) {
            //获取一行并去掉两端的空格 [00:11.38]如果你眼神能够为我片刻的降临
            item = txt[i].replace(regex_trim, '');
            //然后取出歌词信息
            if(item.length < 1 || !(item = regex.exec(item))) continue;
            while(item_time = regex_time.exec(item[1])) {
                list.push({timed:parseFloat(item_time[1])*60+parseFloat(item_time[2])-1, content:item[2]});
            }
            if(list.length > 0) {
            /* 对时间轴排序 */
              list.sort(function(a,b){ return a.timed-b.timed; });
              //if(list[0].timed >= 0.1) list.unshift({timed:list[0].timed-0.1, content:''});
              //list.push( {time:list[list.length-1].time+1, content:''} );
            }
            //this.regex_time.lastIndex = 0;
        }
        return list;
    },
    _loadLrcRow:function(lrcUrl){
      var _this = this;
      var lrcData = [];
      AsyncStorage.getItem(lrcUrl)
      .then((value) => {
        if (value !== null){
          let lrcRow = _this._parseLrc(value);
          this.setState({lrcUrl:lrcUrl,lrcRow:lrcRow});
          this._setLrcView(0);
        } else {
           //this._appendMessage('Initialized with no selection on disk.');
           this._getLrcData(lrcUrl,{},
            function(json){
              let lrcRow = json[0]['content'];
              _this._onValueChange(lrcUrl,lrcRow);
              _this.setState({lrcUrl:lrcUrl,lrcRow:_this._parseLrc(lrcRow)});
              _this._setLrcView(0);
            }
           );
        }
      })
      .catch((error) => this._appendMessage('AsyncStorage error1: ' + error.message))
      .done();
    },
    _setLrcView:function(index){
      //console.log(index,this.state.lrcRow)
      var view = [];
      if(this.state.lrcRow.length>0){
        this.state.lrcRow.map(function(row,i){view.push(<Text key={"a"+row.timed} data-time={row.timed} style={[styles.lrcRow,{color:i==index?"#00ffff":"#000"}]}>{row.content}</Text>);});
        this.setState({lrcView:view});
      }
    }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf:'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  lrcRow: {
    fontSize: 20,
    height: 26,
    alignItems: 'flex-start',
    textAlign: 'center',
    margin: 3,
  }
});

module.exports = Lrc;
