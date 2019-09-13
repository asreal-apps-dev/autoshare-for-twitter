import apiFetch from '@wordpress/api-fetch';
import { Button, CheckboxControl, Dashicon, TextareaControl } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { debounce } from 'lodash';
import { enableAutotweetKey, restUrl, tweetBodyKey } from 'admin-autotweet';
import { __ } from '@wordpress/i18n';

import { STORE } from './store';

export function AutotweetPrePublishPanel( {
	autotweetEnabled,
	errorMessage,
	saving,
	setAutotweetEnabled,
	setErrorMessage,
	setSaving,
	setTweetText,
	tweetText,
} ) {
	const [ overriding, setOverriding ] = useState( false );
	const [ overrideLength, setOverrideLength ] = useState( 0 );

	const saveData = debounce( async () => {
		const body = {};
		body[ enableAutotweetKey ] = autotweetEnabled;
		body[ tweetBodyKey ] = tweetText;

		try {
			const response = await apiFetch( {
				url: restUrl,
				data: body,
				method: 'POST',
				parse: false, // We'll check the response for errors.
			} );

			if ( ! response.ok ) {
				throw response;
			}

			await response.json();

			setErrorMessage( '' );
			setSaving( false );
		} catch ( e ) {
			// eslint-disable-next-line no-console
			console.log( e );
		}
	}, 1000 );

	useEffect( () => {
		saveData();
	}, [ autotweetEnabled, tweetText ] );

	const twitterIconClass = () => {
		const iconClass = autotweetEnabled ? 'enabled' : 'disabled';
		return `${ iconClass } ${ saving ? 'pending' : '' }`;
	};

	return (
		<>
			<div className="autotweet-prepublish__checkbox-row">
				<Dashicon icon="twitter" className={ twitterIconClass() } />
				<CheckboxControl
					style={ { marginLeft: '1rem' } }
					label={ __( 'Tweet this post?', 'autotweet' ) }
					checked={ autotweetEnabled }
					onChange={ ( checked ) => {
						setAutotweetEnabled( checked );
					} }
				/>
			</div>

			{ autotweetEnabled && (
				<div className="autotweet-prepublish__override-row">
					<Button isLink onClick={ () => {
						setOverriding( ! overriding );
					} }>
						{ overriding ? __( 'Cancel override.', 'autotweet' ) : __( 'Override text.', 'autotweet' ) }
					</Button>

					{ overriding && (
					<>
						<TextareaControl
							value={ tweetText } onChange={ ( value ) => {
								if ( value.length <= 280 ) {
									setTweetText( value );
									setOverrideLength( value.length );
								}
							} }
							label={ __( 'Enter tweet text.', 'autotweet' ) }
						/>
						<span id="tenup-auto-tweet-counter-wrap" className="alignright">{ overrideLength }</span>
					</>
					) }

				</div>
			) }

			<div>{ errorMessage }</div>
		</>
	);
}

export default compose(
	withSelect( ( select ) => {
		return {
			autotweetEnabled: select( STORE ).getAutotweetEnabled(),
			errorMessage: select( STORE ).getErrorMessage(),
			saving: select( STORE ).getSaving(),
			tweetText: select( STORE ).getTweetText(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		return {
			setAutotweetEnabled: dispatch( STORE ).setAutotweetEnabled,
			setErrorMessage: dispatch( STORE ).setErrorMessage,
			setSaving: dispatch( STORE ).setSaving,
			setTweetText: dispatch( STORE ).setTweetText,
		};
	} ),
)( AutotweetPrePublishPanel );
