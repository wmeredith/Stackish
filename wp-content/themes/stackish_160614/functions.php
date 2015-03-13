<?php
//
// Register and then enqueue scripts, stylesheets and other files on non-admin site pages. 
//
function stck_scripts_styles() {
	if (!is_admin()) {  
		/* You don't have to register/enqueue jQuery IF LISTED AS A DEPENDANT */
		wp_register_script('stck_js', get_bloginfo('template_url') . '/js/build/production.min.js', array('jquery'), '1.0', true);
		wp_enqueue_script('stck_js');

		wp_register_style( 'stck_style', get_bloginfo('template_url') . '/style.css', false, '1.0', 'screen' );
		wp_enqueue_style( 'stck_style' );

    // wp_register_style( 'fontello_style', get_bloginfo('template_url') . '/fonts/fontello/css/fontello.css', false, '1.0', 'screen' );
    // wp_enqueue_style( 'fontello_style' );

    wp_enqueue_script( 'typekit', '//use.typekit.net/fxo1hci.js' );
	}
}
add_action('init', 'stck_scripts_styles');

//
// Typekit
//
function stck_typekit_inline() {
  if ( wp_script_is( 'typekit', 'done' ) ) {
    echo '<script>try{Typekit.load();}catch(e){}</script>';
  }
}
add_action( 'wp_head', 'stck_typekit_inline' );

//
// Favicon
//
function stck_favicon() {
  echo '<link rel="shortcut icon" href="' . get_stylesheet_directory_uri() . '/images/favicon.png" />';
}
add_action( 'wp_head', 'stck_favicon' );

//
//	Menus
//
register_nav_menus( 
  array(
    'global_menu' => 'Global Menu',
  	'footer_menu' => 'Footer Menu'
  ) 
);

function namespaced_admin_styles_function() {
    echo '<link href="' . get_bloginfo("template_url") . '/admin-styles.css"  rel="stylesheet">';
}
add_action('admin_head', 'namespaced_admin_styles_function');
function FontAwesome_icons() {
    echo '<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"  rel="stylesheet">';
}
add_action('admin_head', 'FontAwesome_icons');

//
// Register Stack Custom Post Type
//
function stck_stack_post_type() {

  $labels = array(
    'name'                => _x( 'Stacks', 'Post Type General Name', 'text_domain' ),
    'singular_name'       => _x( 'Stack', 'Post Type Singular Name', 'text_domain' ),
    'menu_name'           => __( 'Stacks', 'text_domain' ),
    'parent_item_colon'   => __( 'Parent Stack:', 'text_domain' ),
    'all_items'           => __( 'All Stacks', 'text_domain' ),
    'view_item'           => __( 'View Stack', 'text_domain' ),
    'add_new_item'        => __( 'Add Stack', 'text_domain' ),
    'add_new'             => __( 'Add New', 'text_domain' ),
    'edit_item'           => __( 'Edit Stack', 'text_domain' ),
    'update_item'         => __( 'Update Stack', 'text_domain' ),
    'search_items'        => __( 'Search Stack', 'text_domain' ),
    'not_found'           => __( 'Not found', 'text_domain' ),
    'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
  );
  $rewrite = array(
    'slug'                => 'font-stacks',
    'with_front'          => true,
    'pages'               => true,
    'feeds'               => true,
  );
  $args = array(
    'label'               => __( 'stack', 'text_domain' ),
    'description'         => __( 'Font Stacks', 'text_domain' ),
    'labels'              => $labels,
    'supports'            => array( 'title', 'editor', 'author', 'comments', 'custom-fields', 'thumbnail' ),
    'taxonomies'          => array( 'post_tag' ),
    'hierarchical'        => false,
    'public'              => true,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'show_in_nav_menus'   => true,
    'show_in_admin_bar'   => true,
    'menu_position'       => 5,
    // 'menu_icon'           => "",
    'can_export'          => true,
    'has_archive'         => true,
    'exclude_from_search' => false,
    'publicly_queryable'  => true,
    'rewrite'             => $rewrite,
    'capability_type'     => 'page',
  );
  register_post_type( 'stack', $args );

}
// Hook into the 'init' action
add_action( 'init', 'stck_stack_post_type', 0 );

//
// Register Custom Taxonomies
//
function stck_characteristic_taxonomy() {
  $labels = array(
    'name'                       => _x( 'Characteristics', 'Taxonomy General Name', 'text_domain' ),
    'singular_name'              => _x( 'Characteristic', 'Taxonomy Singular Name', 'text_domain' ),
    'menu_name'                  => __( 'Characteristics', 'text_domain' ),
    'all_items'                  => __( 'All Characteristics', 'text_domain' ),
    'parent_item'                => __( 'Parent Characteristic', 'text_domain' ),
    'parent_item_colon'          => __( 'Parent Characteristic:', 'text_domain' ),
    'new_item_name'              => __( 'New Characteristic Name', 'text_domain' ),
    'add_new_item'               => __( 'Add New Characteristic', 'text_domain' ),
    'edit_item'                  => __( 'Edit Characteristic', 'text_domain' ),
    'update_item'                => __( 'Update Characteristic', 'text_domain' ),
    'separate_items_with_commas' => __( 'Separate Characteristics with commas', 'text_domain' ),
    'search_items'               => __( 'Search Characteristic', 'text_domain' ),
    'add_or_remove_items'        => __( 'Add or remove Characteristics', 'text_domain' ),
    'choose_from_most_used'      => __( 'Choose from the most used Characteristics', 'text_domain' ),
    'not_found'                  => __( 'Not Found', 'text_domain' ),
  );
  $args = array(
    'labels'                     => $labels,
    'hierarchical'               => true,
    'public'                     => true,
    'show_ui'                    => true,
    'show_admin_column'          => true,
    'show_in_nav_menus'          => false,
    'show_tagcloud'              => false,
  );
  register_taxonomy( 'characteristic', array( 'stack', ' post' ), $args );
}
add_action( 'init', 'stck_characteristic_taxonomy', 0 );

function stck_weight_taxonomy() {
  $labels = array(
    'name'                       => _x( 'Weights', 'Taxonomy General Name', 'text_domain' ),
    'singular_name'              => _x( 'Weight', 'Taxonomy Singular Name', 'text_domain' ),
    'menu_name'                  => __( 'Weights', 'text_domain' ),
    'all_items'                  => __( 'All Weights', 'text_domain' ),
    'parent_item'                => __( 'Parent Weight', 'text_domain' ),
    'parent_item_colon'          => __( 'Parent Weight:', 'text_domain' ),
    'new_item_name'              => __( 'New Weight Name', 'text_domain' ),
    'add_new_item'               => __( 'Add New Weight', 'text_domain' ),
    'edit_item'                  => __( 'Edit Weight', 'text_domain' ),
    'update_item'                => __( 'Update Weight', 'text_domain' ),
    'separate_items_with_commas' => __( 'Separate Weights with commas', 'text_domain' ),
    'search_items'               => __( 'Search Weights', 'text_domain' ),
    'add_or_remove_items'        => __( 'Add or remove Weights', 'text_domain' ),
    'choose_from_most_used'      => __( 'Choose from the most used Weights', 'text_domain' ),
    'not_found'                  => __( 'Not Found', 'text_domain' ),
  );
  $args = array(
    'labels'                     => $labels,
    'hierarchical'               => true,
    'public'                     => true,
    'show_ui'                    => true,
    'show_admin_column'          => true,
    'show_in_nav_menus'          => false,
    'show_tagcloud'              => false,
  );
  register_taxonomy( 'weight', array( 'stack', ' post' ), $args );
}
add_action( 'init', 'stck_weight_taxonomy', 0 );

function stck_width_taxonomy() {
  $labels = array(
    'name'                       => _x( 'Widths', 'Taxonomy General Name', 'text_domain' ),
    'singular_name'              => _x( 'Width', 'Taxonomy Singular Name', 'text_domain' ),
    'menu_name'                  => __( 'Widths', 'text_domain' ),
    'all_items'                  => __( 'All Widths', 'text_domain' ),
    'parent_item'                => __( 'Parent Width', 'text_domain' ),
    'parent_item_colon'          => __( 'Parent Width:', 'text_domain' ),
    'new_item_name'              => __( 'New Width Name', 'text_domain' ),
    'add_new_item'               => __( 'Add New Width', 'text_domain' ),
    'edit_item'                  => __( 'Edit Width', 'text_domain' ),
    'update_item'                => __( 'Update Width', 'text_domain' ),
    'separate_items_with_commas' => __( 'Separate Widths with commas', 'text_domain' ),
    'search_items'               => __( 'Search Widths', 'text_domain' ),
    'add_or_remove_items'        => __( 'Add or remove Widths', 'text_domain' ),
    'choose_from_most_used'      => __( 'Choose from the most used Widths', 'text_domain' ),
    'not_found'                  => __( 'Not Found', 'text_domain' ),
  );
  $args = array(
    'labels'                     => $labels,
    'hierarchical'               => true,
    'public'                     => true,
    'show_ui'                    => true,
    'show_admin_column'          => true,
    'show_in_nav_menus'          => false,
    'show_tagcloud'              => false,
  );
  register_taxonomy( 'width', array( 'stack', ' post' ), $args );
}
add_action( 'init', 'stck_width_taxonomy', 0 );

function stck_color_taxonomy() {
  $labels = array(
    'name'                       => _x( 'Colors', 'Taxonomy General Name', 'text_domain' ),
    'singular_name'              => _x( 'Color', 'Taxonomy Singular Name', 'text_domain' ),
    'menu_name'                  => __( 'Colors', 'text_domain' ),
    'all_items'                  => __( 'All Colors', 'text_domain' ),
    'parent_item'                => __( 'Parent Color', 'text_domain' ),
    'parent_item_colon'          => __( 'Parent Color:', 'text_domain' ),
    'new_item_name'              => __( 'New Color Name', 'text_domain' ),
    'add_new_item'               => __( 'Add New Color', 'text_domain' ),
    'edit_item'                  => __( 'Edit Color', 'text_domain' ),
    'update_item'                => __( 'Update Color', 'text_domain' ),
    'separate_items_with_commas' => __( 'Separate Colors with commas', 'text_domain' ),
    'search_items'               => __( 'Search Colors', 'text_domain' ),
    'add_or_remove_items'        => __( 'Add or remove Colors', 'text_domain' ),
    'choose_from_most_used'      => __( 'Choose from the most used Colors', 'text_domain' ),
    'not_found'                  => __( 'Not Found', 'text_domain' ),
  );
  $args = array(
    'labels'                     => $labels,
    'hierarchical'               => true,
    'public'                     => true,
    'show_ui'                    => true,
    'show_admin_column'          => true,
    'show_in_nav_menus'          => false,
    'show_tagcloud'              => false,
  );
  register_taxonomy( 'color', array( 'stack', ' post' ), $args );
}
add_action( 'init', 'stck_color_taxonomy', 0 );

function stck_style_variant_taxonomy() {
  $labels = array(
    'name'                       => _x( 'Styles &amp; Variants', 'Taxonomy General Name', 'text_domain' ),
    'singular_name'              => _x( 'Style or Variant', 'Taxonomy Singular Name', 'text_domain' ),
    'menu_name'                  => __( 'Styles &amp; Variants', 'text_domain' ),
    'all_items'                  => __( 'All Styles &amp; Variants', 'text_domain' ),
    'parent_item'                => __( 'Parent Style or Variant', 'text_domain' ),
    'parent_item_colon'          => __( 'Parent Style or Variant:', 'text_domain' ),
    'new_item_name'              => __( 'New Style or Variant Name', 'text_domain' ),
    'add_new_item'               => __( 'Add New Style or Variant', 'text_domain' ),
    'edit_item'                  => __( 'Edit Style or Variant', 'text_domain' ),
    'update_item'                => __( 'Update Style or Variant', 'text_domain' ),
    'separate_items_with_commas' => __( 'Separate Style or Variant with commas', 'text_domain' ),
    'search_items'               => __( 'Search Styles &amp; Variants', 'text_domain' ),
    'add_or_remove_items'        => __( 'Add or remove Styles &amp; Variants', 'text_domain' ),
    'choose_from_most_used'      => __( 'Choose from the most used Styles &amp; Variants', 'text_domain' ),
    'not_found'                  => __( 'Not Found', 'text_domain' ),
  );
  $args = array(
    'labels'                     => $labels,
    'hierarchical'               => true,
    'public'                     => true,
    'show_ui'                    => true,
    'show_admin_column'          => true,
    'show_in_nav_menus'          => false,
    'show_tagcloud'              => false,
  );
  register_taxonomy( 'style_variant', array( 'stack', ' post' ), $args );
}
add_action( 'init', 'stck_style_variant_taxonomy', 0 );

//
// Custom WP Login/Registration functions
//
$stck_login_page  = home_url( '/user/login/' );

// Redirect default login page requests
function stck_redirect_login_page() {
  global $stck_login_page;
  $page_viewed = basename($_SERVER['REQUEST_URI']);
  if( $page_viewed == "wp-login.php" && $_SERVER['REQUEST_METHOD'] == 'GET') {
    wp_redirect($stck_login_page);
    exit;
  }
}
add_action('init','stck_redirect_login_page');

// Redirect failed login page requests
function stck_login_failed() {
  global $stck_login_page;
  wp_redirect( $stck_login_page . '?login=failed' );
  exit;
}
add_action( 'wp_login_failed', 'stck_login_failed' );

// Redirect empty login page requests
function stck_verify_username_password( $user, $username, $password ) {
  global $stck_login_page;
  if( $username == "" || $password == "" ) {
    wp_redirect( $stck_login_page . "?login=empty" );
    exit;
  }
}
add_filter( 'authenticate', 'stck_verify_username_password', 1, 3);

// Redirect on logout
function stck_logout_page() {
  global $stck_login_page;
  wp_redirect( "/?logout=true" );
  exit;
}
add_action('wp_logout','stck_logout_page');

/**
 * Reset the user pass after validation
 *
 * @author Aman Saini
 * @since  1.0
 * @return  Success/Error Message
 */
function reset_user_pass(){
 
  parse_str( $_POST['form_values'], $params );
 
  $user = check_password_reset_key($params['key'], $params['login']);
 
  $status='';
 
  // Check if key is valid
  if ( is_wp_error($user) ) {
    if ( $user->get_error_code() === 'expired_key' ){
      $status = 'expiredkey' ;
    }
    else{
      $status = 'invalidkey' ;
    }
 
    echo $status;
    die;
 
  }
 
  // check if keys match
  if ( isset($params['pass1']) && $params['pass1'] != $params['pass2'] ){
    $status = 'mismatch';
  }else{
  // Update the user pass
    reset_password($user, $params['pass1']);
 
    $status ='success';
  }
 
  echo $status;
  die;
 
}
 
 
add_action( 'wp_ajax_nopriv_reset_user_pass', 'reset_user_pass' );

//
// Restrict dashboard to Admin only
//
function restrict_admin()
{
  if ( ! current_user_can( 'manage_options' ) && '/wp-admin/admin-ajax.php' != $_SERVER['PHP_SELF'] ) {
                wp_redirect( site_url() );
  }
}
add_action( 'admin_init', 'restrict_admin', 1 );

//
//  Turn on theme-specific features
//
add_theme_support( 'post-thumbnails' );


//
// Bootstrap pagination
//
function page_navi($before = '', $after = '') {
  global $wpdb, $wp_query;
  $request = $wp_query->request;
  $posts_per_page = intval(get_query_var('posts_per_page'));
  $paged = intval(get_query_var('paged'));
  $numposts = $wp_query->found_posts;
  $max_page = $wp_query->max_num_pages;
  if ( $numposts <= $posts_per_page ) { return; }
  if(empty($paged) || $paged == 0) {
    $paged = 1;
  }
  $pages_to_show = 7;
  $pages_to_show_minus_1 = $pages_to_show-1;
  $half_page_start = floor($pages_to_show_minus_1/2);
  $half_page_end = ceil($pages_to_show_minus_1/2);
  $start_page = $paged - $half_page_start;
  if($start_page <= 0) {
    $start_page = 1;
  }
  $end_page = $paged + $half_page_end;
  if(($end_page - $start_page) != $pages_to_show_minus_1) {
    $end_page = $start_page + $pages_to_show_minus_1;
  }
  if($end_page > $max_page) {
    $start_page = $max_page - $pages_to_show_minus_1;
    $end_page = $max_page;
  }
  if($start_page <= 0) {
    $start_page = 1;
  }
    
  echo $before.'<div class="pagination"><ul class="clearfix">'."";
  if ($paged > 1) {
    $first_page_text = "«";
    echo '<li class="prev"><a href="'.get_pagenum_link().'" title="First">'.$first_page_text.'</a></li>';
  }
    
  $prevposts = get_previous_posts_link('← Previous');
  if($prevposts) { echo '<li>' . $prevposts  . '</li>'; }
  else { echo '<li class="disabled"><a href="#">← Previous</a></li>'; }
  
  for($i = $start_page; $i  <= $end_page; $i++) {
    if($i == $paged) {
      echo '<li class="active"><a href="#">'.$i.'</a></li>';
    } else {
      echo '<li><a href="'.get_pagenum_link($i).'">'.$i.'</a></li>';
    }
  }
  echo '<li class="">';
  next_posts_link('Next →');
  echo '</li>';
  if ($end_page < $max_page) {
    $last_page_text = "»";
    echo '<li class="next"><a href="'.get_pagenum_link($max_page).'" title="Last">'.$last_page_text.'</a></li>';
  }
  echo '</ul></div>'.$after."";
};
?>