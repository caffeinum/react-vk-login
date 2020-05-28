'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _getURL = require('./getURL');

var _getURL2 = _interopRequireDefault(_getURL);

var _getQueryParameter = require('./getQueryParameter');

var _getQueryParameter2 = _interopRequireDefault(_getQueryParameter);

var _reset = require('./reset');

var _reset2 = _interopRequireDefault(_reset);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global localStorage */

var VKLogin = (_temp2 = _class = function (_React$Component) {
  (0, _inherits3.default)(VKLogin, _React$Component);

  function VKLogin() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, VKLogin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = VKLogin.__proto__ || Object.getPrototypeOf(VKLogin)).call.apply(_ref, [this].concat(args))), _this), _this.start = function () {
      var state = Math.random().toString(36).substring(7);
      var clientId = _this.props.clientId;
      var scope = _this.props.scope;
      localStorage.vkReactLogin = state;
      localStorage.vkReactLoginRedirectUri = window.location.href;
      window.location.href = (0, _getURL2.default)({ clientId: clientId, state: state, scope: scope });
    }, _this.restart = function () {
      var state = localStorage.vkReactLogin;
      var redirectUri = localStorage.vkReactLoginRedirectUri;
      if (!redirectUri) return;
      if (!state) return;
      if (state !== (0, _getQueryParameter2.default)('state')) return;
      if (!(0, _getQueryParameter2.default)('code')) return;
      var code = (0, _getQueryParameter2.default)('code');
      (0, _reset2.default)();
      _this.props.callback({ code: code, redirectUri: redirectUri });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(VKLogin, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.restart();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { style: { transition: 'opacity 0.5s' } },
        _react2.default.createElement(
          'button',
          { className: this.props.cssClass, onClick: this.start },
          this.props.text
        )
      );
    }
  }]);
  return VKLogin;
}(_react2.default.Component), _class.propTypes = {
  clientId: _react2.default.PropTypes.string,
  callback: _react2.default.PropTypes.func.isRequired,
  className: _react2.default.PropTypes.string,
  text: _react2.default.PropTypes.node,
  scope: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)
}, _temp2);
exports.default = VKLogin;