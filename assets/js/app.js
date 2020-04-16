import 'bootstrap'

import '../css/app.scss'

// import home_player from './home_player'

// document.addEventListener( 'DOMContentLoaded', home_player )



const
    CLOUD_NAME = 'dktvfwhgy',
    UPLOAD_PRESET = 'ml_default'

uploadFile( 'https://res.cloudinary.com/demo/image/upload/sample.jpg' )

function uploadFile( file ) {
    let
        url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        xhr = new XMLHttpRequest(),
        fd = new FormData()

    xhr.open( 'POST', url, true )
    xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' )

    xhr.upload.addEventListener( "progress", ( { loaded, total } ) => console.log( `Progress: ${loaded} / ${total}` ) )

    xhr.onreadystatechange = function ( e ) {
        if ( xhr.readyState == 4 && xhr.status == 200 ) {
            var response = JSON.parse( xhr.responseText );
            var url = response.secure_url;
            var tokens = url.split( '/' );
            tokens.splice( -2, 0, 'w_150,c_scale' );
            var img = new Image();
            img.src = tokens.join( '/' );
            img.alt = response.public_id;
        }
    };

    fd.append( 'upload_preset', UPLOAD_PRESET )
    fd.append( 'tags', 'browser_upload' )
    fd.append( 'file', file )
    xhr.send( fd )
}
