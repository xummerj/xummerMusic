'use strict';


import { requireNativeComponent, PropTypes,View} from 'react-native';

var iface = {
  name: 'CanvasView',
  propTypes: {
  	...View.propTypes,
    fft: PropTypes.array,
  },
};

module.exports = requireNativeComponent('RCTCanvasView', iface);

