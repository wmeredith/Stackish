// // Force full block element selection in the stack builder - http://stackoverflow.com/a/14816523/3361119
 //     $('#stack-content-for-capture span').click(function (){
  //     var range, selection;

  //     if (window.getSelection && document.createRange) {
  //         selection = window.getSelection();
  //         range = document.createRange();
  //         range.selectNodeContents($(this)[0]);
  //         selection.removeAllRanges();
  //         selection.addRange(range);
  //     } else if (document.selection && document.body.createTextRange) {
  //         range = document.body.createTextRange();
  //         range.moveToElementText($(this)[0]);
  //         range.select();
  //     }
  // });

  // http://stackoverflow.com/questions/10560155/getting-the-parent-node-for-selected-text-with-rangy-library
  // var sel = rangy.getSelection();
  // if (sel.rangeCount > 0) {
  //     var range = sel.getRangeAt(0);
  //     var parentElement = range.commonAncestorContainer;
  //     if (parentElement.nodeType == 3) {
  //         parentElement = parentElement.parentNode;
  //     }
  // }

  // // Selecting and deploying a typeface
  // $('#font-list').on('click', 'button', function() {
  //  // Get typeface
  //  var typefaceSelection = $(this).data("stck-typeface");
    
  //  // Add font rule to css for the selected font
  //  var typefaceClass = typefaceSelection.toLowerCase().replace(/ /g,"-");

  //  // Add typeface to preview button
  //  $('#typeface-preview-button').html(typefaceSelection + '<span class="icon-sort">').css('font-family', typefaceSelection);

  //  // Apply temp font class to selected span for jquery to target
 //   var tempCssClass = "rangyTemp_" + typefaceClass;
 //    var classApplier = rangy.createCssClassApplier(tempCssClass, true);
 //    classApplier.applyToSelection();

 //    // Add the CSS to the target and then remove the temp class
 //    $('.' + tempCssClass).css('font-family', typefaceSelection).removeClass(tempCssClass);

 //    // Close font picker list
  //  $(openInterface).removeClass('open');

  //  return false;
  // });
  
  // // Select and deploy font-size
  // $('#font-size-slider').on('slide',function() {
  //  // Get typeface
  //  var fontSizeSelection = $(this).val();
    
  //  // Apply temp font class to selected span for jquery to target
 //   var tempCssClass = "rangyTemp_" + Math.round(fontSizeSelection), // no decimals in class names
 //       classApplier = rangy.createCssClassApplier(tempCssClass, true);
 //    classApplier.applyToSelection();

 //    // Add the CSS to the target and then remove the temp class
 //    $('.' + tempCssClass).css('font-size', Math.round(fontSizeSelection) + 'px').removeClass(tempCssClass);

  //  return false;
  // });

  // // Select and deploy font-weight
  // $('#font-weight-slider').on('slide',function() {
  //  // Get font-weight
  //  var fontWeightSelection = $(this).val();

  //  // Strip off the trailing .00 decimals
  //  var fontWeightRounded = fontWeightSelection.toString().replace('.00', '');
    
  //  // Apply temp font class to selected span for jquery to target
 //   var tempCssClass = "rangyTemp_" + fontWeightRounded;
 //    var classApplier = rangy.createCssClassApplier(tempCssClass, true);
 //    classApplier.applyToSelection();

 //    // Add the CSS to the target and then remove the temp class
 //    $('.' + tempCssClass).css('font-weight', fontWeightRounded).removeClass(tempCssClass);

  //  return false;
  // });

  // // Select and deploy line-height
  // $('#line-height-slider').on('slide',function() {
  //  // Get line-height
  //  var lineHeightSelection = $(this).val();

  //  // Apply temp font class to selected span for jquery to target
 //   var tempCssClass = "rangyTemp_" + Math.round(lineHeightSelection), // no decimals in class names
 //       classApplier = rangy.createCssClassApplier(tempCssClass, true);
 //    classApplier.applyToSelection();

 //    // Add the CSS to the target and then remove the temp class
 //    $('.' + tempCssClass).css('line-height', lineHeightSelection).removeClass(tempCssClass);

  //  return false;
  // });

  // // Select and deploy measure
  // $('#measure-slider').on('slide',function() {
  //  // Get measure input
  //  var measureSelection = $(this).val(),
  //      stackWidth = $('#stack-content-for-capture').innerWidth(),
  //      measurePxConvert = (measureSelection * .01) * stackWidth,
  //      marginCalc = parseInt((stackWidth - measurePxConvert) / 2);

 //    // Adjust left and right margins
 //    $('#stack-content-for-capture').css({
 //     'padding': '',
 //     'padding-left': marginCalc + 'px',
 //     'padding-right': marginCalc + 'px',
 //    });

  //  return false;
  // });
  
  // // Show font list when the typeface button is clicked.
  // $('[data-stck-switch="font-list"]').on('click', function() {
  //  $('#font-list').addClass('open');
  //  $(mask).addClass('open');
    
  //  // Scroll list to active typeface
  //  $('#font-list').scrollTop(($('#font-list li.active').position().top) - 175);// this works, just need to get the active class applied accurately
  //  return false;
  // });

  // // Update control panel to reflect selected text properties
  // $('#editable-stack').mouseup(function() {
  //  var selection = rangy.getSelection(),
 //       range = selection.getRangeAt(0),
 //       parentElement = range.commonAncestorContainer;
 //    if (parentElement.nodeType == 3) {
 //        parentElement = parentElement.parentNode;
 //    };

 //    // Reset (aka remove) any current .active classes from all .sub-control buttons
 //    $('.subcontrol-button').removeClass('active');

 //    // Update Typeface preview
 //    var parentElementTypeface = $(parentElement).css('font-family'),
 //       parentElementTypefaceProper = parentElementTypeface.replace(/,|'|"|serif|sans-serif|serif/g,'');
 //    $('#typeface-preview-button').html(parentElementTypefaceProper + '<span class="icon-sort">').css('font-family', parentElementTypeface);

 //    // Mark Typeface as active in #font-list
 //    $('#font-list li').removeClass('active');
 //    $('li.' + parentElementTypefaceProper).addClass('active');

 //    // Font-Weight
 //    var parentElementFontWeight = $(parentElement).css('font-weight');
 //    var translatedFontWeight = parentElementFontWeight.replace('bold','700');// Trade weight names for numbers
 //    $('#font-weight-input, #font-weight-slider').val(translatedFontWeight);

 //    // Font-Size
 //    var parentElementFontSize = $(parentElement).css('font-size').replace('px','');
 //    $('#font-size-input, #font-size-slider').val(parentElementFontSize);

 //    // Line-Height
 //    var parentElementLineHeight = $(parentElement).css('line-height').replace('px',''),
 //       computedElementLineHeight = parseFloat(parentElementLineHeight).toFixed(2) / parentElementFontSize;
 //    $('#line-height-input, #line-height-slider').val(computedElementLineHeight);

 //    // Alignment
 //    var parentElementTextAlign = $(parentElement).css('text-align');
 //    $('.subcontrol-button.align-' + parentElementTextAlign).addClass('active');
 //  });
  
  // // Check against font name "database" (haha, see: var fonts =[...]) and populate the font picker
  // if('#font-list') {
  //  // http://www.lalit.org/lab/javascript-css-font-detect/
  //  var Detector = function() {
  //    // a font will be compared against all the three default fonts.
  //    // and if it doesn't match all 3 then that font is not available.
  //    var baseFonts = ['monospace', 'sans-serif', 'serif'];
  //    // we use m or w because these two characters take up the maximum width.
  //    // And we use a LLi so that the same matching fonts can get separated
  //    var testString = "mmmmmmmmmmlli";
  //    //we test using 144px font size, we may use any size. I guess larger the better.
  //    var testSize = '144px';
  //    var h = document.getElementsByTagName("body")[0];
  //    // create a SPAN in the document to get the width of the text we use to test
  //    var s = document.createElement("span");
  //    s.style.fontSize = testSize;
  //    s.innerHTML = testString;
  //    var defaultWidth = {};
  //    var defaultHeight = {};
  //    for (var index in baseFonts) {
  //      //get the default width for the three base fonts
  //      s.style.fontFamily = baseFonts[index];
  //      h.appendChild(s);
  //      defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
  //      defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
  //      h.removeChild(s);
  //    }
  //    function detect(font) {
  //      var detected = false;
  //      for (var index in baseFonts) {
  //          s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
  //          h.appendChild(s);
  //          var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
  //          h.removeChild(s);
  //          detected = detected || matched;
  //      }
  //      return detected;
  //    }
  //    this.detect = detect;
  //  };
  //  var fonts = [
  //    // "Al Bayan",
  //    "American Typewriter",
  //    "Andale Mono",
  //    "Apple Casual",
  //    "Apple Chancery",
  //    "Apple Garamond",
  //    "Apple Gothic",
  //    "Apple LiGothic",
  //    "Apple LiSung",
  //    "Apple Myungjo",
  //    "Apple Symbols",
  //    "AquaKana",
  //    "Arial",
  //    "Arial Hebrew",
  //    "Ayuthaya",
  //    "Baghdad",
  //    "Baskerville",
  //    "Beijing",
  //    "BiauKai",
  //    "Big Caslon",
  //    "Brush Script",
  //    "Chalkboard",
  //    "Chalkduster",
  //    "Charcoal",
  //    "Charcoal CY",
  //    "Chicago",
  //    "Cochin",
  //    "Comic Sans",
  //    "Cooper",
  //    "Copperplate",
  //    "Corsiva Hebrew",
  //    "Courier",
  //    "Courier New",
  //    "DecoType Naskh",
  //    "Devanagari",
  //    "Didot",
  //    "Euphemia UCAS",
  //    "Fang Song",
  //    "Futura",
  //    "Gadget",
  //    "Geeza Pro",
  //    "Geezah",
  //    "Geneva",
  //    "Geneva CY",
  //    "Georgia",
  //    "Gill Sans",
  //    "Gujarati",
  //    "Gung Seoche",
  //    "Gurmukhi",
  //    "Hangangche",
  //    "HeadlineA",
  //    "Hei",
  //    "Helvetica",
  //    "Helvetica CY",
  //    "Helvetica Neue",
  //    "Herculanum",
  //    "Hiragino Kaku Gothic Pro",
  //    "Hiragino Kaku Gothic ProN",
  //    "Hiragino Kaku Gothic Std",
  //    "Hiragino Kaku Gothic StdN",
  //    "Hiragino Maru Gothic Pro",
  //    "Hiragino Maru Gothic ProN",
  //    "Hiragino Mincho Pro",
  //    "Hiragino Mincho ProN",
  //    "Hoefler Text",
  //    "Inai Mathi",
  //    "Impact",
  //    "Jung Gothic",
  //    "Kai",
  //    "Keyboard",
  //    "Krungthep",
  //    "KufiStandard GK",
  //    // "LastResort",  display issues
  //    "LiHei Pro",
  //    "LiSong Pro",
  //    "Lucida Grande",
  //    "Marker Felt",
  //    "Menlo",
  //    "Monaco",
  //    "Monaco CY",
  //    "Mshtakan",
  //    "Nadeem",
  //    "New Peninim",
  //    "New York",
  //    "NISC GB18030",
  //    "Optima",
  //    "Osaka",
  //    "Palatino",
  //    "Papyrus",
  //    "PC Myungjo",
  //    "Pilgiche",
  //    "Plantagenet Cherokee",
  //    "Raanana",
  //    "Sand",
  //    "Sathu",
  //    "Seoul",
  //    "Shin Myungjo Neue",
  //    "Silom",
  //    "Skia",
  //    "Song",
  //    "ST FangSong",
  //    "ST Heiti",
  //    "ST Kaiti",
  //    "ST Song",
  //    "Symbol",
  //    "Tae Graphic",
  //    "Tahoma",
  //    "Taipei",
  //    "Techno",
  //    "Textile",
  //    "Thonburi",
  //    "Times",
  //    "Times CY",
  //    "Times New Roman",
  //    "Trebuchet MS",
  //    "Verdana",
  //    "Zapf Chancery",
  //    "Zapf Dingbats",
  //    "Zapfinofonts",
  //    // Windows Fonts - http://en.wikipedia.org/wiki/List_of_Microsoft_Windows_fonts
  //    "Abadi MT Condensed Light",
  //    "Aharoni",
  //    "Aldhabi",
  //    "Andalus",
  //    "Angsana New",
  //    "AngsanaUPC",
  //    "Aparajita",
  //    "Arabic Typesetting",
  //    "Arial",
  //    "Arial Black",
  //    "Batang",
  //    "BatangChe",
  //    "Book Antiqua",
  //    "Browallia New",
  //    "BrowalliaUPC",
  //    "Calibri",
  //    "Calibri Light",
  //    "Calisto MT",
  //    "Cambria",
  //    "Cambria Math",
  //    "Candara",
  //    "Century Gothic",
  //    "Comic Sans MS",
  //    "Consolas",
  //    "Constantia",
  //    "Copperplate GothicBold",
  //    "Copperplate Gothic Light",
  //    "Corbel",
  //    "Cordia New",
  //    "CordiaUPC",
  //    "Courier New",
  //    "DaunPenh",
  //    "David",
  //    "DFKai-SB",
  //    "DilleniaUPC",
  //    "DokChampa",
  //    "Dotum",
  //    "DotumChe",
  //    "Ebrima",
  //    "Estrangelo Edessa",
  //    "EucrosiaUPC",
  //    "Euphemia",
  //    "FangSong",
  //    "Franklin Gothic Medium",
  //    "FrankRuehl",
  //    "FreesiaUPC",
  //    "Gabriola",
  //    "Gadugi",
  //    "Gautami",
  //    "Georgia",
  //    "Gisha",
  //    "Gulim",
  //    "GulimChe",
  //    "Gungsuh",
  //    "GungsuhChe",
  //    "Impact",
  //    "IrisUPC",
  //    "Iskoola Pota",
  //    "JasmineUPC",
  //    "KaiTi",
  //    "Kalinga",
  //    "Kartika",
  //    "Khmer UI",
  //    "KodchiangUPC",
  //    "Kokila",
  //    "Lao UI",
  //    "Latha",
  //    "Leelawadee",
  //    "Levenim MT",
  //    "LilyUPC",
  //    "Lucida Console",
  //    "Lucida Handwriting Italic",
  //    "Lucida Sans Unicode",
  //    "Malgun Gothic",
  //    "Mangal",
  //    "Marlett",
  //    "Meiryo",
  //    "Meiryo UI",
  //    "Microsoft Himalaya",
  //    "Microsoft JhengHei",
  //    "Microsoft JhengHei UI",
  //    "Microsoft New Tai Lue",
  //    "Microsoft PhagsPa",
  //    "Microsoft Sans Serif",
  //    "Microsoft Tai Le",
  //    "Microsoft Uighur",
  //    "Microsoft YaHei",
  //    "Microsoft YaHei UI",
  //    "Microsoft Yi Baiti",
  //    "MingLiU, PMingLiU",
  //    "MingLiU-ExtB, PMingLiU-ExtB",
  //    "MingLiU_HKSCS",
  //    "MingLiU_HKSCS-ExtB",
  //    "Miriam",
  //    "Mongolian Baiti",
  //    "MoolBoran",
  //    "MS Gothic, MS PGothic",
  //    "MS Mincho, MS PMincho",
  //    "MS UI Gothic",
  //    "MV Boli",
  //    "Myanmar Text",
  //    "Narkisim",
  //    "Nirmala UI",
  //    "News Gothic MT",
  //    "NSimSun",
  //    "Nyala",
  //    "Palatino Linotype",
  //    "Plantagenet Cherokee",
  //    "Raavi",
  //    "Rod",
  //    "Sakkal Majalla",
  //    "Segoe Print",
  //    "Segoe Script",
  //    "Segoe UI v5.00[3]",
  //    "Segoe UI v5.01[4]",
  //    "Segoe UI v5.27[5]",
  //    "Segoe UI Symbol",
  //    "Shonar Bangla",
  //    "Shruti",
  //    "SimHei",
  //    "SimKai",
  //    "Simplified Arabic",
  //    "SimSun",
  //    "SimSun-ExtB",
  //    "Sylfaen",
  //    "Symbol",
  //    "Tahoma",
  //    "Times New Roman",
  //    "Traditional Arabic",
  //    "Trebuchet MS",
  //    "Tunga",
  //    "Urdu Typesetting",
  //    "Utsaah",
  //    "Vani",
  //    "Verdana",
  //    "Vijaya",
  //    "Vrinda",
  //    "Webdings",
  //    "Westminster",
  //    "Wingdingsfonts.push",
  //    // Wikipedia List - http://en.wikipedia.org/wiki/List_of_typefaces
  //    "Adobe Jenson",
  //    "Adobe Text",
  //    "Albertus",
  //    "Aldus",
  //    "Alexandria",
  //    "Algerian",
  //    "American Typewriter",
  //    "Antiqua",
  //    "Arno",
  //    "Aster",
  //    "Aurora",
  //    "News 706",
  //    "Baskerville",
  //    "Bebas",
  //    "Bebas Neue",
  //    "Bell",
  //    "Bembo",
  //    "Bembo Schoolbook",
  //    "Berkeley Old Style",
  //    "Bernhard Modern",
  //    "Bodoni",
  //    "Bauer Bodoni",
  //    "Book Antiqua",
  //    "Bookman",
  //    "Bordeaux Roman",
  //    "Bulmer",
  //    "Caledonia",
  //    "Californian FB",
  //    "Calisto MT",
  //    "Cambria",
  //    "Capitals",
  //    "Cartier",
  //    "Caslon",
  //    "Wyld",
  //    "Caslon Antique",
  //    "Fifteenth Century",
  //    "Catull",
  //    "Centaur",
  //    "Century Old Style",
  //    "Century Schoolbook",
  //    "New Century Schoolbook",
  //    "Century Schoolbook Infant",
  //    "Chaparral",
  //    "Charis SIL",
  //    "Charter",
  //    "Cheltenham",
  //    "Clearface",
  //    "Cochin",
  //    "Colonna",
  //    "Computer Modern",
  //    "Concrete Roman",
  //    "Constantia",
  //    "Cooper Black",
  //    "Corona",
  //    "News 705",
  //    "DejaVu Serif",
  //    "Didot",
  //    "Droid Serif",
  //    "Ecotype",
  //    "Elephant",
  //    "Emerson",
  //    "Espy Serif",
  //    "Excelsior",
  //    "News 702",
  //    "Fairfield",
  //    "FF Scala",
  //    "Footlight",
  //    "FreeSerif",
  //    "Friz Quadrata",
  //    "Garamond",
  //    "Gentium",
  //    "Georgia",
  //    "Gloucester",
  //    "Goudy",
  //    "Goudy Old Style",
  //    "Goudy Pro Font",
  //    "Goudy Schoolbook",
  //    "Granjon",
  //    "Heather",
  //    "Hercules",
  //    "High Tower Text",
  //    "Hiroshige",
  //    "Hoefler Text",
  //    "Humana Serif",
  //    "Imprint",
  //    "Ionic No. 5",
  //    "News 701",
  //    "ITC Benguiat",
  //    "Janson",
  //    "Jenson",
  //    "Joanna",
  //    "Korinna",
  //    "Kursivschrift",
  //    "Legacy Serif",
  //    "Lexicon",
  //    "Liberation Serif",
  //    "Linux Libertine",
  //    "Literaturnaya",
  //    "Lucida Bright",
  //    "Melior",
  //    "Memphis",
  //    "Miller",
  //    "Minion",
  //    "Modern",
  //    "Mona Lisa",
  //    "Mrs Eaves",
  //    "MS Serif",
  //    "New York",
  //    "Nimbus Roman",
  //    "NPS Rawlinson Roadway",
  //    "OCR A Extended",
  //    "Palatino",
  //    "Book Antiqua",
  //    "Perpetua",
  //    "Plantin",
  //    "Plantin Schoolbook",
  //    "Playbill",
  //    "Poor Richard",
  //    "Renault",
  //    "Requiem",
  //    "Roman",
  //    "Rotis Serif",
  //    "Sabon",
  //    "Seagull",
  //    "Sistina",
  //    "Souvenir",
  //    "STIX",
  //    "Stone Informal",
  //    "Stone Serif",
  //    "Sylfaen",
  //    "Times New Roman",
  //    "Times",
  //    "Trajan",
  //    "Trinité",
  //    "Trump Mediaeval",
  //    "Utopia",
  //    "Vale Type",
  //    "Vera Serif",
  //    "Versailles",
  //    "Wanted",
  //    "Weiss",
  //    "Wide Latin",
  //    "Windsor",
  //    "XITSfonts",
  //    "Alexandria",
  //    "Apex",
  //    "Archer",
  //    "Athens",
  //    "Cholla Slab",
  //    "City",
  //    "Clarendon",
  //    "Concrete Roman",
  //    "Courier",
  //    "Egyptienne",
  //    "Guardian Egyptian",
  //    "Ionic No. 5",
  //    "Lexia",
  //    "Museo Slab",
  //    "Nilland",
  //    "Rockwell",
  //    "Skeleton Antique",
  //    "Tower",
  //    "Abadi",
  //    "Agency FB",
  //    "Akzidenz-Grotesk",
  //    "Andalé Sans",
  //    "Aptifer",
  //    "Arial",
  //    "Arial Unicode MS",
  //    "Avant Garde Gothic",
  //    "Avenir",
  //    "Bank Gothic",
  //    "Barmeno",
  //    "Bauhaus",
  //    "Bell Centennial",
  //    "Bell Gothic",
  //    "Benguiat Gothic",
  //    "Berlin Sans",
  //    "Beteckna",
  //    "Blue Highway",
  //    "Brandon Grotesque",
  //    "Cabin",
  //    "Cafeteria",
  //    "Calibri",
  //    "Casey",
  //    "Century Gothic",
  //    "Charcoal",
  //    "Chicago",
  //    "Clearface Gothic",
  //    "Clearview",
  //    "Co Headline",
  //    "Co Text",
  //    "Compacta",
  //    "Corbel",
  //    "DejaVu Sans",
  //    "Dotum",
  //    "Droid Sans",
  //    "Dyslexie",
  //    "Ecofont",
  //    "Eras",
  //    "Espy Sans",
  //    "Nu Sans[1]",
  //    "Eurocrat",
  //    "Eurostile",
  //    "Square 721",
  //    "FF Dax",
  //    "FF Meta",
  //    "FF Scala Sans",
  //    "Flama",
  //    "Formata",
  //    "Franklin Gothic",
  //    "FreeSans",
  //    "Frutiger",
  //    "Frutiger Next",
  //    "Futura",
  //    "Geneva",
  //    "Gill Sans",
  //    "Gill Sans Schoolbook",
  //    "Gotham",
  //    "Haettenschweiler",
  //    "Handel Gothic",
  //    "Denmark",
  //    "Hei",
  //    "Helvetica",
  //    "Helvetica Neue",
  //    "Swiss 721",
  //    "Highway Gothic",
  //    "Hiroshige Sans",
  //    "Hobo",
  //    "Impact",
  //    "Industria",
  //    "Interstate",
  //    "Johnston/New Johnston",
  //    "Kabel",
  //    "Lato",
  //    "ITC Legacy Sans",
  //    "Lexia Readable",
  //    "Liberation Sans",
  //    "Lucida Sans",
  //    "Meiryo",
  //    "Microgramma",
  //    "Modern",
  //    "Motorway",
  //    "MS Sans Serif",
  //    "Museo Sans",
  //    "Myriad",
  //    "Neutraface",
  //    "Neuzeit S",
  //    "News Gothic",
  //    "Nimbus Sans L",
  //    "Nina",
  //    "Open Sans",
  //    "Optima",
  //    "Parisine",
  //    "Pricedown",
  //    "Prima Sans",
  //    "PT Sans",
  //    "Rail Alphabet",
  //    "Revue",
  //    "Roboto",
  //    "Rotis Sans",
  //    "Segoe UI",
  //    "Skia",
  //    "Souvenir Gothic",
  //    "ITC Stone Sans",
  //    "Syntax",
  //    "Tahoma",
  //    "Template Gothic",
  //    "Thesis Sans",
  //    "Tiresias",
  //    "Trade Gothic",
  //    "Transport",
  //    "Trebuchet MS",
  //    "Trump Gothic",
  //    "Twentieth Century",
  //    "Ubuntu",
  //    "Univers",
  //    "Zurich",
  //    "Vera Sans",
  //    "Verdana",
  //    "Virtue",
  //    "Amsterdam Old Style",
  //    "Divona",
  //    "Nyala",
  //    "Portobello",
  //    "Rotis Semi Serif",
  //    "Tema Cantante",
  //    "Andale Mono",
  //    "Anonymous and Anonymous Pro",
  //    "Arial Monospaced",
  //    "Bitstream Vera",
  //    "Consolas",
  //    "Courier",
  //    "CourierHP",
  //    "Courier New",
  //    "CourierPS",
  //    "Fontcraft Courier",
  //    "DejaVu Sans Mono",
  //    "Droid Sans Mono",
  //    "Everson Mono",
  //    "Fedra Mono",
  //    "Fixed",
  //    "Fixedsys",
  //    "Fixedsys Excelsior",
  //    "HyperFont",
  //    "Inconsolata",
  //    "Letter Gothic",
  //    "Liberation Mono",
  //    "Lucida Console",
  //    "Lucida Sans Typewriter",
  //    "Lucida Typewriter",
  //    "Menlo",
  //    "MICR",
  //    "Miriam Fixed",
  //    "Monaco",
  //    "Monofur",
  //    "Monospace",
  //    "MS Gothic",
  //    "MS Mincho",
  //    "Nimbus Mono L",
  //    "OCR-A",
  //    "OCR-B",
  //    "Orator",
  //    "Ormaxx",
  //    "PragmataPro",
  //    "Prestige Elite",
  //    "ProFont",
  //    "Proggy programming fonts",
  //    "Small Fonts",
  //    "Sydnie",
  //    "Terminal",
  //    "Tex Gyre Cursor",
  //    "Trixie",
  //    "Ubuntu Mono",
  //    "UM Typewriter",
  //    "Vera Sans Mono",
  //    "William Monospace",
  //    "Balloon",
  //    "Brush Script",
  //    "Choc",
  //    "Dom Casual",
  //    "Dragonwick",
  //    "Mistral",
  //    "Papyrus",
  //    "Segoe Script",
  //    "Tempus Sans",
  //    "Utopia",
  //    "Amazone",
  //    "American Scribe",
  //    "AMS Euler",
  //    "Apple Chancery",
  //    "Aquiline",
  //    "Aristocrat",
  //    "Bickley Script",
  //    "Civitype",
  //    "Codex",
  //    "Edwardian Script",
  //    "Forte",
  //    "French Script",
  //    "ITC Zapf Chancery",
  //    "Kuenstler Script",
  //    "Monotype Corsiva",
  //    "Old English Text MT",
  //    "Palace Script",
  //    "Park Avenue",
  //    "Scriptina",
  //    "Shelley Volante",
  //    "Vivaldi",
  //    "Vladimir Script",
  //    "Zapfino",
  //    "Andy",
  //    "Ashley Script",
  //    "Cézanne",
  //    "Chalkboard",
  //    "Comic Sans MS",
  //    "Dom Casual",
  //    "Fontoon",
  //    "Irregularis",
  //    "Jefferson",
  //    "Kristen",
  //    "Lucida Handwriting",
  //    "Rage Italic",
  //    "Rufscript",
  //    "Scribble",
  //    "Soupbone",
  //    "Tekton",
  //    "Alecko",
  //    "Cinderella",
  //    "Coronet",
  //    "Cupola",
  //    "Curlz",
  //    "Magnificat",
  //    "Script",
  //    "Stone Informal",
  //    "American Text",
  //    "Bastard",
  //    "Breitkopf Fraktur",
  //    "Cloister Black",
  //    "Fette Fraktur",
  //    "Fletcher",
  //    "Fraktur",
  //    "Goudy Text",
  //    "Lucida Blackletter",
  //    "Old English Text",
  //    "Schwabacher",
  //    "Wedding Text",
  //    "Aegyptus",
  //    "Aharoni",
  //    "Aisha",
  //    "Amienne",
  //    "Batak Script",
  //    "Chandas",
  //    "Grecs du roi",
  //    "Hanacaraka",
  //    "Japanese Gothic",
  //    "Jomolhari",
  //    "Kochi",
  //    "Koren",
  //    "Lontara Script",
  //    "Maiola",
  //    "Malgun Gothic",
  //    "Meiryo",
  //    "Microsoft JhengHei",
  //    "Microsoft YaHei",
  //    "Minchō",
  //    "Ming",
  //    "Mona",
  //    "MS Gothic",
  //    "Nassim",
  //    "Nastaliq Navees",
  //    "Neacademia",
  //    "Perpetua Greek[2]",
  //    "Porson",
  //    "SimSun",
  //    "Skolar",
  //    "Skolar Devanagari",
  //    "Sundanese Unicode",
  //    "Sutturah",
  //    "Sylfaen",
  //    "Tai Le Valentinium",
  //    "Tengwar",
  //    "Tibetan Machine Uni",
  //    "Tunga",
  //    "Wadalab",
  //    "Wilson Greek",
  //    "Apple Symbols",
  //    "Asana-Math",
  //    "Blackboard bold",
  //    "Bookshelf Symbol 7",
  //    "Braille",
  //    "Cambria Math",
  //    "Commercial Pi",
  //    "Computer Modern",
  //    "Corel",
  //    "Erler Dingbats",
  //    "HM Phonetic",
  //    "Lucida Math",
  //    "Marlett",
  //    "Mathematical Pi",
  //    "Morse Code",
  //    "OpenSymbol",
  //    "RichStyle",
  //    "Symbol",
  //    "SymbolPS",
  //    "Webdings",
  //    "Wingdings",
  //    "Wingdings 2",
  //    "Wingdings 3",
  //    "Zapf Dingbats",
  //    "Abracadabra",
  //    "Ad Lib",
  //    "Allegro",
  //    "Andreas",
  //    "Arnold Böcklin",
  //    "Astur",
  //    "Balloon Pop Outlaw Black",
  //    "Banco",
  //    "Bauhaus",
  //    "Beat",
  //    "Braggadocio",
  //    "Broadway",
  //    "Caslon Antique",
  //    "Cooper Black",
  //    "Curlz",
  //    "Ellington",
  //    "Exablock",
  //    "Exocet",
  //    "FIG Script",
  //    "Forte",
  //    "Gabriola",
  //    "Gigi",
  //    "Harlow Solid",
  //    "Harrington",
  //    "Horizon",
  //    "Jim Crow",
  //    "Jokerman",
  //    "Juice",
  //    "Lo-Type",
  //    "Magneto",
  //    "Megadeth",
  //    "Neuland",
  //    "Peignot",
  //    "Ravie",
  //    "San Francisco",
  //    "Showcard Gothic",
  //    "Snap",
  //    "Stencil",
  //    "Umbra",
  //    "Westminster",
  //    "Willow",
  //    "Windsor",
  //    // Google Fonts - http://worknotes.scripting.com/february2012/22612ByDw/listOfGoogleFonts
  //    "ABeeZee",
  //    "Abel",
  //    "Abril Fatface",
  //    "Aclonica",
  //    "Acme",
  //    "Actor",
  //    "Adamina",
  //    "Advent Pro",
  //    "Aguafina Script",
  //    "Akronim",
  //    "Aladin",
  //    "Aldrich",
  //    "Alef",
  //    "Alegreya",
  //    "Alegreya Sans",
  //    "Alegreya Sans SC",
  //    "Alegreya SC",
  //    "Alex Brush",
  //    "Alfa Slab One",
  //    "Alice",
  //    "Alike",
  //    "Alike Angular",
  //    "Allan",
  //    "Allerta",
  //    "Allerta Stencil",
  //    "Allura",
  //    "Almendra",
  //    "Almendra Display",
  //    "Almendra SC",
  //    "Amarante",
  //    "Amaranth",
  //    "Amatic SC",
  //    "Amethysta",
  //    "Anaheim",
  //    "Andada",
  //    "Andika",
  //    "Angkor",
  //    "Annie Use Your Telescope",
  //    "Anonymous Pro",
  //    "Antic",
  //    "Antic Didone",
  //    "Antic Slab",
  //    "Anton",
  //    "Arapey",
  //    "Arbutus",
  //    "Arbutus Slab",
  //    "Architects Daughter",
  //    "Archivo Black",
  //    "Archivo Narrow",
  //    "Arimo",
  //    "Arizonia",
  //    "Armata",
  //    "Artifika",
  //    "Arvo",
  //    "Asap",
  //    "Asset",
  //    "Astloch",
  //    "Asul",
  //    "Atomic Age",
  //    "Aubrey",
  //    "Audiowide",
  //    "Autour One",
  //    "Average",
  //    "Average Sans",
  //    "Averia Gruesa Libre",
  //    "Averia Libre",
  //    "Averia Sans Libre",
  //    "Averia Serif Libre",
  //    "Bad Script",
  //    "Balthazar",
  //    "Bangers",
  //    "Basic",
  //    "Battambang",
  //    "Baumans",
  //    "Bayon",
  //    "Belgrano",
  //    "Belleza",
  //    "BenchNine",
  //    "Bentham",
  //    "Berkshire Swash",
  //    "Bevan",
  //    "Bigelow Rules",
  //    "Bigshot One",
  //    "Bilbo",
  //    "Bilbo Swash Caps",
  //    "Bitter",
  //    "Black Ops One",
  //    "Bokor",
  //    "Bonbon",
  //    "Boogaloo",
  //    "Bowlby One",
  //    "Bowlby One SC",
  //    "Brawler",
  //    "Bree Serif",
  //    "Bubblegum Sans",
  //    "Bubbler One",
  //    "Buda",
  //    "Buenard",
  //    "Butcherman",
  //    "Butterfly Kids",
  //    "Cabin",
  //    "Cabin Condensed",
  //    "Cabin Sketch",
  //    "Caesar Dressing",
  //    "Cagliostro",
  //    "Calligraffitti",
  //    "Cambo",
  //    "Candal",
  //    "Cantarell",
  //    "Cantata One",
  //    "Cantora One",
  //    "Capriola",
  //    "Cardo",
  //    "Carme",
  //    "Carrois Gothic",
  //    "Carrois Gothic SC",
  //    "Carter One",
  //    "Caudex",
  //    "Cedarville Cursive",
  //    "Ceviche One",
  //    "Changa One",
  //    "Chango",
  //    "Chau Philomene One",
  //    "Chela One",
  //    "Chelsea Market",
  //    "Chenla",
  //    "Cherry Cream Soda",
  //    "Cherry Swash",
  //    "Chewy",
  //    "Chicle",
  //    "Chivo",
  //    "Cinzel",
  //    "Cinzel Decorative",
  //    "Clicker Script",
  //    "Coda",
  //    "Coda Caption",
  //    "Codystar",
  //    "Combo",
  //    "Comfortaa",
  //    "Coming Soon",
  //    "Concert One",
  //    "Condiment",
  //    "Content",
  //    "Contrail One",
  //    "Convergence",
  //    "Cookie",
  //    "Copse",
  //    "Corben",
  //    "Courgette",
  //    "Cousine",
  //    "Coustard",
  //    "Covered By Your Grace",
  //    "Crafty Girls",
  //    "Creepster",
  //    "Crete Round",
  //    "Crimson Text",
  //    "Croissant One",
  //    "Crushed",
  //    "Cuprum",
  //    "Cutive",
  //    "Cutive Mono",
  //    "Damion",
  //    "Dancing Script",
  //    "Dangrek",
  //    "Dawning of a New Day",
  //    "Days One",
  //    "Delius",
  //    "Delius Swash Caps",
  //    "Delius Unicase",
  //    "Della Respira",
  //    "Denk One",
  //    "Devonshire",
  //    "Didact Gothic",
  //    "Diplomata",
  //    "Diplomata SC",
  //    "Domine",
  //    "Donegal One",
  //    "Doppio One",
  //    "Dorsa",
  //    "Dosis",
  //    "Dr Sugiyama",
  //    "Droid Sans",
  //    "Droid Sans Mono",
  //    "Droid Serif",
  //    "Duru Sans",
  //    "Dynalight",
  //    "Eagle Lake",
  //    "Eater",
  //    "EB Garamond",
  //    "Economica",
  //    "Ek Mukta",
  //    "Electrolize",
  //    "Elsie",
  //    "Elsie Swash Caps",
  //    "Emblema One",
  //    "Emilys Candy",
  //    "Engagement",
  //    "Englebert",
  //    "Enriqueta",
  //    "Erica One",
  //    "Esteban",
  //    "Euphoria Script",
  //    "Ewert",
  //    "Exo",
  //    "Exo 2",
  //    "Expletus Sans",
  //    "Fanwood Text",
  //    "Fascinate",
  //    "Fascinate Inline",
  //    "Faster One",
  //    "Fasthand",
  //    "Fauna One",
  //    "Federant",
  //    "Federo",
  //    "Felipa",
  //    "Fenix",
  //    "Finger Paint",
  //    "Fira Mono",
  //    "Fira Sans",
  //    "Fjalla One",
  //    "Fjord One",
  //    "Flamenco",
  //    "Flavors",
  //    "Fondamento",
  //    "Fontdiner Swanky",
  //    "Forum",
  //    "Francois One",
  //    "Freckle Face",
  //    "Fredericka the Great",
  //    "Fredoka One",
  //    "Freehand",
  //    "Fresca",
  //    "Frijole",
  //    "Fruktur",
  //    "Fugaz One",
  //    "Gabriela",
  //    "Gafata",
  //    "Galdeano",
  //    "Galindo",
  //    "Gentium Basic",
  //    "Gentium Book Basic",
  //    "Geo",
  //    "Geostar",
  //    "Geostar Fill",
  //    "Germania One",
  //    "GFS Didot",
  //    "GFS Neohellenic",
  //    "Gilda Display",
  //    "Give You Glory",
  //    "Glass Antiqua",
  //    "Glegoo",
  //    "Gloria Hallelujah",
  //    "Goblin One",
  //    "Gochi Hand",
  //    "Gorditas",
  //    "Goudy Bookletter 1911",
  //    "Graduate",
  //    "Grand Hotel",
  //    "Gravitas One",
  //    "Great Vibes",
  //    "Griffy",
  //    "Gruppo",
  //    "Gudea",
  //    "Habibi",
  //    "Hammersmith One",
  //    "Hanalei",
  //    "Hanalei Fill",
  //    "Handlee",
  //    "Hanuman",
  //    "Happy Monkey",
  //    "Headland One",
  //    "Henny Penny",
  //    "Herr Von Muellerhoff",
  //    "Hind",
  //    "Holtwood One SC",
  //    "Homemade Apple",
  //    "Homenaje",
  //    "Iceberg",
  //    "Iceland",
  //    "IM Fell Double Pica",
  //    "IM Fell Double Pica SC",
  //    "IM Fell DW Pica",
  //    "IM Fell DW Pica SC",
  //    "IM Fell English",
  //    "IM Fell English SC",
  //    "IM Fell French Canon",
  //    "IM Fell French Canon SC",
  //    "IM Fell Great Primer",
  //    "IM Fell Great Primer SC",
  //    "Imprima",
  //    "Inconsolata",
  //    "Inder",
  //    "Indie Flower",
  //    "Inika",
  //    "Irish Grover",
  //    "Istok Web",
  //    "Italiana",
  //    "Italianno",
  //    "Jacques Francois",
  //    "Jacques Francois Shadow",
  //    "Jim Nightshade",
  //    "Jockey One",
  //    "Jolly Lodger",
  //    "Josefin Sans",
  //    "Josefin Slab",
  //    "Joti One",
  //    "Judson",
  //    "Julee",
  //    "Julius Sans One",
  //    "Junge",
  //    "Jura",
  //    "Just Another Hand",
  //    "Just Me Again Down Here",
  //    "Kalam",
  //    "Kameron",
  //    "Kantumruy",
  //    "Karla",
  //    "Karma",
  //    "Kaushan Script",
  //    "Kavoon",
  //    "Kdam Thmor",
  //    "Keania One",
  //    "Kelly Slab",
  //    "Kenia",
  //    "Khmer",
  //    "Kite One",
  //    "Knewave",
  //    "Kotta One",
  //    "Koulen",
  //    "Kranky",
  //    "Kreon",
  //    "Kristi",
  //    "Krona One",
  //    "La Belle Aurore",
  //    "Lancelot",
  //    "Lato",
  //    "League Script",
  //    "Leckerli One",
  //    "Ledger",
  //    "Lekton",
  //    "Lemon",
  //    "Libre Baskerville",
  //    "Life Savers",
  //    "Lilita One",
  //    "Lily Script One",
  //    "Limelight",
  //    "Linden Hill",
  //    "Lobster",
  //    "Lobster Two",
  //    "Londrina Outline",
  //    "Londrina Shadow",
  //    "Londrina Sketch",
  //    "Londrina Solid",
  //    "Lora",
  //    "Love Ya Like A Sister",
  //    "Loved by the King",
  //    "Lovers Quarrel",
  //    "Luckiest Guy",
  //    "Lusitana",
  //    "Lustria",
  //    "Macondo",
  //    "Macondo Swash Caps",
  //    "Magra",
  //    "Maiden Orange",
  //    "Mako",
  //    "Marcellus",
  //    "Marcellus SC",
  //    "Marck Script",
  //    "Margarine",
  //    "Marko One",
  //    "Marmelad",
  //    "Marvel",
  //    "Mate",
  //    "Mate SC",
  //    "Maven Pro",
  //    "McLaren",
  //    "Meddon",
  //    "MedievalSharp",
  //    "Medula One",
  //    "Megrim",
  //    "Meie Script",
  //    "Merienda",
  //    "Merienda One",
  //    "Merriweather",
  //    "Merriweather Sans",
  //    "Metal",
  //    "Metal Mania",
  //    "Metamorphous",
  //    "Metrophobic",
  //    "Michroma",
  //    "Milonga",
  //    "Miltonian",
  //    "Miltonian Tattoo",
  //    "Miniver",
  //    "Miss Fajardose",
  //    "Modern Antiqua",
  //    "Molengo",
  //    "Molle",
  //    "Monda",
  //    "Monofett",
  //    "Monoton",
  //    "Monsieur La Doulaise",
  //    "Montaga",
  //    "Montez",
  //    "Montserrat",
  //    "Montserrat Alternates",
  //    "Montserrat Subrayada",
  //    "Moul",
  //    "Moulpali",
  //    "Mountains of Christmas",
  //    "Mouse Memoirs",
  //    "Mr Bedfort",
  //    "Mr Dafoe",
  //    "Mr De Haviland",
  //    "Mrs Saint Delafield",
  //    "Mrs Sheppards",
  //    "Muli",
  //    "Mystery Quest",
  //    "Neucha",
  //    "Neuton",
  //    "New Rocker",
  //    "News Cycle",
  //    "Niconne",
  //    "Nixie One",
  //    "Nobile",
  //    "Nokora",
  //    "Norican",
  //    "Nosifer",
  //    "Nothing You Could Do",
  //    "Noticia Text",
  //    "Noto Sans",
  //    "Noto Serif",
  //    "Nova Cut",
  //    "Nova Flat",
  //    "Nova Mono",
  //    "Nova Oval",
  //    "Nova Round",
  //    "Nova Script",
  //    "Nova Slim",
  //    "Nova Square",
  //    "Numans",
  //    "Nunito",
  //    "Odor Mean Chey",
  //    "Offside",
  //    "Old Standard TT",
  //    "Oldenburg",
  //    "Oleo Script",
  //    "Oleo Script Swash Caps",
  //    "Open Sans",
  //    "Open Sans Condensed",
  //    "Oranienbaum",
  //    "Orbitron",
  //    "Oregano",
  //    "Orienta",
  //    "Original Surfer",
  //    "Oswald",
  //    "Over the Rainbow",
  //    "Overlock",
  //    "Overlock SC",
  //    "Ovo",
  //    "Oxygen",
  //    "Oxygen Mono",
  //    "Pacifico",
  //    "Paprika",
  //    "Parisienne",
  //    "Passero One",
  //    "Passion One",
  //    "Pathway Gothic One",
  //    "Patrick Hand",
  //    "Patrick Hand SC",
  //    "Patua One",
  //    "Paytone One",
  //    "Peralta",
  //    "Permanent Marker",
  //    "Petit Formal Script",
  //    "Petrona",
  //    "Philosopher",
  //    "Piedra",
  //    "Pinyon Script",
  //    "Pirata One",
  //    "Plaster",
  //    "Play",
  //    "Playball",
  //    "Playfair Display",
  //    "Playfair Display SC",
  //    "Podkova",
  //    "Poiret One",
  //    "Poller One",
  //    "Poly",
  //    "Pompiere",
  //    "Pontano Sans",
  //    "Port Lligat Sans",
  //    "Port Lligat Slab",
  //    "Prata",
  //    "Preahvihear",
  //    "Press Start 2P",
  //    "Princess Sofia",
  //    "Prociono",
  //    "Prosto One",
  //    "PT Mono",
  //    "PT Sans",
  //    "PT Sans Caption",
  //    "PT Sans Narrow",
  //    "PT Serif",
  //    "PT Serif Caption",
  //    "Puritan",
  //    "Purple Purse",
  //    "Quando",
  //    "Quantico",
  //    "Quattrocento",
  //    "Quattrocento Sans",
  //    "Questrial",
  //    "Quicksand",
  //    "Quintessential",
  //    "Qwigley",
  //    "Racing Sans One",
  //    "Radley",
  //    "Rajdhani",
  //    "Raleway",
  //    "Raleway Dots",
  //    "Rambla",
  //    "Rammetto One",
  //    "Ranchers",
  //    "Rancho",
  //    "Rationale",
  //    "Redressed",
  //    "Reenie Beanie",
  //    "Revalia",
  //    "Ribeye",
  //    "Ribeye Marrow",
  //    "Righteous",
  //    "Risque",
  //    "Roboto",
  //    "Roboto Condensed",
  //    "Roboto Slab",
  //    "Rochester",
  //    "Rock Salt",
  //    "Rokkitt",
  //    "Romanesco",
  //    "Ropa Sans",
  //    "Rosario",
  //    "Rosarivo",
  //    "Rouge Script",
  //    "Rubik Mono One",
  //    "Rubik One",
  //    "Ruda",
  //    "Rufina",
  //    "Ruge Boogie",
  //    "Ruluko",
  //    "Rum Raisin",
  //    "Ruslan Display",
  //    "Russo One",
  //    "Ruthie",
  //    "Rye",
  //    "Sacramento",
  //    "Sail",
  //    "Salsa",
  //    "Sanchez",
  //    "Sancreek",
  //    "Sansita One",
  //    "Sarina",
  //    "Satisfy",
  //    "Scada",
  //    "Schoolbell",
  //    "Seaweed Script",
  //    "Sevillana",
  //    "Seymour One",
  //    "Shadows Into Light",
  //    "Shadows Into Light Two",
  //    "Shanti",
  //    "Share",
  //    "Share Tech",
  //    "Share Tech Mono",
  //    "Shojumaru",
  //    "Short Stack",
  //    "Siemreap",
  //    "Sigmar One",
  //    "Signika",
  //    "Signika Negative",
  //    "Simonetta",
  //    "Sintony",
  //    "Sirin Stencil",
  //    "Six Caps",
  //    "Skranji",
  //    "Slackey",
  //    "Smokum",
  //    "Smythe",
  //    "Sniglet",
  //    "Snippet",
  //    "Snowburst One",
  //    "Sofadi One",
  //    "Sofia",
  //    "Sonsie One",
  //    "Sorts Mill Goudy",
  //    "Source Code Pro",
  //    "Source Sans Pro",
  //    "Source Serif Pro",
  //    "Special Elite",
  //    "Spicy Rice",
  //    "Spinnaker",
  //    "Spirax",
  //    "Squada One",
  //    "Stalemate",
  //    "Stalinist One",
  //    "Stardos Stencil",
  //    "Stint Ultra Condensed",
  //    "Stint Ultra Expanded",
  //    "Stoke",
  //    "Strait",
  //    "Sue Ellen Francisco",
  //    "Sunshiney",
  //    "Supermercado One",
  //    "Suwannaphum",
  //    "Swanky and Moo Moo",
  //    "Syncopate",
  //    "Tangerine",
  //    "Taprom",
  //    "Tauri",
  //    "Teko",
  //    "Telex",
  //    "Tenor Sans",
  //    "Text Me One",
  //    "The Girl Next Door",
  //    "Tienne",
  //    "Tinos",
  //    "Titan One",
  //    "Titillium Web",
  //    "Trade Winds",
  //    "Trocchi",
  //    "Trochut",
  //    "Trykker",
  //    "Tulpen One",
  //    "Ubuntu",
  //    "Ubuntu Condensed",
  //    "Ubuntu Mono",
  //    "Ultra",
  //    "Uncial Antiqua",
  //    "Underdog",
  //    "Unica One",
  //    "UnifrakturCook",
  //    "UnifrakturMaguntia",
  //    "Unkempt",
  //    "Unlock",
  //    "Unna",
  //    "Vampiro One",
  //    "Varela",
  //    "Varela Round",
  //    "Vast Shadow",
  //    "Vibur",
  //    "Vidaloka",
  //    "Viga",
  //    "Voces",
  //    "Volkhov",
  //    "Vollkorn",
  //    "Voltaire",
  //    "VT323",
  //    "Waiting for the Sunrise",
  //    "Wallpoet",
  //    "Walter Turncoat",
  //    "Warnes",
  //    "Wellfleet",
  //    "Wendy One",
  //    "Wire One",
  //    "Yanone Kaffeesatz",
  //    "Yellowtail",
  //    "Yeseva One",
  //    "Yesteryear",
  //    "Zeyada"
  //  ];
  //  var dedupedFonts = fonts.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]); // http://stackoverflow.com/a/15868720/3361119
  //  var sortedFonts = dedupedFonts.sort();
  //  // $('header').append(cleanedFonts);
  //  var results = [];
  //  var d = new Detector();
  //  for (i = 0; i < sortedFonts.length; i++) {
  //    var result = d.detect(sortedFonts[i]);
  //    var num = i+1;
  //    if(result == true) {
  //      $('#font-list').append('
  //        <li class="'+ sortedFonts[i].toLowerCase().replace(/ /g,"-") +'">
  //          <button class="typeface-selection" data-stck-typeface="'+sortedFonts[i]+'" style="font-family: '+sortedFonts[i]+'">
  //            <span class="num">'+num+'</span>
  //            <span class="typeface">'+sortedFonts[i]+'</span>
  //            <span class="test-sentence">A quick brown fox jumps over the lazy dog.</span>
  //          </button>
  //        </li>
  //      ');
  //    }
  //  }
  // };

  // $('[data-stck-button]').on('click', function() {
  //  $(this).next('[data-stck-content]').slideToggle(100);
  //  $(this).toggleClass('open');
  //  return false;
  // });

  // $('[data-stck=closeParent]').on('click', function() {
  //  $(this).parent().removeClass('open');
  // });

  // // Sliders for the Metrics panel on font-stack-builder.php
  // $('#font-size-slider').noUiSlider({
  //  start: 16,
  //  connect: "lower",
  //  range: {
  //    'min': 6,
  //    'max': 160
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#font-size-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#font-weight-slider').noUiSlider({
  //  start: 400,
  //  connect: "lower",
  //  range: {
  //    'min': 100,
  //    'max': 900
  //  },
  //  step: 100,
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#font-weight-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#font-kerning-slider').noUiSlider({
  //  start: 0,
  //  connect: "lower",
  //  range: {
  //    'min': -5,
  //    'max': 10
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#font-kerning-input'),
  //        format: {
  //          decimals: 2
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#line-height-slider').noUiSlider({
  //  start: 1.33,
  //  connect: "lower",
  //  range: {
  //    'min': 0,
  //    'max': 10
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#line-height-input'),
  //        format: {
  //          decimals: 2
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#measure-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#measure-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#padding-top-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#padding-top-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#padding-right-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#padding-right-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#padding-bottom-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#padding-bottom-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  // $('#padding-left-slider').noUiSlider({
  //  start: 80,
  //  connect: "lower",
  //  range: {
  //    'min': 1,
  //    'max': 99
  //  },
  //  serialization: {
  //    lower: [
  //      $.Link({
  //        target: $('#padding-left-input'),
  //        format: {
  //          decimals: 0
  //        }
  //      })
  //    ]
  //  }
  // });
  
  // // Color pickers
  // $('#font-color-picker').colpick({
  //  layout:'rgbhex',
  //  submit:0,
  //  colorScheme:'dark',
  //  onChange:function(hsb,hex,rgb,el,bySetColor) {
  //    $(el).css('background-color','#'+hex);
  //    // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
  //    if(!bySetColor) $('#font-color-code').val('#'+hex);
  //  }
  // }).keyup(function(){
  //    $(this).colpickSetColor(this.value);
  // });
  // $('#background-color-picker').colpick({
  //  layout:'rgbhex',
  //  submit:0,
  //  colorScheme:'dark',
  //  onChange:function(hsb,hex,rgb,el,bySetColor) {
  //    $(el).css('background-color','#'+hex);
  //    // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
  //    if(!bySetColor) $('#background-color-code').val('#'+hex);
  //  }
  // }).keyup(function(){
  //  $(this).colpickSetColor(this.value);
  // });
