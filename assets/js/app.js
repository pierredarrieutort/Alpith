import 'bootstrap'
import '../css/app.scss'

document.addEventListener( 'DOMContentLoaded', () => {
    home_player()
} )

function home_player() {
    const
        TAG = document.createElement( 'script' ),
        PLAYERS = Array.from( document.querySelectorAll( '#trends-carousel [data-video]' ) )

    TAG.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName( 'script' )[0];
    firstScriptTag.parentNode.insertBefore( TAG, firstScriptTag );

    window.onYouTubePlayerAPIReady = () => PLAYERS.forEach( ( player, i ) => iframe_init( player, i ) )
}

function iframe_init( player, i ) {
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
            'onReady': player_behavior_init,
            'onStateChange': state_listener
        }
    } )
}

function state_listener( { data, target } ) {
    if ( /3/.test( data ) )
        buffering_behavior( target )

    if ( /1/.test( data ) )
        playing_behavior( target )

    if ( /0|2|5/.test( data ) )
        poster_to_trailer( target )
}

function buffering_behavior( target ) {
    console.log( 'buffering:', target )
}

function playing_behavior( target ) {
    console.log( 'playing:', target )
}

let targets_warehouse = []
function player_behavior_init( { target } ) {
    targets_warehouse = [target, ...targets_warehouse]

    if ( targets_warehouse.length === this.querySelector( '.carousel-item' ).length )
        document.getElementById( 'trends-carousel' ).onmouseenter = function () {
            poster_to_trailer( this.querySelector( '.carousel-item.active>iframe' ).id )
        }
}

//TODO - Get id index from targets_warehouse to acts on following function.

function poster_to_trailer( target ) {
    console.log( 'hovering:', target )
    target.playVideo()
    // trailer_limiter( target )
}

function trailer_limiter( target ) {
    const
        START_TIME = 3,
        TRAILER_DURATION = 30 - START_TIME

    if ( target.getCurrentTime() < START_TIME || target.getCurrentTime() >= TRAILER_DURATION )
        target.seekTo( START_TIME )

    setTimeout( () => trailer_limiter( target ), 1000 )
}
