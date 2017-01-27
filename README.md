Trivago JavaScript oauth SDK
============================

This package provides possibility for third party applications to log in with trivago.

**Important notes**:
> 1. This library uses native es6 Promise. If you need support IE9+ please define a polyfill in your application.
>
> 2. This library works only in browser environments.

## Client ID

First of all you need to get a client ID.

If you don't have one, please send a request to Christina.Gkofa@trivago.com

## How to start

Include `trv.sdk.js` as a script in your application or use it as a dependency in your code.
As a result you should have `trvOauthSdk` function available in your code.

Next call the initializer function `trvOauthSdk` to register your clientId.
This returns an object with authorize method in it.

Additionally you can pass an options object in order set up scopes. See API reference for more details.

### Script tag
```javascript
const sdk = trvOauthSdk('your-client-id');
sdk.authorize();
```

### CommonJS
```javascript
const init = require('trv-oauth-sdk');
const sdk = init('your-client-id');
sdk.authorize();
```

## Scopes
We have several predefined scopes that you can use at the moment:
- **personal_info** : Access Personal Information (personal data like email, name, address, country)
- **hotel_info** : Access Hotel Information (hotel name, hotel id, hotel location)
- **hotel_analytics** : Access Hotel Performance Analytics
- **billing** : Access Billing Information

If you don't pass any scopes, default one will be used (personal_info).

## API reference

### trvOauthSdk(clientId, options)

Method to initialize your application. Returns an object with `authorize` method in it.
Throws an error if `clientId` was not specified or was not a string.

#### clientId `<string>` *required*
A clientId provided by trivago in order to make possible to log in with trivago.

#### options `<object>` *optional*

##### options.scope `string`:

Oauth scope, default: '' (empty string)

### authorize()

Method that can be triggered on some action (click on a button) in order to open a popup and enter trivago credentials.

## Example
Consider the next example which shows how this library can be used:

```javascript
<script type="text/javascript" src="path/to/trv.sdk.js"></script>
<script type="text/javascript">
    var sdk = trvOauthSdk('your-client-id');

    var button = document.getElementById('button');
    button.addEventListener('click', onClick);
    function onClick() {
        sdk.authorize().then(function(data) {
            console.log('Well done!', data);
        }).catch(function(err) {
            console.log('Something went wrong', err);
        });
    }
</script>

```
