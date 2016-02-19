'use strict';

var React = require('react-native');
var {
  View,
  WebView
} = React;

var Canvas = React.createClass({

  propTypes: {
    context: React.PropTypes.object,
    render: React.PropTypes.func.isRequired
  },

  render() {

    var contextString = JSON.stringify(this.props.context);
    var renderString = this.props.render.toString();
    console.log(renderString);
    return (
      <View>
        <WebView
          automaticallyAdjustContentInsets={false}
          javaScriptEnabled={true}
          contentInset={{top: 0, right: 0, bottom: 0, left: 0}}
          html={"<style>*{margin:0;padding:0;}canvas{position:absolute;transform:translateZ(0);}</style><canvas></canvas><script>var canvas = document.querySelector('canvas');(" + renderString + ").call(" + contextString + ", canvas);</script>"}
          opaque={false}
          underlayColor={'transparent'}
          style={this.props.style}
        />
      </View>
    );
  }
});

module.exports = Canvas;
