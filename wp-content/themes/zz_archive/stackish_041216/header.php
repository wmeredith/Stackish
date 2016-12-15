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
	<script type="text/javascript">
		var templateDir = "<?php bloginfo('template_directory') ?>";
	</script>
    <?php wp_head(); ?>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <script src="https://use.typekit.net/bag4nxa.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
</head>
<body>
    <div class="row">
      <div class="large-12 columns">
        <h1>Stackish</h1>
      </div>
    </div>
