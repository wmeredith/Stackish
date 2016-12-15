<?php
/*
Template Name: Stack Builder v1
*/
get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div class="sitewrap">
        <div class="container-fluid">
            <form id="stackBuilderForm" method="post" action="">
                <div class="contentwrap stack-builder">
                    <div class="row">
                        <div class="col-md-9 col-lg-8">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="stck-big-wrapper">
                                        <div class="stck-big-aspect-ratio">
                                            <?php $thumb_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
                                            <div class="stck-big-stck">
                                                <img class="img-responsive stack-emphasis" src="<?php echo $thumb_url; ?>" alt="<?php echo get_the_title(); ?>" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-8 col-md-10">
                                    <h1 class="page-title"><?php echo get_the_title(); ?></h1>
                                    <p class="stck-big-meta">
                                        <?php the_date('l, F jS, Y'); ?> by <?php the_author_link(); ?>
                                    </p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-lg-4">
                            <?php get_template_part('partials/stack-side-statbar'); ?>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal fade" id="stckPreview" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">Preview: [Stack Title]</h4>
                    </div>
                    <div class="modal-body">
                        <img class="img-responsive" src="//placehold.it/1600x1200" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
<?php endwhile; ?>
<?php endif; ?>
<?php get_footer(); ?>
