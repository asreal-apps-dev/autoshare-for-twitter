import { getRandomText } from "../support/functions";

describe( 'Tests that new post is tweeted when box is checked', () => {
	it( 'Tests that new post is tweeted when box is checked', () => {
		cy.visitAdminPage( 'post-new.php' );
		let postTitle = getRandomText(8);
		cy.get( '#title' ).type( 'Random Post Title' + postTitle );
		cy.get( '#autoshare-for-twitter-enable' ).click();
		cy.get( '#publish' ).click();

		// Post-publish.
		cy.get( '#autoshare_for_twitter_metabox', { timeout: 10000 } ).should( 'be.visible' );
		cy.get( '#autoshare_for_twitter_metabox', { timeout: 10000 } ).contains( 'Tweeted on' );
	} );
} );


