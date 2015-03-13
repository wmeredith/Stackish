<?php get_header(); ?>
  
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <main class="page-main">
<!--       <h1 class="page-heading"><?php the_title(); ?></h1>
 -->      <?php the_content(); ?>
    </main>

  <?php endwhile; ?>

  <?php endif; ?>

<?php get_footer(); ?>