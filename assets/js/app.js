import 'bootstrap'
import '../css/app.scss'


document.addEventListener( 'DOMContentLoaded', scripts )


function scripts() {
    homePlayer()
}


function homePlayer() {

    const
        TAG = document.createElement( 'script' ),
        PLAYERS = Array.from( document.querySelectorAll( '#trends-carousel [data-video]' ) )




    TAG.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName( 'script' )[0];
    firstScriptTag.parentNode.insertBefore( TAG, firstScriptTag );


    window.onYouTubePlayerAPIReady = () => PLAYERS.forEach( ( player, i ) => iframeInit( player, i ) )

}


function iframeInit( player, i ) {
    const FRAME_WRAPPER = document.createElement( 'div' )

    FRAME_WRAPPER.id = `home-player-embed${i}`
    player.parentNode.appendChild( FRAME_WRAPPER )


    new YT.Player( FRAME_WRAPPER.id, {
        height: '400',
        width: '100%',
        videoId: player.dataset.video,
        controls: 0,
        modestbranding: 1,
        fs: 0,
        iv_load_policy: 3,
        rel: 0,
        playerVars: {
            loop: 1,
            control: 0,
            // start: 3,
            // end: 10,
            mute: 1
        },
        events: {
            'onReady': onPlayerReady
        }
    } )
}

function onPlayerReady( { target } ) {
    target.playVideo()
    trailer_limiter( target )
}

function trailer_limiter( target ) {
    console.log( target.getCurrentTime() )
    if ( target.getCurrentTime() < 3 || target.getCurrentTime() >= 30 )
        target.seekTo( 20 )
    setTimeout( () => trailer_limiter(target), 1000 )
}
