<?php
/*
Template Name: Home Page
*/
get_header(); ?>

	<div class="container">
    <div class="row">
      <div class="stack-thumb-gallery">
        <?php $loop = new WP_Query( array( 'post_type' => 'stack', 'posts_per_page' => 12 ) ); ?>
        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 stack-thumb-wrap">
          <div class="stack-thumbnail-effects">
            <a class="stack-thumb" href="<?php echo get_the_permalink(); ?>" title="<?php echo get_the_title(); ?>">
              <?php $thumb_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
              <img class="img-responsive" src="<?php echo $thumb_url; ?>" alt="<?php echo get_the_title(); ?>">
            </a>
          </div>
          <div class="row stack-thumb-meta">
            <div class="col-md-12 stack-thumb-meta-left">
              <ul>
                <li class="stack-thumb-primary"><?php echo get_the_title(); ?></li>
                <li class="stack-thumb-secondary"><?php echo get_the_author(); ?></li>
                <li><span class="icon-star"></span>&nbsp;25</li>
                <?php $comNum = get_comments_number();
                if ($$comNum != 0) { ?>
                  <li><span class="icon-comment"></span>&nbsp;<?php echo $comNum ?></li>
                <?php }; ?>
              </ul>
            </div>
            <!-- <div class="col-md-6 stack-thumb-meta-right ">
              <ul class="list-inline">

              </ul>
            </div> -->
          </div>
        </div>

        <?php endwhile; wp_reset_query(); ?>

      </div>
    </div>
  </div>

<?php get_footer(); ?>
