import 'bootstrap'

import '../css/app.scss'

// import home_player from './home_player'

// document.addEventListener( 'DOMContentLoaded', home_player )



const
    CLOUD_NAME = 'dktvfwhgy',
    UPLOAD_PRESET = 'ml_default',
    FILE_SELECT = document.getElementById( 'fileSelect' ),
    FILE_ELEM = document.getElementById( 'fileElem' ),
    URL_SELECT = document.getElementById( 'urlSelect' );

FILE_SELECT.addEventListener( "click", function ( e ) {
    e.preventDefault();

    if ( FILE_ELEM ) {
        FILE_ELEM.click();
    }
} );

URL_SELECT.addEventListener( "click", function ( e ) {
    e.preventDefault();
    
    //TODO create a real link selector
    uploadFile( 'https://res.cloudinary.com/demo/image/upload/sample.jpg' )
} );


// ************************ Drag and drop ***************** //
function drag( e ) {
    e.stopPropagation();
    e.preventDefault();
}

dropbox = document.getElementById( "dropbox" );
dropbox.addEventListener( "dragenter", drag );
dropbox.addEventListener( "dragover", drag );
dropbox.addEventListener( "drop", drop );

function drop( e ) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles( files );
}

// *********** Upload file to Cloudinary ******************** //
function uploadFile( file ) {
    var url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open( 'POST', url, true );
    xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );

    // Reset the upload progress bar
    document.getElementById( 'progress' ).style.width = 0;

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener( "progress", function ( e ) {
        var progress = Math.round( ( e.loaded * 100.0 ) / e.total );
        document.getElementById( 'progress' ).style.width = progress + "%";

        console.log( `fileuploadprogress data.loaded: ${e.loaded},
  data.total: ${e.total}` );
    } );

    xhr.onreadystatechange = function ( e ) {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            // File uploaded successfully
            var response = JSON.parse( xhr.responseText );
            // https://res.cloudinary.com/CLOUD_NAME/image/upload/v1483481128/public_id.jpg
            var url = response.secure_url;
            // Create a thumbnail of the uploaded image, with 150px width
            var tokens = url.split( '/' );
            tokens.splice( -2, 0, 'w_150,c_scale' );
            var img = new Image(); // HTML5 Constructor
            img.src = tokens.join( '/' );
            img.alt = response.public_id;
            document.getElementById( 'gallery' ).appendChild( img );
        }
    };

    fd.append( 'upload_preset', UPLOAD_PRESET );
    fd.append( 'tags', 'browser_upload' ); // Optional - add tag for image admin in Cloudinary
    fd.append( 'file', file );
    xhr.send( fd );
}

// *********** Handle selected files ******************** //
var handleFiles = function ( files ) {
    for ( var i = 0; i < files.length; i++ ) {
        uploadFile( files[i] ); // call the function to upload the file
    }
};
