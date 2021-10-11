# Quasar App Extension plugin.auth

> Add a short description of your App Extension. What does it do? How is it beneficial? Why would someone want to use it?

[![npm](https://img.shields.io/npm/v/quasar-app-extension-plugin.auth.svg?label=quasar-app-extension-plugin.auth)](https://www.npmjs.com/package/quasar-app-extension-plugin.auth)
[![npm](https://img.shields.io/npm/dt/quasar-app-extension-plugin.auth.svg)](https://www.npmjs.com/package/quasar-app-extension-plugin.auth)

# Install

```bash
quasar ext add mamy-auth
```

Quasar CLI will retrieve it from NPM and install the extension.

## Prompts

When installing the Auth app extension, you will be prompted with fourteen questions:

1. Route for authentication

The default is /login, it allows you to define the login route

2. Route where the user will be redirected once connected

The default is /, you can define where you want to be redirect once connected

3. Route for code verification after performing the forgotten password

The default is /check_code, you can define other route

4. Route for password update

The default is /reset_password

5. Basic server route

The default is http://localhost:3000, you must point it to your server base url

6. Server route for authentication

The default is /users/sign_in

7. Server route to reset password

The default is /users/reset_password

8. Server route to update password

The default is /users/passwords

9. Authorization type

The default is Bearer but you can change it according to your needs

10. Vuex mutation to set token

The default is auth/setToken in the auth module.
It can be changed from the moment it takes the token in parameter

11. Vuex mutation to clear token and all user state

The default is auth/clearToken in the auth module but can be changed

12. Vuex mutation to set user information when resetting password (email or phone number)

The default is auth/setInfosUser in auth module.
It takes email or phone number, can be changed

13. Vuex getter to return token

The default is auth/getToken and return token, can be changed.

14. Vuex getter to return user information

The default is auth/getInfosUser and return email or phone number

# Uninstall

```bash
quasar ext remove mamy-auth
```

# Info

The parent application must provide the following mutations:

A mutation to store the token, it takes the token in parameter

A mutation to clean the token and the user information

A mutation to define the user information during the process of forgotten password (email or phone number), it takes in parameter the email or the phone number.

A getter which returns the token

A getter that returns the email or the phone number defined during the process of forgotten password.

When installing the extension, the path to these mutations and getters must be provided.
As well as the different routes of the pages and APIs, without forgetting the type of authorization.

# Usage

In auth mutation:

    export function setToken(state, payload) {
        state.token = payload
    }

    export function clearToken(state) {
        state.token = null
    }

In auth getter:

    export function getToken(state) {
        return state.token
    }

# Parent Application (UI)

A Quasar Framework app for Auth Extension

## Install the dependencies

```bash
yarn dep
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
yarn dev
```

### Lint the files

```bash
yarn lint
```

### Launch test with Cypress Studio

```bash
yarn test:e2e
```

### Launch test with Cypress mode CI (Continuous Integration )

```bash
yarn test:e2e:ci
```

### Customize the configuration

See dev/[Configuring quasar.conf.js](https://v2.quasar.dev/quasar-cli/quasar-conf-js).

# Info

Cypress automatically after being launched.

# Usage

## For Cypress Studio

Launch test E2E mode and select your test file

## For Cypress Continuous Integration mode

Launch test E2E with Continuous integration mode and cypress test all file in directory:

```bash
    /test/cypress/integration/
```

# Donate

If you appreciate the work that went into this App Extension, make donation to [Sowell](https://www.sowellapp.com)

# License

MIT (c) Sowell
