
jQuery(document).ready(function($) {
    $(document).foundation();
    //
    // Debug Canary
    //
    // alert("jQuery is Working");

    //
    // Sticky Footer for Foundation - http://foundation.zurb.com/forum/posts/629-sticky-footer
    //
    $(window).bind("load", function () {
        var footer = $(".pageFooter");
        var pos = footer.position();
        var height = $(window).height();
        height = height - pos.top;
        height = height - footer.height();
        if (height > 0) {
            footer.css({
                'margin-top': height + 'px'
            });
        }
    });

});
