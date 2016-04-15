<?php get_header(); ?>
  
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2><?php the_title(); ?></h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-9 col-lg-7">
          <div id="stack-frame"><?php the_post_thumbnail(); ?></div>
          <div class="row">
            <div class="col-md-9">
              <?php the_content(); ?>
            </div>
          </div>
        </div>
        <div class="col-md-3  col-lg-5">
          <div class="stack-display">               
            <div class="panel panel-minimal">
              <div class="panel-heading" role="tab" id="headingTypeface">
                <a class="clearfix">
                  <h4 class="panel-title">
                    <span class="pull-right">Typefaces</span>
                    <span class="icon-font pull-left" aria-hidden="true"></span>
                  </h4>
                </a>
              </div>
              <div>
                <div class="panel-body">
                  <ul>
                    <li>
                      <a href="" title="">
                        Helvetica
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Helvetica
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Helvetica
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="panel panel-minimal">
              <div class="panel-heading" role="tab" id="headingTypeface">
                <a class="clearfix">
                  <h4 class="panel-title">
                    <span class="pull-right">Fonts</span>
                     <span class="icon-fontsize pull-left"></span>
                  </h4>
                </a>
              </div>
              <div>
                <div class="panel-body">
                  <ul>
                    <li>
                      <a href="" title="">
                        Helvetica
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Helvetica
                      </a>
                    </li>
                    <li>
                      <a href="" title="">
                        Helvetica
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="panel panel-minimal">
              <div class="panel-heading" role="tab" id="headingTypeface">
                <a class="clearfix">
                  <h4 class="panel-title">
                    <span class="pull-right">Palette</span>
                    <span class="icon-tint pull-left" aria-hidden="true"></span>
                  </h4>
                </a>
              </div>
              <div>
                <div class="panel-body">
                  <span class="label label-primary">Primary</span>
                  <span class="label label-primary">Primary</span>
                  <span class="label label-primary">Primary</span>
                  <span class="label label-primary">Primary</span>
                </div>
              </div>
            </div>
            <div class="panel panel-minimal">
              <div class="panel-heading" role="tab" id="headingBold">                      
                <a class="clearfix">
                  <h4 class="panel-title">
                    <span class="pull-right">Tags</span>
                    <span class="icon-tags pull-left" aria-hidden="true"></span>
                  </h4>
                </a>
              </div>
              <div class="panel-body">
                <span class="label label-primary">Primary</span>
                <span class="label label-primary">Primary</span>
                <span class="label label-primary">Primary</span>
                <span class="label label-primary">Primary</span>
              </div>
            </div>
            <div class="panel panel-minimal">
              <div class="panel-heading" role="tab" id="headingBold">                      
                <a class="clearfix">
                  <h4 class="panel-title">
                    <span class="pull-right">Remix</span>
                    <span class="icon-flash pull-left" aria-hidden="true"></span>
                  </h4>
                </a>
              </div>
              <div class="panel-body">
                <div class="big-subcontrol-item">
                  <button title="Reset Stack" class="btn btn-minimal btn-block" aria-label="Reset Stack">
                    Copy to New Stack
                  </button>
                </div>
                <ul>
                  <li class="med-subcontrol-item">
                    <button title="Align Left" class="btn btn-minimal" aria-label="Align Left">
                      CSS
                    </button><button title="Align Center" class="btn btn-minimal" aria-label="Align Center">
                      SASS
                    </button><button title="Align Justify" class="btn btn-minimal" aria-label="Align Justify">
                      LESS
                    </button><button title="Align Right" class="btn btn-minimal" aria-label="Align Right">
                      HTML
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <?php endwhile; ?>

  <?php endif; ?>

<?php get_footer(); ?>