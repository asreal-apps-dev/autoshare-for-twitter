import { SET_AUTOTWEET_ENABLED, SET_ERROR_MESSAGE, SET_TWEET_TEXT, SET_SAVING, SET_LOADED } from './constants';

export const DEFAULT_STATE = { autotweetEnabled: false, errorMessage: '', loaded: false, tweetText: '' };

export default function reducer( state = DEFAULT_STATE, action ) {
	switch ( action.type ) {
		case SET_AUTOTWEET_ENABLED:
			return {
				...state,
				autotweetEnabled: action.autotweetEnabled,
			};

		case SET_ERROR_MESSAGE:
			return {
				...state,
				errorMessage: action.errorMessage,
			};

		case SET_LOADED: {
			return {
				...state,
				loaded: true,
			};
		}

		case SET_SAVING: {
			return {
				...state,
				saving: action.saving,
			};
		}

		case SET_TWEET_TEXT: {
			return {
				...state,
				tweetText: action.tweetText,
			};
		}
	}
}
