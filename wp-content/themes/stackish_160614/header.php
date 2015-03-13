<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<title>
		<?php
			bloginfo('name'); 
			if(is_front_page() && get_bloginfo('description')) { 
				echo ' | '; bloginfo('description');
			} else {
				echo ' | '; the_title();
			};
		?>
	</title>
	<?php 
		if(is_front_page()) $meta_description = get_bloginfo('description');
		elseif(have_posts()) {
			the_post();
			$meta_description = strip_tags(get_the_excerpt());
			rewind_posts();
		};
	?>
	<meta name="description" content="<?php echo $meta_description; ?>" />
	<meta name="author" content="Wade Meredith" />
	<script type="text/javascript" charset="utf-8">
    var editor;
    document.addEventListener( 'click', function ( e ) {
      var id = e.target.id,
          value;
      if ( id && editor && editor[ id ] ) {
        if ( e.target.className === 'prompt' ) {
          value = prompt( 'Value:' );
        }
        editor[ id ]( value );
      }
    }, false );
    </script>
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div class="wrapper">
	<!--Header & Footer image source credit: Richard Eriksson @ https://www.flickr.com/photos/sillygwailo/435333026/-->
	<nav class="navbar navbar-inverse navbar-top" role="navigation">
	  <div class="container">
	    <div class="navbar-header">
	      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	      </button>
	      <a class="navbar-brand page-logo" href="/">
	      	<img src="<?php echo get_template_directory_uri(); ?>/images/build/stackish-logo-dark.png" alt="Stackish Logo" />
	      </a>
	    </div>
	    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">     
	      <ul class="nav navbar-nav navbar-right">
	        <?php wp_nav_menu( 
	        	array(
	          	'theme_location'  => 'global_menu',
	          	'container'       => false,
	          	'menu_class'      => 'menu',
	          	'items_wrap' 			=> '%3$s',
	          	'depth'           => 0
	        	)
		      ); ?>
	        <?php 
					$user_id = get_current_user_id();
					$user_info = get_userdata($user_id);
					$username = $user_info->user_login;
			  	if ($user_id != 0) { ?>
		        <li class="dropdown">
		          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span class="icon-user"> <span class="caret"></span></span><span class="sr-only">View Profile</span></a>
		          <ul class="dropdown-menu" role="menu">
		            <li><a href="#">View Profile</a></li>
		            <li><a href="<?php echo wp_logout_url(); ?>" title="Logout">Logout</a></li>
		          </ul>
		        </li>
	        <?php } else { ?>
						<li class="onboarding-action"><a href="/user/create-new/" title="Create an account">Create Account</a>/<a href="/user/login/" title="Login">Login</a><li>
					<?php } ?>
          <form class="navbar-form navbar-right" role="search">
		        <div class="form-group">
		          <label class="sr-only" for="wp-search">Search</label>
		          <input id="wp-search" type="text" class="form-control" placeholder="&#xF002; Search..." style="font-family:Museo Sans, FontAwesome">
		          <!-- <span class="input-group-btn"> -->
			        	<button type="submit" class="sr-only">Search</button>
		        	<!-- </span> -->
		        </div>
		      </form>
	      </ul>
	    </div><!-- /.navbar-collapse -->
	  </div><!-- /.container -->
	</nav>
