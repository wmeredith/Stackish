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
	<link rel="apple-touch-icon" href="<?php bloginfo('template_directory') ?>/images/stck-touch-icon.png">
	<link rel="icon" href="<?php bloginfo('template_directory') ?>/images/stck-touch-icon.png">
	<script type="text/javascript">
		var templateDir = "<?php bloginfo('template_directory') ?>";
	</script>
    <?php wp_head(); ?>
</head>
<body>
<div class="sitewrap">
	<header class="site-header">
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<a href="javascript:void(0);" class="navbar-toggle collapsed heading" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span aria-hidden="true" class="icon-menu"></span> Menu
					</a>
					<a class="navbar-brand" href="/"><h1><img src="<?php bloginfo('template_directory') ?>/images/stackish_bug.png" alt="Stackish Logo" />Stackish</h1></a>
				</div>
				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav navbar-right">
						<li><a href="/create-stack/" title="Make a new font stack."><span aria-hidden="true" class="icon-plus"></span>Create</a></li>
						<li><a href="/stacks/" title="Dig through the font stack archive."><span aria-hidden="true" class="icon-database"></span>Font Stacks</a></li>
						<!-- <li><a href="#" title=""><span aria-hidden="true" class="icon-font"></span> Fonts</a></li> -->
						<?php if ( is_user_logged_in() ) { ?>
							<li>
								<a
								href="<?php global $current_user; get_currentuserinfo(); echo get_author_posts_url($current_user->ID); ?>"
								title="You are logged in as: <?php global $user_identity; get_currentuserinfo(); echo $user_identity; ?>">
									<span aria-hidden="true" class="icon-user"></span><?php global $user_identity; get_currentuserinfo(); echo $user_identity; ?>
								</a>
							</li>
						<?php } else { ?>
							<li><a href="/users/new/" title="Create an account"><span aria-hidden="true" class="icon-user-add"></span>Sign Up</a></li>
							<li><a href="/users/login/" title="Login"><span aria-hidden="true" class="icon-user"></span>Log In</a><li>
						<?php } ?>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>
	</header>
</div>
