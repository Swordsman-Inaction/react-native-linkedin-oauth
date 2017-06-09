# React Native LinkedIn OAuth
A react-native component to get access token via OAuth 2.0.


## Purpose

Get access token with the OAuth 2.0 solution.


## Why not Mobile SDK?

According to the [official documentation of Mobile SDK](https://developer.linkedin.com/docs/android-sdk-auth), the access tokens we get via Mobile SDK cannot be used on server-side REST API calls. And there is no mechanism available to exchange them. But sometimes we just want a access token which can be used on server-side, too!

If you just want Mobile SDK Integration, check [react-native-linkedin-login](https://github.com/jodybrewster/react-native-linkedin-login) or [react-native-linkedin-sdk](https://github.com/joonhocho/react-native-linkedin-sdk).


## Installation

`yarn add react-native-linkedin-oauth`

Yes, that simple!

## Documentation

`LinkedInOAuth` is the only component, it will show a webview which let user to login and grant access to your app, the access token will be passed through the callback. Check [here](https://developer.linkedin.com/docs/oauth2) to see the OAuth 2.0 process.

**Reminder:** It's just a component, you should wrap it up, provide a nice navigation bar with a close button.

### Props

Name			| Type							| Required
-----  		| ------  					| --------
redirectUrl	| string						| Yes
clientId		| string						| Yes
clientSecret	| string						| Yes
state			| string						| Yes
scope			| Array\<string\>			| No
onSuccess		| (result: OAuthResult) => void| Yes
onFail			| (error: OAuthError) => void | Yes
onCancel		| () => void					| Yes

### OAuthResult

Name			| Type
----			| ----
accessToken	| string
expiresIn		| string

### OAuthError

Name			| Type
----			| ----
type			| string
message		| string
