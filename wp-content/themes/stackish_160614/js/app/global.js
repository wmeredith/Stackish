jQuery(document).ready(function($) {
	// Rangy
  // var iframe = document.getElementById("stack-frame");
  // var sel = rangy.getSelection(iframe);
  $('#testButton').onClick(function () {
		alert('foo');
  });

	//
	//	Grab preview temp file when a stack is created
	//
	$('#stackCreate').on('click', function() {
		html2canvas([document.getElementById('stack-frame').contentWindow.document.getElementById('stack-body')], {
			onrendered: function(canvas) {
				//Set hidden field's value to image data (base-64 string)
        $('#img_val').val(canvas.toDataURL("image/png"));
        //Submit the form manually
        document.getElementById("stackBuilderForm").submit();
				letterRendering = true;
			}
		});
	});

    // http://www.lalit.org/lab/javascript-css-font-detect/
    var Detector = function() {

        // a font will be compared against all the three default fonts.
        // and if it doesn't match all 3 then that font is not available.
        var baseFonts = ['monospace', 'sans-serif', 'serif'];

        // we use m or w because these two characters take up the maximum width.
        // And we use a LLi so that the same matching fonts can get separated
        var testString = "mmmmmmmmmmlli";

        //we test using 144px font size, we may use any size. I guess larger the better.
        var testSize = '144px';
        var h = document.getElementsByTagName("body")[0];

        // create a SPAN in the document to get the width of the text we use to test
        var s = document.createElement("span");
        s.style.fontSize = testSize;
        s.innerHTML = testString;
        var defaultWidth = {};
        var defaultHeight = {};
        for (var index in baseFonts) {
            //get the default width for the three base fonts
            s.style.fontFamily = baseFonts[index];
            h.appendChild(s);
            defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
            defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
            h.removeChild(s);
        }
        function detect(fontWhitelist) {
            var detected = false;
            for (var index in baseFonts) {
                s.style.fontFamily = fontWhitelist + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
                h.appendChild(s);
                var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
                h.removeChild(s);
                detected = detected || matched;
            }
            return detected;
        }
        this.detect = detect;
    };

    // Function to dedupe an array
    function unique(list) {
        var result = [];
        $.each(list, function(i, e) {
            if ($.inArray(e, result) == -1) result.push(e);
        });
        return result;
    };
    // Dedupe matched fonts - http://stackoverflow.com/a/15868720/3361119
    var dedupedFonts = fontWhitelist.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
    // Sort matched fonts
    var sortedFonts = dedupedFonts.sort();

    // Build font list for Tiny MCE font_formats config parameter
    var results = [];
    var StackishFontsAvailable = "";
    var d = new Detector();
    for (var i = 0; i < sortedFonts.length; i++) {
        var result = d.detect(sortedFonts[i]);
        var num = i+1;
        if(result == true) {
            StackishFontsAvailable += sortedFonts[i] + '=' + sortedFonts[i] + ';';
        }
    };

    // Initialize Tiny MCE
    tinymce.init({
        selector: '#wp-stackframe-wrap',
        height : 500,
        width: 900,
        menubar: false,
        statusbar: false,
        theme_advanced_toolbar_location: 'top',
        theme_advanced_toolbar_align: 'left',
        plugins: 'textcolor colorpicker bodycolor',
        toolbar: 'fontselect | fontsizeselect | styleselect | forecolor bodycolor | bold italic underline | alignleft aligncenter alignright justify',
        fontsize_formats: '1pt 2pt 3pt 4pt 5pt 6pt 7pt 8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt 29pt 30pt 31pt 32pt 33pt 34pt 35pt 36pt 37pt 38pt 39pt 40pt 41pt 42pt 43pt 44pt 45pt 46pt 47pt 48pt 49pt 50pt 51pt 52pt 53pt 54pt 55pt 56pt 57pt 58pt 59pt 60pt 61pt 62pt 63pt 64pt 65pt 66pt 67pt 68pt 69pt 70pt 71pt 72pt 73pt 74pt 75pt 76pt 77pt 78pt 79pt 80pt 81pt 82pt 83pt 84pt 85pt 86pt 87pt 88pt 89pt 90pt 91pt 92pt 93pt 94pt 95pt 96pt 97pt 98pt 99pt 100pt',
        style_formats: [
            {title: 'Headers', items: [
              {title: 'Header 1', format: 'h1'},
              {title: 'Header 2', format: 'h2'},
              {title: 'Header 3', format: 'h3'},
              {title: 'Header 4', format: 'h4'},
              {title: 'Header 5', format: 'h5'},
              {title: 'Header 6', format: 'h6'}
            ]},
            {title: 'Blocks', items: [
              {title: 'Paragraph', format: 'p'},
              {title: 'Blockquote', format: 'blockquote'},
              {title: 'Div', format: 'div'},
              {title: 'Pre', format: 'pre'}
            ]},
            {title: 'Inline', items: [
              {title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough'},
              {title: 'Superscript', icon: 'superscript', format: 'superscript'},
              {title: 'Subscript', icon: 'subscript', format: 'subscript'},
              {title: 'Code', icon: 'code', format: 'code'}
            ]},
        ],
        font_formats: StackishFontsAvailable
    });
});
