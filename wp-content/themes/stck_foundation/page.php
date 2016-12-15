<?php get_header(); ?>

  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <main class="Main pageMain row expanded">
        <?php the_content(); ?>

    </main>

  <?php endwhile; ?>

  <?php endif; ?>

<?php get_footer(); ?>
