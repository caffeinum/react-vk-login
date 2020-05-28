'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var clientId = _ref.clientId,
      state = _ref.state,
      scope = _ref.scope;

  var current = encodeURIComponent(window.location.href);
  var base = 'https://oauth.vk.com/authorize?response_type=code';
  var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
  var display = mobile ? 'touch' : 'popup';
  var fullScope = scope && scope.length ? '&scope=' + encodeURIComponent(scope) : '';
  return base + '&client_id=' + clientId + '&redirect_uri=' + current + '&desplay=' + display + '&state=' + state + fullScope;
};