import * as React from 'react';
import * as ReactNative from 'react-native';

declare namespace RNLOA {

	export interface LinkedInOAuthProps extends React.Props<LinkedInOAuth> {
		redirectUrl: string
		clientId: string
		clientSecret: string
		state: string
		scope?: Array<string>

		onSuccess: (result: OAuthResult) => void
		onCancel: () => void
		onFail: (error: OAuthError) => void
	}

	export class LinkedInOAuth extends React.Component<LinkedInOAuthProps, {}> { }

	export interface OAuthResult {
		accessToken: string
		expiresIn: string
	}

	export interface OAuthError {
		type: string
		message: string
	}
}

export = RNLOA;
