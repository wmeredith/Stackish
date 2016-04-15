(function() {
    tinymce.PluginManager.add('stck_weight_button', function( editor, url ) {
        editor.addButton( 'stck_weight_button', {
            text: 'Weight',
            icon: false,
            onclick: function() {
                editor.insertContent('Hello World!');
            }
        });
    });
})();