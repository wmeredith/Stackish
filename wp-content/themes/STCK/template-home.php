<?php
/*
Template Name: Home Page
*/
get_header(); ?>

<?php get_template_part('partials/grid-control'); ?>
<div class="sitewrap">
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12">
                <div class="row">
                    <div class="contentwrap stack-grid">
                        <?php $loop = new WP_Query( array( 'post_type' => 'stack', 'posts_per_page' => 12 ) ); ?>
                        <?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
                            <div class="col-xs-12 col-sm-4">
                                <div class="stack">
                                    <a href="<?php echo get_the_permalink(); ?>" title="<?php echo get_the_title(); ?>">
                                        <?php $thumb_url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) ); ?>
                                        <img class="stack-thumbnail stack-emphasis img-responsive" src="<?php echo $thumb_url; ?>" alt="<?php echo get_the_title(); ?>" />
                                        <h4 class="truncate stack-grid-title"><?php echo get_the_title(); ?></h4>
                                    </a>
                                    <div class="stack-grid-meta">
                                        <ul class="stack-grid-stats">
                                            <li>
                                                <a href="[permalink]"  title="How many ties this stack has been viewed.">
                                                    <span>100</span>
                                                    <span aria-hidden="true" class="icon-eye"></span>
                                                    <span class="sr-only">Views</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="[comments anchor link]" title="Number of comments about this stack.">
                                                    <span>1</span>
                                                    <span aria-hidden="true" class="icon-comment"></span>
                                                    <span class="sr-only">Comments</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" title="Give the creator a gold star.">
                                                    <span>10</span>
                                                    <span aria-hidden="true" class="icon-star-empty"></span><!--class="icon-star gold-star" when liked-->
                                                    <span class="sr-only">Gold Stars</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        <?php endwhile; wp_reset_query(); ?>
                        <!--  Remove for Production  -->
                        <?php
                            $x = 1;
                            while($x <= 11) { ?>
                                <div class="col-xs-12 col-sm-4">
                                    <div class="stack">
                                        <a href="stack-grid-preview">
                                            <img class="img-responsive stack-emphasis " src="//placehold.it/1200x800" />
                                            <h4 class="truncate stack-grid-title"><a href="" title="">Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed nec purus in ante pretium blandit. Aliquam erat volutpat. Nulla libero lectus.</a></h4>
                                        </a>
                                        <div class="stack-grid-meta">
                                            <ul class="stack-grid-stats">
                                                <li>
                                                    <a href="[permalink]">
                                                        <span>100</span>
                                                        <span aria-hidden="true" class="icon-eye"></span>
                                                        <span class="sr-only">Views</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="[comments anchor link]">
                                                        <span>1</span>
                                                        <span aria-hidden="true" class="icon-comment"></span>
                                                        <span class="sr-only">Comments</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" title="Give a gold star.">
                                                        <span>10</span>
                                                        <span aria-hidden="true" class="icon-star gold-star"></span>
                                                        <span class="sr-only">Gold Stars</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <?php $x++;
                            }
                        ?>
                        <!-- END Remove for Production  -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php get_footer(); ?>
