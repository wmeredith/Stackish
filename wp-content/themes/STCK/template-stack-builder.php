<?php
/*
Template Name: Stack Builder v1
*/
get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div id="stckFontListMask" class="hide font-list-mask"></div>
    <div id="stckFontPicker" class="hide font-picker">
        <ul id="stckFontList" class="font-list list">

        </ul>
    </div>
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
                                            <div class="form-control stck-big-stck stck-editor stack-emphasis" id="stckEditor">
                                                <!-- <?php require_once( dirname(__FILE__) .'/raw-stack.html'); ?> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-8 col-md-10">
                                    <div class="form-group">
                                        <label for="stckName">Stack Name*</label>
                                        <input type="text" id="stckName" name="stckName" placeholder="" class="form-control"/>
                                    </div>

                                    <div class="form-group">
                                        <label for="stckTags" >Tags (Comma separated. Max of 11.)</label>
                                        <input type="text" id="stckTags" name="stckTags" autocomplete="off" placeholder="" class="form-control"/>
                                    </div>

                                    <div class="form-group">
                                        <label for="stckDescription" >Description</label>
                                        <textarea id="stckDescription" name="stckDescription" placeholder="Brevity is a virtue ;)" class="form-control" rows="4"></textarea>
                                    </div>

                                    <div class="form-group">
                                        <label for="stckPrivate"><input type="checkbox" id="stckPrivate" name="stckPrivate" value="make_private"> Make Private (Private Stacks are only visible to you. You can change this later.)**</label>
                                    </div>

                                    <div class="form-group">
                                        <label for="stckComments"><input type="checkbox" id="stckComments" name="stckComments" value="allow_comments"> Allow Comments</label>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" id="stckCreate" class="btn btn-primary">
                                            Create Stack
                                        </button>
                                        <div class="btn-toolbar pull-right">
                                            <button type="button" id="stckDraft" class="btn btn-default" onclick="submit">
                                                Save Draft
                                            </button>
                                            <button type="button" id="stckPreview" data-toggle="modal" data-target="#stckPreview" class="btn btn-default">
                                                Preview
                                            </button>
                                        </div>
                                    </div>
                                    <input type="hidden" name="post-type" id="post-type" value="custom_posts" />
                                    <input type="hidden" name="img_val" id="img_val" value="" />
                                    <input type="hidden" name="action" value="custom_posts" />
                                    <input type="hidden" name="empty-description" id="empty-description" value="1"/>
                                    <?php wp_nonce_field( 'create_stack', 'stack_builder_nonce' ); ?>
                                    <br/>
                                    <br/>
                                    <p class="mouseprint">*Required field.</p>
                                    <p class="mouseprint">**Pro account required.</p>
                                    <?php if($_POST){ stck_build_stack(); } ?>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 col-lg-4">
                            <?php get_template_part('partials/sidebar-stack-builder'); ?>
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
    <?php endwhile; ?>

<?php endif; ?>

<!-- Initialize Quill editor -->
<link href="https://cdn.quilljs.com/1.1.6/quill.snow.css" rel="stylesheet">
<script src="https://cdn.quilljs.com/1.1.6/quill.js"></script>
<script>
    var quill = new Quill('#stckEditor', {
        modules: {
            toolbar: '#stckToolbar'
        },
    });
</script>

<?php get_footer(); ?>
