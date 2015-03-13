<?php get_header(); ?>
  <table id="font-table"></table>
  <div class="modal-mask transparent"></div>
  <ul id="font-list" class="font-picker">
    <div class="font-list-caveat">
        Note: Web fonts have come a long way... and have a way to go. These are your locally installed typefaces matched against our database. If you have a locally installed font that doesn't appear here, <a href="/contact/" target="blank" title="Suggest a font for our database">let&nbsp;us&nbsp;know</a>. We'll do our best to add it ASAP.
    </div>
  </ul>
  <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
    <main class="page-main">      
      <p class="stack-builder-intro">Select some text and start building.</p>
      <div class="left-column">
        <section id="editable-stack" contenteditable="true" style="
          background-color: #D3EAE3;
          padding: 0 10%;"
        >
          <br/>
          <br/>
          <span style="
            font-family: times, serif;
            font-color: #21393d;
            font-size: 36px;
            margin-bottom: .5em;
            line-height: 1.33;
            text-align: center;
          ">Nobody tells beginners...</span>
          <span style="
            font-family: verdana, sans-serif;
            font-color: #06302a;
            font-size: 18px;
            margin-bottom: 1em;
            text-align: center;
          ">(I wish someone had told me.)</span>
          <span style="
            font-family: times, serif;
            font-color: #06302a;
            font-size: 17px;
            line-height: 1.33;
            margin-bottom: 1em;
            text-align: justify;
          ">"All of us who do creative work, we get into it because we have good taste. But there is this gap. For the first couple years you make stuff, it’s just not that good. It’s trying to be good, it has potential, but it’s not. But your taste, the thing that got you into the game, is still killer...</span>
          <span style="
            font-family: times, serif;
            font-color: #06302a;
            font-size: 17px;
            line-height: 1.33;
            margin-bottom: 1em;
            text-align: justify;
          ">"And your taste is why your work disappoints you. A lot of people never get past this phase, they quit. Most people I know who do interesting, creative work went through years of this. We know our work doesn’t have this special thing that we want it to have...</span>
          <span style="
            font-family: times, serif;
            font-color: #06302a;
            font-size: 17px;
            line-height: 1.33;
            margin-bottom: 1em;
            text-align: justify;
          ">"And if you are just starting out or you are still in this phase, you gotta know its normal and the most important thing you can do is do a lot of work. Put yourself on a deadline so that every week you will finish one story.</span>
          <span style="
            font-family: times, serif;
            font-color: #06302a;
            font-size: 17px;
            line-height: 1.33;
            margin-bottom: 1em;
            text-align: justify;
          ">"It is only by going through a volume of work that you will close that gap, and your work will be as good as your ambitions... It’s gonna take awhile. It’s normal to take awhile. You’ve just gotta fight your way through."</span>
          <span style="
            font-family: times, serif;
            font-color: #06302a;
            font-size: 17px;
            line-height: 1.33;
            margin-bottom: 1em;
            text-align: right;
          ">–Ira Glass</span>
          <span></span>
        </section>
        <?php if ( ! is_user_logged_in()) { ?>
          <p>Feel free to tinker, you'll need an account to save/publish. <a href="/users/new/" title="">You should get one (it's free)</a>.</p>
        <?php } ?>
        <section class="stack-info">
          <form>
            <ul class="form-list">
              <li class="stack-title-form">
                <label for="">Title*</label>
                <input type="text" id ="" name="" placeholder="Give your creation a name." />
              </li>
              <li class="stack-tags-form">
                <label for="" >Tags (Separate by comma.)</label>
                <input type="text" id="" name="" autocomplete="off" placeholder="Keywords will help others find your work." />
              </li>
              <li class="stack-description-form">
                <label for="" >Description</label>
                <textarea placeholder="Brevity is a virtue."></textarea>
              </li>
              <!-- <li>
                <label><input type="checkbox" name="checkbox" value="make_private"> Make Private</label> (<a href="/pro" title="">This is a Pro Account feature.</a>)
              </li> -->
              <li class="submit">
                <button class="draft-button" onclick="submit">
                  Save Draft
                </button>
                <button id="stackPreview" class="preview-button" onclick="">
                  Preview
                </button>
                <button class="publish-button" onclick="">
                  Publish
                </button>        
                <input type="hidden" name="action" value="post" />
              </li>
              <li class="help">
                <p>*Field is required.</p>
              </li>
            </ul>
            <input type="hidden" name="empty-description" id="empty-description" value="1"/>
          </form>
        </section>
      </div>

      <div class="right-column">
        <section class="stack-controls">
          <ul class="control-list">
            <li class="control-item">
              <button class="control-button" data-stck-button="typeface">
                Typeface<span class="icon-font button-icon"></span>
              </button>
              <ul class="subcontrol-list" data-stck-content="family">
                <li class="subcontrol-item typeface">
                  <button id="typeface-preview-button" data-stck-switch="font-list" class="subcontrol-button typeface">
                    &mdash;<span class="icon-sort"></span>
                  </button>
              </ul>
            </li>
            <li class="control-item">
              <button class="control-button" data-stck-button="metrics">
                Font<span class="icon-fontsize button-icon"></span>
              </button>
              <ul class="subcontrol-list" data-stck-content="metrics">
                <li class="subcontrol-item metric">
                  <label for="">Size (px) 
                    <input id="font-size-input" type="text" />
                    <div class="slider" id="font-size-slider"></div>
                  </label>
                <li class="subcontrol-item metric">
                  <label for="">Weight 
                    <input id="font-weight-input" type="text"/>
                    <div class="slider" id="font-weight-slider"></div>
                  </label>
                <li class="subcontrol-item metric">
                  <label for="">Kerning 
                    <input id="font-kerning-input" type="text"/>
                    <div class="slider" id="font-kerning-slider"></div>
                  </label>            
                <li class="subcontrol-item toggle">
                  <button title="Italics" class="subcontrol-button font-italic" onclick="document.execCommand('justifyleft'); return false;">
                    <span class="icon-italic"></span>
                    <span class="visuallyhidden">Italic</span>
                  </button>
                <li class="subcontrol-item toggle">
                  <button title="Uppercase" class="subcontrol-button font-uppercase" onclick="document.execCommand('justifyfull'); return false;">
                    <span class="icon-uppercase"><b>TT</b></span>
                    <span class="visuallyhidden">Uppercase</span>
                  </button>
                <li class="subcontrol-item toggle">
                  <button title="Small Caps" class="subcontrol-button font-smallcap" onclick="document.execCommand('justifyfull'); return false;">
                    <span class="icon-smallcap"><b>Tt</b></span>
                    <span class="visuallyhidden">Small Caps</span>
                  </button>
                <li class="subcontrol-item toggle">
                  <button title="Underline" class="subcontrol-button font-underline" onclick="document.execCommand('justifycenter'); return false;">
                    <span class="icon-underline"></span>
                    <span class="visuallyhidden">Underline</span>
                  </button>
              </ul>
            </li>
            <li class="control-item">
              <button class="control-button" data-stck-button="color">
                Color<span class="icon-tint button-icon"></span>
              </button>
              <ul class="subcontrol-list" data-stck-content="color">
                <li class="subcontrol-item color">
                  <form>
                    <label for="">Font</label>
                    <input id="font-color-code" type="text" />
                    <span  id="font-color-picker" class="inline-result"></span>
                  </form>
                <li class="subcontrol-item color">
                  <form>
                    <label for="">Background</label>
                    <input id="background-color-code" type="text" />
                    <span  id="background-color-picker" class="inline-result"></span>
                  </form>      
              </ul>
            </li>
            <li class="control-item">
              <button class="control-button" data-stck-button="metrics">
                Blocks<span class="icon-doc-text button-icon"></span>
              </button>
              <ul class="subcontrol-list" data-stck-content="metrics">
                <li class="subcontrol-item metric js-force-block-select">
                  <label for="">Line Height
                    <input id="line-height-input" type="text" name="" value="1.33"/>
                    <div class="slider" id="line-height-slider"></div>
                  </label> 
                <li class="subcontrol-item metric">
                  <label for="">Measure (%)
                    <input id="measure-input" type="text" name="" value="80"/>
                    <div class="slider" id="measure-slider"></div>
                  </label>
                <li class="subcontrol-item toggle">
                  <button title="Align Left" class="subcontrol-button align-left" onclick="document.execCommand('justifyleft'); return false;">
                    <span class="icon-align-left"></span>
                    <span class="visuallyhidden">Align Left</span>
                  </button>
                <li class="subcontrol-item toggle">
                  <button title="Align Center" class="subcontrol-button align-center" onclick="document.execCommand('justifycenter'); return false;">
                    <span class="icon-align-center"></span>
                    <span class="visuallyhidden">Align Center</span>
                  </button>
                <li class="subcontrol-item toggle">
                  <button title="Align Justify" class="subcontrol-button align-justify" onclick="document.execCommand('justifyfull'); return false;">
                    <span class="icon-align-justify"></span>
                    <span class="visuallyhidden">Align Justify</span>
                  </button>
                <li class="subcontrol-item toggle">
                  <button title="Align Right" class="subcontrol-button align-right" onclick="document.execCommand('justifyright', false, '<h3>'); return false;">
                    <span class="icon-align-right"></span>
                    <span class="visuallyhidden">Align Right</span>
                  </button>   
              </ul>
            </li>
            <li class="control-item">
              <button class="control-button" data-stck-button="metrics">
                Canvas<span class="icon-doc button-icon"></span>
              </button>
              <ul class="subcontrol-list" data-stck-content="metrics">
                <li class="subcontrol-item metric">
                  <label for="">
                    <span class="icon-up-big"></span>
                    <span class="visuallyhidden">Top</span>
                    Padding (%)
                    <input id="padding-top-input" type="text" name="" value="1.33"/>
                    <div class="slider" id="padding-top-slider"></div>
                  </label> 
                <li class="subcontrol-item metric">
                  <label for="">
                    <span class="icon-right-big"></span>
                    <span class="visuallyhidden">Right</span>
                    Padding
                    <input id="padding-right-input" type="text" name="" value="80"/>
                    <div class="slider" id="padding-right-slider"></div>
                  </label>
                <li class="subcontrol-item metric">
                  <label for="">
                    <span class="icon-down-big"></span>
                    <span class="visuallyhidden">Down</span>
                    Padding
                    <input id="padding-bottom-input" type="text" name="" value="80"/>
                    <div class="slider" id="padding-bottom-slider"></div>
                  </label>
                <li class="subcontrol-item metric">
                  <label for="">
                    <span class="icon-right-big"></span>
                    <span class="visuallyhidden">Right</span>
                    Padding
                    <input id="padding-left-input" type="text" name="" value="80"/>
                    <div class="slider" id="padding-left-slider"></div>
                  </label>
              </ul>
            </li>
            <li class="control-item">
              <button class="control-button inactive control-footer">
                <!-- Focus <span class="icon-eye button-icon"></span> -->
              </button>
            </li>
          </ul>
        </section>
        <!-- <p class="interface-switcher"><a href="" title="" class="active-interface">GUI</a><a href="" title=""><code>code</code></a>&nbsp;</p> -->
      </div>

      
      

    </main>

  <?php endwhile; ?>

  <?php endif; ?>

<?php get_footer(); ?>