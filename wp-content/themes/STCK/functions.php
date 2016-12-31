<?php
//allow redirection, even if my theme starts to send output to the browser
add_action('init', 'do_output_buffer');
function do_output_buffer() {
  ob_start();
}

//
// Register and then enqueue scripts, stylesheets and other files on non-admin site pages.
//
function stck_scripts_styles() {
	if (!is_admin()) {
        // App scripts (You don't have to register/enqueue jQuery IF LISTED AS A DEPENDANT)
		wp_register_script('stck_js', get_bloginfo('template_url') . '/js/app-min.js', array('jquery'), '', true);
		wp_enqueue_script('stck_js');

        // Bootstrap scripts: http://getbootstrap.com/
        wp_register_script('bootstrap_js', get_bloginfo('template_url') . '/bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js', array('jquery'), '', true);
		wp_enqueue_script('bootstrap_js');

        // List sorting/filtering: http://listjs.com/
        wp_register_script('listjs_js', get_bloginfo('template_url') . '/bower_components/list.js/dist/list.min.js', array('jquery'), '', true);
		wp_enqueue_script('listjs_js');

        // Color Picker styles and scripts: https://lauren.github.io/pick-a-color/
        wp_register_script('colorpicker_js', get_bloginfo('template_url') . '/bower_components/pick-a-color/build/1.2.3/js/pick-a-color-1.2.3.min.js', array('jquery','tinycolor_js'), '', true);
		wp_enqueue_script('colorpicker_js');
        wp_register_script('tinycolor_js', get_bloginfo('template_url') . '/bower_components/pick-a-color/build/dependencies/tinycolor-0.9.15.min.js', array('jquery'), '', true);
		wp_enqueue_script('tinycolor_js');
        wp_register_style( 'colorpicker_style', get_bloginfo('template_url') . '/bower_components/pick-a-color/build/1.2.3/css/pick-a-color-1.2.3.min.css', false, '1.0', 'screen' );
		wp_enqueue_style( 'colorpicker_style' );

        // Number formatting library: https://refreshless.com/wnumb/
        wp_register_script('wnumb_js', get_bloginfo('template_url') . '/bower_components/wnumb/wNumb.js', '', '', true);
        wp_enqueue_script('wnumb_js');

        // Responsive touchable slider UI: https://refreshless.com/nouislider/
        wp_register_script('mouislider_js', get_bloginfo('template_url') . '/bower_components/nouislider/distribute/nouislider.min.js', array('wnumb_js'), '', true);
        wp_enqueue_script('mouislider_js');
        wp_register_style( 'nouislider_style', get_bloginfo('template_url') . '/bower_components/nouislider/distribute/nouislider.min.css', false, '1.0', 'screen' );
        wp_enqueue_style( 'nouislider_style' );

        // Icon Font styles: http://fontello.com/
        wp_register_style( 'fontello_style', get_bloginfo('template_url') . '/fonts/fontello/css/fontello.css', false, '1.0', 'screen' );
        wp_enqueue_style( 'fontello_style' );

        // App styles
		wp_register_style( 'stck_style', get_bloginfo('template_url') . '/css/app.css', false, '1.0', 'screen' );
		wp_enqueue_style( 'stck_style' );
	}
}
add_action('init', 'stck_scripts_styles');

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

//
//
//
function stck_author_base() {
    global $wp_rewrite;
    $author_slug = 'user'; // change slug name
    $wp_rewrite->author_base = $author_slug;
}
add_action('init', 'stck_author_base');

/* //
// Wordpress Admin Styles
//
function namespaced_admin_styles_function() {
    echo '<link href="' . get_bloginfo("template_url") . '/css/admin-styles.css"  rel="stylesheet">';
}
add_action('admin_head', 'namespaced_admin_styles_function');

function FontAwesome_icons() {
    echo '<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"  rel="stylesheet">';
}
add_action('admin_head', 'FontAwesome_icons'); */

//
// TinyMCE Customizations
//
            /* function my_mce_before_init_insert_formats( $init_array ) {
              // Define the style_formats array
              $style_formats = array(
                array(
                  'title' => "Italic",
                  'icon' => "italic",
                  'format' => "italic"
                ),
                array(
                  'title' => "Underline",
                  'icon' => "underline",
                  'format' => "underline"
                ),
                array(
                  'title' => "Strikethrough",
                  'icon' => "strikethrough",
                  'format' => "strikethrough"
                ),
                array(
                  'title' => "Superscript",
                  'icon' => "superscript",
                  'format' => "superscript"
                ),
                array(
                  'title' => "Subscript",
                  'icon' => "subscript",
                  'format' => "subscript"
                ),
              );
              // Insert the array, JSON ENCODED, into 'style_formats'
              $init_array['style_formats'] = json_encode( $style_formats );
              return $init_array;
            }
            // Attach callback to 'tiny_mce_before_init'
            add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );

            //
            // Weight button
            //
            add_action('wp_head', 'stck_add_weight_button');
            function stck_add_weight_button() {
                add_filter("mce_external_plugins", "stck_weight_button_plugin");
                add_filter('mce_buttons', 'stck_register_weight_button');
            }

            function stck_weight_button_plugin($plugin_array) {
                $plugin_array['stck_weight_button'] = get_bloginfo( 'stylesheet_directory' ) . '/stck_tinymce.js';
                return $plugin_array;
            }

            function stck_register_weight_button($buttons) {
               array_push($buttons, "stck_register_weight_button");
               return $buttons;
            }

            //
            // Size button
            //
            add_action('wp_head', 'stck_add_size_button');
            function stck_add_size_button() {
                add_filter("mce_external_plugins", "stck_size_button_plugin");
                add_filter('mce_buttons', 'stck_register_size_button');
            }

            function stck_size_button_plugin($plugin_array) {
                $plugin_array['stck_size_button'] = get_bloginfo( 'stylesheet_directory' ) . '/stck_tinymce.js';
                return $plugin_array;
            }

            function stck_register_size_button($buttons) {
               array_push($buttons, "stck_register_size_button");
               return $buttons;
            }

            //
            // Variant button
            //
            add_action('wp_head', 'stck_add_variant_button');
            function stck_add_variant_button() {
                add_filter("mce_external_plugins", "stck_variant_button_plugin");
                add_filter('mce_buttons', 'stck_register_variant_button');
            }

            function stck_variant_button_plugin($plugin_array) {
                $plugin_array['stck_variant_button'] = get_bloginfo( 'stylesheet_directory' ) . '/stck_tinymce.js';
                return $plugin_array;
            }

            function stck_register_variant_button($buttons) {
               array_push($buttons, "stck_register_variant_button");
               return $buttons;
            }

            //
            // Kern button
            //
            add_action('wp_head', 'stck_add_kern_button');
            function stck_add_kern_button() {
                add_filter("mce_external_plugins", "stck_kern_button_plugin");
                add_filter('mce_buttons', 'stck_register_kern_button');
            }

            function stck_kern_button_plugin($plugin_array) {
                $plugin_array['stck_kern_button'] = get_bloginfo( 'stylesheet_directory' ) . '/stck_tinymce.js';
                return $plugin_array;
            }

            function stck_register_kern_button($buttons) {
               array_push($buttons, "stck_register_kearn_button");
               return $buttons;
            }

            //
            // Leading button
            //
            add_action('wp_head', 'stck_add_leading_button');
            function stck_add_leading_button() {
                add_filter("mce_external_plugins", "stck_leading_button_plugin");
                add_filter('mce_buttons', 'stck_register_leading_button');
            }

            function stck_leading_button_plugin($plugin_array) {
                $plugin_array['stck_leading_button'] = get_bloginfo( 'stylesheet_directory' ) . '/stck_tinymce.js';
                return $plugin_array;
            }

            function stck_register_leading_button($buttons) {
               array_push($buttons, "stck_register_leading_button");
               return $buttons;
            }

            //
            // Measure button
            //
            add_action('wp_head', 'stck_add_measure_button');
            function stck_add_measure_button() {
                add_filter("mce_external_plugins", "stck_measure_button_plugin");
                add_filter('mce_buttons', 'stck_measure_button');
            }

            function stck_measure_button_plugin($plugin_array) {
                $plugin_array['stck_measure_button'] = get_bloginfo( 'stylesheet_directory' ) . '/stck_tinymce.js';
                return $plugin_array;
            }

            function stck_measure_button($buttons) {
               array_push($buttons, "stck_register_measure_button");
               return $buttons;
            } */

//
// Body Color Button
//
// add_action('wp_head', 'stck_mycolorsplitbutton');
// function stck_mycolorsplitbutton() {
//     add_filter("mce_external_plugins", "stck_mycolorsplitbutton_plugin");
//     add_filter('mce_buttons', 'stck_register_mycolorsplitbutton');
// }

// function stck_stck_mycolorsplitbutton_plugin($plugin_array) {
//     $plugin_array['mycolorsplitbutton'] = get_bloginfo( 'stylesheet_directory' ) . '/stck_tinymce.js';
//     return $plugin_array;
// }

// function stck_register_mycolorsplitbutton($buttons) {
//    array_push($buttons, "stck_register_mycolorsplitbutton");
//    return $buttons;
// }


//
// Register Typeface Custom Post Type
//
function stck_typeface_post_type() {

  $labels = array(
    'name'                => _x( 'Typefaces', 'Post Type General Name', 'text_domain' ),
    'singular_name'       => _x( 'Typeface', 'Post Type Singular Name', 'text_domain' ),
    'menu_name'           => __( 'Typefaces', 'text_domain' ),
    'parent_item_colon'   => __( 'Parent Typeface:', 'text_domain' ),
    'all_items'           => __( 'All Typefaces', 'text_domain' ),
    'view_item'           => __( 'View Typeface', 'text_domain' ),
    'add_new_item'        => __( 'Add Typeface', 'text_domain' ),
    'add_new'             => __( 'Add New', 'text_domain' ),
    'edit_item'           => __( 'Edit Typeface', 'text_domain' ),
    'update_item'         => __( 'Update Typeface', 'text_domain' ),
    'search_items'        => __( 'Search Typeface', 'text_domain' ),
    'not_found'           => __( 'Not found', 'text_domain' ),
    'not_found_in_trash'  => __( 'Not found in Trash', 'text_domain' ),
  );
  $rewrite = array(
    'slug'                => 'typefaces',
    'with_front'          => true,
    'pages'               => true,
    'feeds'               => true,
  );
  $args = array(
    'label'               => __( 'typeface', 'text_domain' ),
    'description'         => __( 'Typefaces', 'text_domain' ),
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
  register_post_type( 'typeface', $args );
}
// Hook into the 'init' action
add_action( 'init', 'stck_typeface_post_type', 0 );

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
    'slug'                => 'stacks',
    'with_front'          => true,
    'pages'               => true,
    'feeds'               => true,
  );
  $args = array(
    'label'               => __( 'stack', 'text_domain' ),
    'description'         => __( 'Stacks', 'text_domain' ),
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
function stck_letterform_taxonomy() {
  $labels = array(
    'name'                       => _x( 'Letterforms', 'Taxonomy General Name', 'text_domain' ),
    'singular_name'              => _x( 'Letterform', 'Taxonomy Singular Name', 'text_domain' ),
    'menu_name'                  => __( 'Letterforms', 'text_domain' ),
    'all_items'                  => __( 'All Letterforms', 'text_domain' ),
    'parent_item'                => __( 'Parent Letterform', 'text_domain' ),
    'parent_item_colon'          => __( 'Parent Letterform:', 'text_domain' ),
    'new_item_name'              => __( 'New Letterform Name', 'text_domain' ),
    'add_new_item'               => __( 'Add New Letterform', 'text_domain' ),
    'edit_item'                  => __( 'Edit Letterform', 'text_domain' ),
    'update_item'                => __( 'Update Letterform', 'text_domain' ),
    'separate_items_with_commas' => __( 'Separate Letterforms with commas', 'text_domain' ),
    'search_items'               => __( 'Search Letterform', 'text_domain' ),
    'add_or_remove_items'        => __( 'Add or remove Letterforms', 'text_domain' ),
    'choose_from_most_used'      => __( 'Choose from the most used Letterforms', 'text_domain' ),
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
  register_taxonomy( 'letterform', array( 'typeface', ' post' ), $args );
}
add_action( 'init', 'stck_letterform_taxonomy', 0 );

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

function stck_foundry_taxonomy() {
  $labels = array(
    'name'                       => _x( 'Foundries', 'Taxonomy General Name', 'text_domain' ),
    'singular_name'              => _x( 'Foundry', 'Taxonomy Singular Name', 'text_domain' ),
    'menu_name'                  => __( 'Foundries', 'text_domain' ),
    'all_items'                  => __( 'All Foundries', 'text_domain' ),
    'parent_item'                => __( 'Parent Foundry', 'text_domain' ),
    'parent_item_colon'          => __( 'Parent Foundry:', 'text_domain' ),
    'new_item_name'              => __( 'New Foundry Name', 'text_domain' ),
    'add_new_item'               => __( 'Add Foundry', 'text_domain' ),
    'edit_item'                  => __( 'Edit Foundry', 'text_domain' ),
    'update_item'                => __( 'Update Foundry', 'text_domain' ),
    'separate_items_with_commas' => __( 'Separate Foundries with commas', 'text_domain' ),
    'search_items'               => __( 'Search Foundries', 'text_domain' ),
    'add_or_remove_items'        => __( 'Add or remove Foundries', 'text_domain' ),
    'choose_from_most_used'      => __( 'Choose from the most used Foundries', 'text_domain' ),
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
  register_taxonomy( 'foundry', array( 'typeface', ' post' ), $args );
}
add_action( 'init', 'stck_foundry_taxonomy', 0 );

function stck_affiliate_taxonomy() {
  $labels = array(
    'name'                       => _x( 'Affiliates', 'Taxonomy General Name', 'text_domain' ),
    'singular_name'              => _x( 'Affiliate', 'Taxonomy Singular Name', 'text_domain' ),
    'menu_name'                  => __( 'Affiliates', 'text_domain' ),
    'all_items'                  => __( 'All Affiliates', 'text_domain' ),
    'parent_item'                => __( 'Parent Affiliate', 'text_domain' ),
    'parent_item_colon'          => __( 'Parent Affiliate:', 'text_domain' ),
    'new_item_name'              => __( 'New Affiliate Name', 'text_domain' ),
    'add_new_item'               => __( 'Add Affiliate', 'text_domain' ),
    'edit_item'                  => __( 'Edit Affiliate', 'text_domain' ),
    'update_item'                => __( 'Update Affiliate', 'text_domain' ),
    'separate_items_with_commas' => __( 'Separate Affiliates with commas', 'text_domain' ),
    'search_items'               => __( 'Search Affiliates', 'text_domain' ),
    'add_or_remove_items'        => __( 'Add or remove Affiliates', 'text_domain' ),
    'choose_from_most_used'      => __( 'Choose from the most used Affiliates', 'text_domain' ),
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
  register_taxonomy( 'affiliate', array( 'typeface', ' post' ), $args );
}
add_action( 'init', 'stck_affiliate_taxonomy', 0 );

//
// Custom WP Login/Registration functions
//
$stck_login_page  = home_url( '/users/login/' );

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


// Save a new stack submitted from the stack builder
function stck_build_stack() {

  if ( empty($_POST) || !wp_verify_nonce($_POST['stack_builder_nonce'],'create_stack') ) {
    print 'Input from your time &amp; space denied.'; exit;
  } else {

    // Do some minor form validation to make sure there is content
    if (isset ($_POST['stackName'])) {
      $title =  $_POST['stackName'];
    } else {
      echo 'Please enter a Stack name'; exit;
    } if (isset ($_POST['stackDescription'])) {
      $description = $_POST['stackDescription'];
    } if (isset($_POST['stackTags'])){
      $tags = $_POST['stackTags'];
    } else {
      $tags = "";
    }

    // Create new post
    $post = array(
      'post_title'    => wp_strip_all_tags( $title ),
      'post_content'  => $description,
      'tags_input'    => $tags,
      'post_status'   => 'publish', // Choose: publish, preview, future, etc.
      'post_type'     => 'Stack'    // Use a custom post type if you want to
    );
    wp_insert_post($post);

    // Grab the newly created post ID for later use
    $post_id = wp_insert_post($post);

    // Save temporary stack preview image
    $filteredImageData = substr($_POST['img_val'], strpos($_POST['img_val'], ",")+1); // Get the base-64 string from data
    $decodedImageData=base64_decode($filteredImageData); // Decode the string
    $tempFileName = md5(uniqid()) . '.png';
    $tempFileLoc = ABSPATH.'/wp-content/temp-stack-previews/'.$tempFileName;
    file_put_contents( $tempFileLoc, $decodedImageData);

    // Add stack preview as Featured Image to Post
    $image_url  = $tempFileLoc; // Define the image URL here
    $upload_dir = wp_upload_dir(); // Set upload folder
    $image_data = file_get_contents($image_url); // Get image data
    $filename   = basename($image_url); // Create image file name

    // Check folder permission and define file location
    if( wp_mkdir_p( $upload_dir['path'] ) ) {
        $file = $upload_dir['path'] . '/' . $filename;
    } else {
        $file = $upload_dir['basedir'] . '/' . $filename;
    }

    // Create the image  file on the server
    file_put_contents( $file, $image_data );

    // Check image file type
    $wp_filetype = wp_check_filetype( $filename, null );

    // Set attachment data
    $attachment = array(
      'post_mime_type' => $wp_filetype['type'],
      'post_title'     => sanitize_file_name( $filename ),
      'post_content'   => '',
      'post_status'    => 'inherit'
    );

    // Create the attachment
    $attach_id = wp_insert_attachment( $attachment, $file, $post_id );

    // These files need to be included as dependencies when on the front end.
    require_once( ABSPATH . 'wp-admin/includes/image.php' );
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
    require_once( ABSPATH . 'wp-admin/includes/media.php' );

    // Define attachment metadata
    $attach_data = wp_generate_attachment_metadata( $attach_id, $file );

    // Assign metadata to attachment
    wp_update_attachment_metadata( $attach_id, $attach_data );

    // And finally assign featured image to post
    set_post_thumbnail( $post_id, $attach_id );

    // Delete stack preview temp file
    unlink( $tempFileLoc );

    // Redirect to new post
    wp_redirect(get_permalink($post_id));
    die;
  }
};

/**
 * Modify TinyMCE
 *
 * @param array $in
 * @return array $in
 */
/* function my_tiny_mce_before_init( $in ) {

    // customize the buttons
    $in['theme_advanced_buttons1'] = 'bold,italic,underline,bullist,numlist,hr,blockquote,link,unlink,justifyleft,justifycenter,justifyright,justifyfull,outdent,indent';
    $in['theme_advanced_buttons2'] = 'formatselect,pastetext,pasteword,charmap,undo,redo';

    // Debug:
    // print_r( $in );
    // exit();

    // Keep the "kitchen sink" open:
    $in[ 'wordpress_adv_hidden' ] = FALSE;

    return $in;
}
add_filter( 'tiny_mce_before_init', 'my_tiny_mce_before_init' ); */
?>
