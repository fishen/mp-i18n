"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),_index=require("./npm/@tarojs/taro-weapp/index.js"),_index2=_interopRequireDefault(_index),_index3=require("./npm/mp-i18n/index.js");function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var baseUrl="https://raw.githubusercontent.com/fishen/assets/master/wx-i18n",version="1.0.0";_index3.i18n.config({debug:!0,lang:"zh",indexUrl:function(){return baseUrl+"/"+version+"/index.json"},textsUrl:function(e){return baseUrl+"/"+version+"/"+e+".json"}});var _App=function(){function t(){_classCallCheck(this,t);var e=_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.config={pages:["pages/index/index"],window:{backgroundTextStyle:"light",navigationBarBackgroundColor:"#fff",navigationBarTitleText:"WeChat",navigationBarTextStyle:"black"}},e}return _inherits(t,_index.Component),_createClass(t,[{key:"componentDidMount",value:function(){}},{key:"componentDidShow",value:function(){}},{key:"componentDidHide",value:function(){}},{key:"componentDidCatchError",value:function(){}},{key:"_createData",value:function(){}}]),t}();exports.default=_App,App(require("./npm/@tarojs/taro-weapp/index.js").default.createApp(_App)),_index2.default.initPxTransform({designWidth:750,deviceRatio:{640:1.17,750:1,828:.905}});