<?php
/*
Template Name: Stacker View v1
*/
get_header(); ?>
    <div class="sitewrap">
        <div class="container-fluid">
            <div class="contentwrap">
                <div class="row">
                    <div class="col-sm-12 col-md-4 col-lg-3">
                        <?php get_template_part('partials/sidebar-author'); ?>
                    </div>
                    <div class="col-sm-12 col-md-8 col-lg-8 col-lg-offset-1">
                        <div class="row stack-grid">
                            <?php
                                $x = 1;
                                while($x <= 11) {
                            ?>
                                <div class="col-xs-12 col-sm-6">
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
