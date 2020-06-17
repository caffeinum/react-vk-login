import React from "react";
import PropTypes from "prop-types";
import getURL from "./getURL";
import getQueryParameter from "./getQueryParameter";
import getHashParameter from "./getHashParameter";
import reset from "./reset";
/* global localStorage */

export default class VKLogin extends React.Component {
  static propTypes = {
    clientId: PropTypes.string,
    callback: PropTypes.func.isRequired,
    render: PropTypes.func,
    className: PropTypes.string,
    text: PropTypes.node,
    scope: PropTypes.arrayOf(PropTypes.string),
  };

  componentDidMount() {
    this.restart();
  }

  start = () => {
    const state = Math.random().toString(36).substring(7);
    const clientId = this.props.clientId;
    const scope = this.props.scope;
    const responseType = this.props.responseType;
    localStorage.vkReactLogin = state;
    localStorage.vkReactLoginRedirectUri = window.location.href;
    window.location.href = getURL({ clientId, state, scope, responseType });
  };

  restart = () => {
    const state = localStorage.vkReactLogin;
    const redirectUri = localStorage.vkReactLoginRedirectUri;

    if (!redirectUri) return;
    if (!state) return;
    if (
      state !== getQueryParameter("state") &&
      state !== getHashParameter("state")
    )
      return;

    if (getHashParameter("access_token")) {
      const access_token = getHashParameter("access_token");
      reset();
      this.props.callback({ access_token, redirectUri });
    } else if (getQueryParameter("code")) {
      const code = getQueryParameter("code");
      reset();
      this.props.callback({ code, redirectUri });
    } else {
      console.error("No response token");
    }
  };

  render() {
    return (
      <span style={{ transition: "opacity 0.5s" }}>
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
