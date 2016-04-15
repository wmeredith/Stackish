<div class="col-md-3">
  <div class="stack-control">
    <div class="panel panel-minimal">
      <div class="panel-heading" role="tab" id="headingTypeface">
        <a data-toggle="collapse" href="#collapseTypeface" aria-expanded="true" aria-controls="collapseTypeface" class="clearfix">
          <h4 class="panel-title">
            <span class="pull-right">Typeface</span>
            <span class="icon-font pull-left" aria-hidden="true"></span>
          </h4>
        </a>
      </div>
      <div id="collapseTypeface" class="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingTypeface">
        <div class="panel-body">
          <div class="big-subcontrol-item">
            <button id="typeface-preview-button" class="btn btn-minimal button-typeface">
              Choose a typeface...
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="panel panel-minimal">
      <div class="panel-heading" role="tab" id="headingFont">                      
        <a data-toggle="collapse" href="#collapseFont" aria-expanded="true" aria-controls="collapseFont" class="clearfix">
          <h4 class="panel-title"><span class="pull-right">Font</span> <span class="icon-fontsize pull-left"></span></h4>
        </a>
      </div>
      <div id="collapseFont" class="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingFont">
        <div class="panel-body">
          <ul class="subcontrol-list">
            <li class="subcontrol-item">
              <button type="button" class="btn btn-minimal ql-italic" aria-label="Italic" title="Italic">
                <span class="icon-italic"></span>
                <span class="sr-only">Italic</span>
              </button><button type="button" class="btn btn-minimal" aria-label="Uppercase" title="Uppercase">
                <span class="icon-uppercase"><b>TT</b></span>
                <span class="sr-only">Uppercase</span>
              </button><button type="button" class="btn btn-minimal ql-color" aria-label="Small Caps" title="Small Caps">
                <span class="icon-smallcap ql-smallcap"><b>Tt</b></span>
                <span class="sr-only">Small Caps</span>
              </button><button type="button" class="btn btn-minimal ql-underline" aria-label="Underline" title="Underline">
                <span class="icon-underline"></span>
                <span class="sr-only">Underline</span>
              </button>
            </li><li class="subcontrol-item has-slider">
              <label for="">Size (px) 
                <input id="font-size-input" type="text" class="form-control"/>
                <div class="slider" id="font-size-slider"></div>
              </label>
            </li><li class="subcontrol-item has-slider">
              <label for="">Weight 
                <input id="font-weight-input" type="text" class="form-control"/>
                <div class="slider" id="font-weight-slider"></div>
              </label>
            </li><li class="subcontrol-item has-slider">
              <label for="">Kerning 
                <input id="font-kerning-input" type="text" class="form-control"/>
                <div class="slider" id="font-kerning-slider"></div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="panel panel-minimal">
      <div class="panel-heading" role="tab" id="headingColor">
        <a data-toggle="collapse" href="#collapseColor" aria-expanded="true" aria-controls="collapseColor" class="clearfix">
          <h4 class="panel-title">
            <span class="pull-right">Palette</span>
            <span class="icon-tint pull-left" aria-hidden="true"></span>
          </h4>
        </a>
      </div>
      <div id="collapseColor" class="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingColor">
        <div class="panel-body">
          <ul class="subcontrol-list" data-stck-content="color">
            <li class="subcontrol-item has-color-picker">
              <label for="">Body
                <input id="body-color-code" type="text" class="form-control" />
                <span  id="body-color-picker" class="inline-result"></span>
              </label>
            <li class="subcontrol-item has-color-picker">
              <label for="">Font
                <input id="font-color-code" type="text" class="form-control" />
                <span  id="font-color-picker" class="inline-result"></span>
              </label>
            <li class="subcontrol-item has-color-picker">
              <label for="">Highlight
                <input id="background-color-code" type="text" class="form-control" />
                <span  id="background-color-picker" class="inline-result"></span>
              </label>
          </ul>
        </div>
      </div>
    </div>
    <div class="panel panel-minimal">
      <div class="panel-heading" role="tab" id="headingBlocks">
        <a data-toggle="collapse" href="#collapseBlocks" aria-expanded="true" aria-controls="collapseBlocks" class="clearfix">
          <h4 class="panel-title">
            <span class="pull-right">Blocks</span>
            <span class="icon-doc-text pull-left" aria-hidden="true"></span>
          </h4>
        </a>
      </div>
      <div id="collapseBlocks" class="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingBlocks">
        <div class="panel-body">
          <ul class="subcontrol-list" data-stck-content="metrics">
            <li class="subcontrol-item">
              <button title="Align Left" class="btn btn-minimal" aria-label="Align Left">
                <span class="icon-align-left"></span>
                <span class="sr-only">Align Left</span>
              </button><button title="Align Center" class="btn btn-minimal" aria-label="Align Center">
                <span class="icon-align-center"></span>
                <span class="sr-only">Align Center</span>
              </button><button title="Align Justify" class="btn btn-minimal" aria-label="Align Justify">
                <span class="icon-align-justify"></span>
                <span class="sr-only">Align Justify</span>
              </button><button title="Align Right" class="btn btn-minimal" aria-label="Align Right">
                <span class="icon-align-right"></span>
                <span class="sr-only">Align Right</span>
              </button>
            <li class="subcontrol-item has-slider js-force-block-select">
              <label for="">Line Height
                <input id="line-height-input" type="text" name="" value="1.33" class="form-control" />
                <div class="slider" id="line-height-slider"></div>
              </label> 
            <li class="subcontrol-item has-slider">
              <label for="">Measure (%)
                <input id="measure-input" type="text" name="" value="80" class="form-control" />
                <div class="slider" id="measure-slider"></div>
              </label>
          </ul>
        </div>
      </div>
    </div>
    <div class="panel panel-minimal">
      <div class="panel-heading" role="tab" id="headingCanvas">                      
        <a data-toggle="collapse" href="#collapseCanvas" aria-expanded="true" aria-controls="collapseCanvas" class="clearfix">
          <h4 class="panel-title">
            <span class="pull-right">Space</span>
            <span class="icon-doc pull-left" aria-hidden="true"></span>
          </h4>
        </a>
      </div>
      <div id="collapseCanvas" class="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingCanvas">
        <div class="panel-body">
          <ul class="subcontrol-list" data-stck-content="metrics">
            <li class="subcontrol-item">Padding (px)</li>
            <li class="subcontrol-item has-slider">
              <label for="">
                Top
                <span class="sr-only">Top</span>
                <input id="padding-top-input" type="text" name="" value="20" class="form-control" />
                <div class="slider" id="padding-top-slider"></div>
              </label> 
            <li class="subcontrol-item has-slider">
              <label for="">
                Right
                <span class="sr-only">Right</span>
                <input id="padding-right-input" type="text" name="" value="20" class="form-control" />
                <div class="slider" id="padding-right-slider"></div>
              </label>
            <li class="subcontrol-item has-slider">
              <label for="">
                Bottom
                <span class="sr-only">Down</span>
                <input id="padding-bottom-input" type="text" name="" value="20" class="form-control" />
                <div class="slider" id="padding-bottom-slider"></div>
              </label>
            <li class="subcontrol-item has-slider">
              <label for="">
                Left
                <span class="sr-only">Right</span>
                <input id="padding-left-input" type="text" name="" value="20" class="form-control" />
                <div class="slider" id="padding-left-slider"></div>
              </label>
          </ul>
        </div>
      </div>
    </div>
    <div class="panel panel-minimal">
      <div class="panel-heading" role="tab" id="headingBold">                      
        <a data-toggle="collapse" href="#collapseBold" aria-expanded="true" aria-controls="collapseBold" class="clearfix">
          <h4 class="panel-title">
            <span class="pull-right">Nukes</span>
            <span class="icon-attention pull-left" aria-hidden="true"></span>
          </h4>
        </a>
      </div>
      <div id="collapseBold" class="panel-collapse collapse out" role="tabpanel" aria-labelledby="headingBold">
        <div class="panel-body">
          <div class="big-subcontrol-item">
            <button title="Reset Stack" class="btn btn-danger btn-block" aria-label="Reset Stack">
              Reset to Defaults
            </button>
            <button title="Clear Stack" class="btn btn-danger btn-block" aria-label="Blank Stack">
              Blank Slate
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>