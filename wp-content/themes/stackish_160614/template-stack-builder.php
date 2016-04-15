<?php
/*
Template Name: Stack Builder v1
*/
get_header(); ?>
  <script type="text/javascript" charset="utf-8">
    var editor;
    document.addEventListener( 'click', function ( e ) {
      var id = e.target.id,
          value;
      if ( id && editor && editor[ id ] ) {
        if ( e.target.className === 'prompt' ) {
          value = prompt( 'Value:' );
        }
        editor[ id ]( value );
      }
    }, false );
  </script>

  <div class="modal-mask transparent"></div>
  <div id="font-list">
    <p class="font-list-caveat">
      Note: Web fonts have come a long way... and have a way to go. These are your locally installed typefaces matched against our database. If you have a locally installed font that doesn't appear here, <a href="/contact/" target="blank" title="Suggest a font for our database">let&nbsp;us&nbsp;know</a>. We'll do our best to add it ASAP.
    </p>
    <div class="search-wrapper">
      <label for="font-picker-search" class="sr-only">Filter Typefaces</label>
      <input type="search" name="font-picker-search" class="form-control search" placeholder="&#xF002; Search Typefaces..." style="font-family:Museo Sans,FontAwesome">
      <!-- <a href="#">About this list.</a> -->
    </div>
    <ul class="font-picker list"><!-- populated by JS--></ul>
  </div>
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Font Stack Builder</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <?php wp_editor( '', 'stackframe', $settings = array(
              'media_buttons' => 0,
              'quicktags' => 0,
              'wpautop' => 0,
              'tinymce' => array(
                'height' => '600px',
                'width' => '800px',
                'resize' => false,
                'toolbar1' => 'fontselect forecolor backcolor',
                'toolbar2' => 'alignleft aligncenter alignright alignjustify | bullist numlist |  outdent indent | removeformat'
              )
            ) 
          ); ?> 
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