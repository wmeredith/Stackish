<div id="stckToolbar" class="sidebar sidebar-stack-builder">
    <div class="row">
        <div class="col-md-12">
            <div class="form-group">
                <label for="stckFontSize"><span aria-hidden="true" class="icon-font"></span>Typeface</label>
                <button type="button" id="stckTypefaceButton" class="btn btn-default btn-block btn-font typeface-btn" disabled>
                    Helvetica <span class="icon-sort" aria-hidden="true" ></span>
                </button>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckFontSizeInput"><span aria-hidden="true" class="icon-fontsize"></span>Font Size (px)</label>
                <div class="input-group">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li class="has-slider"><a href="javascript:void(0);"><div id="stckFontSizeSlider"></div></a></li>
                        </ul>
                    </div><!-- /btn-group -->
                    <input type="number" class="form-control" id="stckFontSizeInput" name="stckFontSizeInput" placeholder="">
                </div><!-- /input-group -->
            </div>
        </div>
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckFontWeight"><span aria-hidden="true" class="icon-bold"></span>Font Weight</label>
                <div class="input-group">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#">100</a></li>
                            <li><a href="#">200</a></li>
                            <li><a href="#">300</a></li>
                            <li><a href="#">400</a></li>
                            <li><a href="#">500</a></li>
                            <li><a href="#">600</a></li>
                            <li><a href="#">700</a></li>
                            <li><a href="#">800</a></li>
                            <li><a href="#">900</a></li>
                        </ul>
                    </div>
                    <input type="text" id="stckFontWeight" name="stckFontWeight" class="form-control"  placeholder="">
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckLetterSpacing"><span aria-hidden="true" class="icon-resize-horizontal"></span>Letter Spacing (ems)</label>
                <div class="input-group">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#">-0.5</a></li>
                            <li><a href="#">-0.4</a></li>
                            <li><a href="#">-0.3</a></li>
                            <li><a href="#">-0.2</a></li>
                            <li><a href="#">-0.1</a></li>
                            <li><a href="#">0</a></li>
                            <li><a href="#">0.1</a></li>
                            <li><a href="#">0.2</a></li>
                            <li><a href="#">0.3</a></li>
                            <li><a href="#">0.4</a></li>
                            <li><a href="#">0.5</a></li>
                        </ul>
                    </div><!-- /btn-group -->
                    <input type="text" id="stckLetterSpacing" name="stckLetterSpacing" class="form-control" placeholder="">
                </div><!-- /input-group -->
            </div>

        </div>
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckLineHeight"><span aria-hidden="true" class="icon-resize-vertical"></span>Line Height</label>
                <div class="input-group">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#">0.5</a></li>
                            <li><a href="#">1.0</a></li>
                            <li><a href="#">1.5</a></li>
                            <li><a href="#">2.0</a></li>
                            <li><a href="#">2.5</a></li>
                            <li><a href="#">3.0</a></li>
                            <li><a href="#">3.5</a></li>
                            <li><a href="#">4.0</a></li>
                        </ul>
                    </div><!-- /btn-group -->
                    <input type="text" id="stckLineHeight" name="stckLineHeight" class="form-control" placeholder="">
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckMeasure"><span aria-hidden="true" class="icon-ruler"></span>Measure (%)</label>
                <div class="input-group">
                    <div class="input-group-btn">
                        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <li><a href="#">10%</a></li>
                            <li><a href="#">20%</a></li>
                            <li><a href="#">30%</a></li>
                            <li><a href="#">40%</a></li>
                            <li><a href="#">50%</a></li>
                            <li><a href="#">60%</a></li>
                            <li><a href="#">70%</a></li>
                            <li><a href="#">80%</a></li>
                            <li><a href="#">90%</a></li>
                            <li><a href="#">100%</a></li>
                        </ul>
                    </div><!-- /btn-group -->
                    <input type="text" id="stckMeasure" name="stckMeasure" class="form-control" placeholder="">
                </div><!-- /input-group -->
            </div>
        </div>
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckCanvasColor"><span aria-hidden="true" class="icon-tint"></span>Canvas</label>
                <input type="text" value="#FFF" name="stckCanvasColor" class="pick-a-color form-control">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckColor"><span aria-hidden="true" class="icon-tint"></span>Font</label>
                <input type="text" value="#222" name="stckColor" class="pick-a-color form-control">
            </div>
        </div>
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckHighlightColor"><span aria-hidden="true" class="icon-tint"></span>Highlight</label>
                <input type="text" value="" name="stckHighlightColor" class="pick-a-color form-control">
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckVariants">Variants</label>
                <div class="btn-group btn-group-justified form-group" id="stckVariants" name="stckAlignment" >
                    <a href="javascript:void(0);" class="btn btn-default btn-sm active" title="Italic">
                        <span aria-hidden="true" class="icon-italic"></span>
                        <span class="sr-only">Italic</span>
                    </a>
                    <a href="javascript:void(0);" class="btn btn-default btn-sm" title="Small Caps">
                        <span aria-hidden="true" style="font-variant:small-caps"><b>Tt</b></span>
                        <span class="sr-only">Small Caps</span>
                    </a>
                    <a href="javascript:void(0);" class="btn btn-default btn-sm" title="Underline">
                        <span aria-hidden="true" class="icon-underline"></span>
                        <span class="sr-only">Underline</span>
                    </a>
                    <a href="javascript:void(0);" class="btn btn-default btn-sm" title="Strikethrough">
                        <span aria-hidden="true" class="icon-strike"></span>
                        <span class="sr-only">Strikethrough</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckAlignment">Alignment</label>
                <div class="btn-group btn-group-justified form-group" id="stckAlignment" name="stckAlignment">
                    <a href="javascript:void(0);" class="btn btn-default btn-sm active">
                        <span aria-hidden="true" class="icon-align-left"></span>
                        <span class="sr-only">Align Left</span>
                    </a>
                    <a href="javascript:void(0);" class="btn btn-default btn-sm">
                        <span aria-hidden="true" class="icon-align-right"></span>
                        <span class="sr-only">Align Right</span>
                    </a>
                    <a href="javascript:void(0);" class="btn btn-default btn-sm">
                        <span aria-hidden="true" class="icon-align-center"></span>
                        <span class="sr-only">Align Center</span>
                    </a>
                    <a href="javascript:void(0);" class="btn btn-default btn-sm">
                        <span aria-hidden="true" class="icon-align-justify"></span>
                        <span class="sr-only">Align Justify</span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-12 col-lg-6">
            <div class="form-group">
                <label for="stckVariants">Else</label>
                <a href="javascript:void(0);" class="btn btn-default btn-sm btn-block" title="Remove formatting.">
                    <span aria-hidden="true" class="icon-flash"></span>Clear Formatting&nbsp;&nbsp;&nbsp;
                </a>
            </div>
        </div>
    </div>
</div>
