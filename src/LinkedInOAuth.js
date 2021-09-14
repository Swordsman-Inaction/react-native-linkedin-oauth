import React from 'react';
import {
    View,
    WebView,
} from 'react-native-webview';

import { AUTHORIZATION_URL, ACCESSTOKEN_URL, USER_CANCEL_TYPES } from './Consts'
import { objectToParams, paramsToObject } from './Util'

class LinkedInOAuth extends React.Component {

    constructor(props) {
        super(props);

        this.onLoadStart = this.onLoadStart.bind(this);
        this.requestToken = this.requestToken.bind(this);
    }

    getAuthorizationUrl() {
        const {
            redirectUrl,
            clientId,
            state,
            scope,
        } = this.props;

        let url = `${AUTHORIZATION_URL}?response_type=code&client_id=${clientId}&state=${state}&` +
            `redirect_uri=${encodeURIComponent(redirectUrl)}`;
        if (scope) {
            url = url + `&scope=${scope.join('%20')}`;
        }

        return url;
    }

    onLoadStart(event) {
        const {
            redirectUrl,
            state,
            onSuccess,
            onFail,
            onCancel,
        } = this.props;

        const url = event.nativeEvent.url;

        if (url.startsWith(redirectUrl)) {
            const params = paramsToObject(url);

            if (params.state !== state) {
                onFail({
                    type: 'state_error',
                    message: 'Attention, CSRF ATTACK!!! The state in response is not the same one in request!'
                });

                return;
            }

            if (params.error) {
                if (USER_CANCEL_TYPES.indexOf(params.error) > -1) {
                    onCancel();
                    return;
                }

                onFail({
                    type: params.error,
                    message: params.error_description,
                })
                return;
            }

            if (!params.code) {
                onFail({
                    type: 'Unknown',
                    message: 'I have no idea :(!'
                });
                return;
            }

            this.requestToken(params.code);
        }
    }

    requestToken(authorizationCode) {
        const { redirectUrl, clientId, clientSecret, onSuccess, onFail, onCancel, } = this.props;

        const header = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };

        const parameters = {
            grant_type: 'authorization_code',
            code: authorizationCode,
            redirect_uri: redirectUrl,
            client_id: clientId,
            client_secret: clientSecret,
        };

        const requestOption = {
            method: 'POST',
            headers: header,
            body: objectToParams(parameters)
        };

        fetch(ACCESSTOKEN_URL, requestOption).then((response) => {
            response.json().then((result) => {
                if (result.error) {
                    onFail({
                        type: result.error,
                        message: result.error_description,
                    })
                    return;
                }
                onSuccess({
                    accessToken: result.access_token,
                    expiresIn: result.expires_in,
                });
            }).catch((error) => {
                onFail({
                    type: 'parse_access_token_response_error',
                    message: 'Cannot parse access token response to json.'
                });
            });
        }).catch((error) => {
            onFail({
                type: 'fetch_access_token_request_error',
                message: 'Cannot fetch access token request failed, might be network issue.',
            });
        });
    }

    render() {
        return (
            <WebView
                style={{flex: 1}}
                source={{uri: this.getAuthorizationUrl()}}
                onLoadStart={this.onLoadStart}
                domStorageEnabled={true}
                javaScriptEnabled={true}
            />
        );
    }
}

export default LinkedInOAuth;
