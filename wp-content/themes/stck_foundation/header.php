<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
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
	<script type="text/javascript">
		var templateDir = "<?php bloginfo('template_directory') ?>";
	</script>
    <?php wp_head(); ?>
</head>
<body>
	<header class="Header pageHeader">
		<div class="headerRow row expanded">
			<section class="pageBrand">
				<h1 class="pageTitle"><a href="/" title="Home"><img class="pageBug" src="<?php bloginfo('template_directory') ?>/images/stackish_bug.png" alt="Stackish Logo" /> Stackish</a></h1>
			</section>
			<nav class="pageNav">
				<ul class="menu ">
					<?php wp_nav_menu(
						array(
						'theme_location'  => 'global_menu',
						'container'       => false,
						'menu_class'      => 'menu',
						'items_wrap' 	  => '%3$s',
						'depth'           => 0
						)
					); ?>
					<?php if ( is_user_logged_in() ) { ?>
						<li class="menu-item">
							<a href="#" title="Go to profile.">
								U: <?php global $user_identity; get_currentuserinfo(); echo $user_identity; ?>
							</a>
						</li>
					<?php } else { ?>
						<li class="menu-item"><a href="/user/create-new/" title="Create an account">Sign Up</a></li>
						<li class="menu-item"><a href="/user/login/" title="Login">Login</a><li>
					<?php } ?>
				</ul>
			</nav>
		</div>
	</header>
