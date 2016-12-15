<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'local.stackish.com');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');
define("LOCALHOST", true);

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         ' +rzjIY$jKW{^~<gBM`+t{/SO0}v9C`W+1dgAAX)(S=Tdgx/v%qe2L{<mY1j@/7X');
define('SECURE_AUTH_KEY',  'V.vLGEJ?*7UTsc$a+u^ZszIU}$PG`$O-VS-iFtJ&D>}9/W:WUylR,-5+k9>1_5=2');
define('LOGGED_IN_KEY',    '4:Q{3dI?Sbqj8q+uV6=Y!H-D8V+|*&Z-,Iq&|]%*Q=i6~+qfz*wr,v[Cy,x`i09J');
define('NONCE_KEY',        'lHyCnF{0|3!I#!,Z_F,zwq5,Is7mX]YzP%PNN#>9+p 0HN48co(3E.`29^Z%lSf3');
define('AUTH_SALT',        '-+I=A2PeUIoA-8[o6SHfph^^.tKFcc[n+2+P4aC:Z+=p9<i1Tt9x %x#y4|oqbAB');
define('SECURE_AUTH_SALT', '9Ui]@YrnChuAodmT#R}.,hgJhq^/qB}q|kp(0C!Oe;%>6{v/YL=Bo1&n#R=Fo9aG');
define('LOGGED_IN_SALT',   '8+n !P-9IRCyBNPC_lPw2NZG#RD=O:]H%W8?+Bs9so&HKn0q-52&Q0*Z7= <O$--');
define('NONCE_SALT',       '1v|hMCI8XNj}:p43DK|8bolP/-.U:[7tA9lMmV;Nkjdm#zV<QhU+GoNv?A 3Z6 9');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'stcksh_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
