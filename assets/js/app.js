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
        height: '100vw',
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
            mute: 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': stateListener
        }
    } )
}

function onPlayerReady( { target } ) {
    target.playVideo()
    trailer_limiter( target )
}

function trailer_limiter( target ) {
    const
        START_TIME = 3,
        TRAILER_DURATION = 30 - START_TIME

    if ( target.getCurrentTime() < START_TIME || target.getCurrentTime() >= TRAILER_DURATION )
        target.seekTo( START_TIME )

    setTimeout( () => trailer_limiter( target ), 1000 )
}


function stateListener( { data, target } ) {
    if ( /3/.test( data ) )
        buffering_behavior( target )

    if ( /1/.test( data ) )
        playing_behavior( target )

    if ( /0|2|5/.test( data ) )
        onPlayerReady( target )
}


function buffering_behavior( target ) {

}

function playing_behavior( target ) {

}
