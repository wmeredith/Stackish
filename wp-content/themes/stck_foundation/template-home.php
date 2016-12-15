<?php
/*
Template Name: Home Page
*/
get_header(); ?>

        <div class="row expanded">
            <main class="Main small-12 medium-10 xxlarge-11 columns">
                <?php if ( !is_user_logged_in() ) { ?>
                    <div class="callout" data-closable>
                        <p>Stackish is here to help you create, discover, and use type online and off. You should <a href="/stack-builder/" title="Get going.">build your own right now</a>.</p>
                        <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                <?php } ?>
                <div class="row expanded">
                    <?php
                        $x = 1;
                        while($x <= 12) { ?>
                            <div class="stack small-12 medium-6 large-4 columns">
                                <img class="stackImage" src="//placehold.it/800x600" />
                                <div class="stackMeta">
                                    <h4 class="truncate stackTitle">Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed nec purus in ante pretium blandit. Aliquam erat volutpat. Nulla libero lectus.</h3>
                                    <ul class="menu simple stackStats menu-align-right">
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
                            <?php $x++;
                        }
                    ?>
                </div>
            </main>
            <div class="Sidebar small-12 medium-2 xxlarge-1 columns">
                <div class="sidebarControls">
                    <ul class="">
                        <li>
                            Scope
                        </li>
                        <li>
                            <a href="#" title="">Following</a>
                        </li>
                        <li class="active">
                            <a href="#" title="">Popular</a>
                        </li>
                        <li>
                            <a href="#" title="">All</a>
                        </li>
                    </ul>
                    <ul class="">
                        <li>
                            Letterforms
                        </li>
                        <li class="active">
                            <a href="#" title="">Monospace</a>
                        </li>
                        <li class="active">
                            <a href="#" title="">Sans-Serif</a>
                        </li>
                        <li class="active">
                            <a href="#" title="">Serif</a>
                        </li>
                    </ul>
                    <ul class="">
                        <li>
                            Period
                        </li>
                        <li>
                            <a href="#" title="">Today</a>
                        </li>
                        <li class="active">
                            <a href="#" title="">Week</a>
                        </li>
                        <li>
                            <a href="#" title="">Month</a>
                        </li>
                    </ul>
                    <ul class="">
                        <li>
                            Columns
                        </li>
                        <li class="active">
                            <a href="#" title="">
                                Three
                            </a>
                        </li>
                        <li>
                            <a href="#" title="">
                                Two
                            </a>
                        </li>
                        <li>
                            <a href="#" title="">
                                One
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>






<?php get_footer(); ?>
