# React VK Login Button

The code was adapted from https://github.com/appigram/react-vk-login.

It's updated for the last React version.

```sh
npm i react-vk-login-button
```

```js
import React from 'react'
import VKLogin from 'react-vk-login-button'

export default class LoginWithVK extends React.Component {

  callbackVK = ({ code, redirectUri }) => {
    // Login with vk
  }

  render () {
    return (
      <VKLogin
        clientId='xxx'
        callback={this.callbackVK}
        render={renderProps => (
          <button onClick={renderProps.onClick}>
            Login with VK
          </button>
        )}
      />
    )
  }

}

```
