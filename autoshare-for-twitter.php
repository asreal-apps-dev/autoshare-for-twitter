<?php
/**
 * Plugin Name:       Autoshare for Twitter
 * Description:       Automatically tweets the post title or custom message and a link to the post.
 * Disclaimer:        TWITTER, TWEET, RETWEET and the Twitter logo are trademarks of Twitter, Inc. or its affiliates.
 * Version:           2.0.0
 * Requires at least: 5.7
 * Requires PHP:      7.4
 * Author:            10up
 * Author URI:        https://10up.com
 * License:           GPL-2.0-or-later
 * License URI:       https://spdx.org/licenses/GPL-2.0-or-later.html
 * Text Domain:       autoshare-for-twitter
 *
 * @package TenUp\AutoshareForTwitter
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'AUTOSHARE_FOR_TWITTER', __FILE__ );
define( 'AUTOSHARE_FOR_TWITTER_VERSION', '2.0.0' );
define( 'AUTOSHARE_FOR_TWITTER_URL', plugin_dir_url( __FILE__ ) );
define( 'AUTOSHARE_FOR_TWITTER_PATH', plugin_dir_path( __FILE__ ) );
define( 'AUTOSHARE_FOR_TWITTER_INC', AUTOSHARE_FOR_TWITTER_PATH . 'includes/' );

/**
 * Composer check.
 */
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';
}


// Include the main functionality.
require_once plugin_dir_path( __FILE__ ) . 'includes/core.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/utils.php';

/**
 * Play nice with others.
 */
do_action( 'autoshare_for_twitter_loaded' );

/**
 * Register an activation hook that we can hook into.
 */
register_activation_hook(
	__FILE__,
	function () {
		// Don't need to show migration notice to new users.
		update_option( 'autoshare_migrate_to_v2_api_notice_dismissed', true );
	}
);
