import Axios from "axios"

export default function mediaUpload() {
    const FILE_ELEM = document.getElementById( 'fileElem' )

    document.getElementById( 'fileSelect' ).onclick = () => FILE_ELEM.click()

    FILE_ELEM.onchange = function () { handleFiles( this.files ) }

    drag_and_drop()

}

function drag_and_drop() {
    const DROPBOX = document.getElementById( "dropbox" )
    DROPBOX.ondragenter = drag
    DROPBOX.ondragover = drag
    DROPBOX.ondrop = drop

    function drag( e ) {
        e.stopPropagation()
        e.preventDefault()
    }

    function drop( e ) {
        drag( e )
        handleFiles( e.dataTransfer.files )
    }
}

function handleFiles( files ) {
    files.forEach( file => fileUpload( file ) )
}

function fileUpload( file ) {

    let form_data = new FormData()
    form_data.append( 'upload_preset', 'ml_default' )
    form_data.append( 'tags', 'browser_upload' )
    form_data.append( 'file', file )


    Axios.request( {
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/dktvfwhgy/upload',
        data: form_data,
        onUploadProgress: ( { loaded, total } ) => {
            const progress = `${Math.floor( loaded / total * 100 )}%`

            document.getElementById( 'progress' ).textContent = progress
            document.getElementById('progress-bar').style.width = progress
        }
    } )
        .then( ( { data } ) => display_uploaded_file( data ) )

    function display_uploaded_file( res ) {
        let
            tokens = res.secure_url.split( '/' ),
            img = new Image()

        tokens.splice( -2, 0, 'w_150,c_scale' )
        img.src = tokens.join( '/' )
        img.alt = res.public_id
        document.getElementById( 'gallery' ).appendChild( img )
    }
}
