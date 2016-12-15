<?php
/*
Template Name: Stack Builder v1
*/
get_header(); ?>
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2>Font Stack Builder</h2>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <?php
                function cvf_content_editor( $textarea_id, $default_content ) {

                    $content = 'The content to be loaded';
                    $editor_id = 'stack_editor';
                    $settings =   array(
                        'textarea_name' => $editor_id,
                        'tinymce' => array(
                            'height' => 500,
                            'width' => 900,
                            'menubar' => false,
                            'statusbar' => false,
                            'theme_advanced_toolbar_location' => 'top',
                            'theme_advanced_toolbar_align' => 'left',
                            'plugins' => 'textcolor colorpicker bodycolor',
                            'toolbar' => 'fontselect | fontsizeselect | styleselect | forecolor bodycolor | bold italic underline | alignleft aligncenter alignright justify',
                            'fontsize_formats'=> '1pt 2pt 3pt 4pt 5pt 6pt 7pt 8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt 29pt 30pt 31pt 32pt 33pt 34pt 35pt 36pt 37pt 38pt 39pt 40pt 41pt 42pt 43pt 44pt 45pt 46pt 47pt 48pt 49pt 50pt 51pt 52pt 53pt 54pt 55pt 56pt 57pt 58pt 59pt 60pt 61pt 62pt 63pt 64pt 65pt 66pt 67pt 68pt 69pt 70pt 71pt 72pt 73pt 74pt 75pt 76pt 77pt 78pt 79pt 80pt 81pt 82pt 83pt 84pt 85pt 86pt 87pt 88pt 89pt 90pt 91pt 92pt 93pt 94pt 95pt 96pt 97pt 98pt 99pt 100pt',
                            // 'font_formats' => StackishFontsAvailable
                        ),

                        wp_editor( $content, $editor_id, $settings );
                        }
;                        ?>
                        <textarea id="stack_editor"></textarea>
                        <form id="stackBuilderForm" method="post" action="">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="stackName">Stack Name*</label>
                                        <input type="text" id="stackName" name="stackName" placeholder="" class="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="stackTags" >Tags (Comma separated. Max of 11.)</label>
                                        <input type="text" id="stackTags" name="stackTags" autocomplete="off" placeholder="" class="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="stackDescription" >Description</label>
                                        <textarea id="stackDescription" name="stackDescription" placeholder="Brevity is a virtue." class="form-control"></textarea>
                                    </div>
                                    <!-- <li>
                                    <label><input type="checkbox" name="checkbox" value="make_private"> Make Private</label> (<a href="/pro" title="">This is a Pro Account feature.</a>)
                                </li> -->
                                <button type="button" id="stackDraft" class="btn btn-minimal" onclick="submit">
                                    Save Draft
                                </button>
                                <button type="button" id="stackPreview" class="btn btn-minimal">
                                    Preview
                                </button>
                                <button type="button" id="stackCreate" class="btn btn-primary pull-right">
                                    Create Stack
                                </button>
                                <input type="hidden" name="post-type" id="post-type" value="custom_posts" />
                                <input type="hidden" name="img_val" id="img_val" value="" />
                                <input type="hidden" name="action" value="custom_posts" />
                                <input type="hidden" name="empty-description" id="empty-description" value="1"/>
                                <?php wp_nonce_field( 'create_stack', 'stack_builder_nonce' ); ?>
                                <br/><br/>
                                <em>*Field is required.</em>
                                <br/><br/>
                            </div>
                        </div>
                    </form>
                    <?php
                    if($_POST){
                        stck_build_stack();
                    }
                    ?>
                </div>
            </div>
        </div>
    <?php endwhile; ?>

<?php endif; ?>

<?php get_footer(); ?>
