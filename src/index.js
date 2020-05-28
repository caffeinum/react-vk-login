import React from 'react';
import PropTypes from 'prop-types';
import getURL from './getURL';
import getQueryParameter from './getQueryParameter';
import reset from './reset';
/* global localStorage */

export default class VKLogin extends React.Component {

  static propTypes = {
    clientId: PropTypes.string,
    callback: PropTypes.func.isRequired,
    render: PropTypes.func,
    className: PropTypes.string,
    text: PropTypes.node,
    scope: PropTypes.arrayOf(PropTypes.string),
  }

  componentDidMount() {
    this.restart();
  }

  start = () => {
    const state = Math.random().toString(36).substring(7);
    const clientId = this.props.clientId;
    const scope = this.props.scope;
    localStorage.vkReactLogin = state;
    localStorage.vkReactLoginRedirectUri = window.location.href;
    window.location.href = getURL({ clientId, state, scope });
  }

  restart = () => {
    const state = localStorage.vkReactLogin;
    const redirectUri = localStorage.vkReactLoginRedirectUri;
    if (!redirectUri) return;
    if (!state) return;
    if (state !== getQueryParameter('state')) return;
    if (!getQueryParameter('code')) return;
    const code = getQueryParameter('code');
    reset();
    this.props.callback({ code, redirectUri });
  }

  render() {
    return (
      <span style={{transition: 'opacity 0.5s'}}>
        {this.props.render ? (
          this.props.render({ onClick: this.start, ...this.props })
        ) : (
          <button className={this.props.cssClass} onClick={this.start}>
            {this.props.text}
          </button>
        )}
      </span>
    );
  }

}
