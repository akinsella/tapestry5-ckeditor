
CKEDITOR.on('instanceReady', function(ev) {

//    console.log("instanceReady event");
    var editor = ev.editor;
    console.log("editor: " + editor);

    editor.on( 'saveSnapshot', function(e) {
//        console.log("Event: saveSnapshot");
        editorContentChanged();
    });

    editor.on( 'afterCommandExec', function( event ) {
//        console.log("Event: afterCommandExec");

        if ( event.data.command.canUndo !== false ) {
            editorContentChanged();
        }
    } );

    editor.on('blur', function() {
//        console.log("Event: blur");
        editorContentChanged();
    });

    editor.on('currentInstance', function() {
//        console.log("Event: currentInstance");
        editorContentChanged();
    });

    function editorContentChanged() {

//        console.log("Something changed call");
        if ( editor.element && editor.elementMode == CKEDITOR.ELEMENT_MODE_REPLACE ) {
            var data = editor.getData();

            if ( editor.config.htmlEncodeOutput ) {
                data = CKEDITOR.tools.htmlEncode( data );
            }

            if ( editor.element.is( 'textarea' ) ) {
                editor.element.$.innerHTML = data;
                editor.element.setValue(data);

            }
            else {
                editor.element.setHtml( data );
            }
        }
    }

});
