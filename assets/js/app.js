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
        trailer_limiter( target, false )

    if ( /1/.test( data ) )
        trailer_limiter( target )

    if ( /0|5/.test( data ) )
        poster_to_trailer( target )
}

let targets_warehouse = []
function player_behavior_init( { target } ) {
    trailer_limiter( target, false )
    targets_warehouse = [target, ...targets_warehouse]

    if ( targets_warehouse.length === document.querySelectorAll( '#trends-carousel .carousel-item' ).length )
        document.getElementById( 'trends-carousel' ).onmouseenter = function () {
            poster_to_trailer( ...targets_warehouse.filter( ( { f } ) => f === this.querySelector( '.carousel-item.active>iframe' ) ) )
        }
}

let hovered_target = false
function poster_to_trailer( target ) {
    console.log( 'poster_to_trailer', target.f.id )
    hovered_target = true
    document.getElementById( 'trends-carousel' ).onmouseleave = () => trailer_to_poster( target )
    if ( hovered_target ) {
        target.playVideo()
        target.f.style.opacity = 1
    }
}

function trailer_to_poster( target ) {
    console.log( 'trailer_to_poster', target.f.id )
    hovered_target = false
    target.f.style.opacity = 0
    setTimeout( () => trailer_limiter( target, false ), 1000 )
}

function trailer_limiter( target, recall = true ) {
    console.log( 'trailer_limiter',  recall, hovered_target)
    const
        START_TIME = 3,
        TRAILER_DURATION = 30 - START_TIME

    if ( target.getCurrentTime() < START_TIME || target.getCurrentTime() >= TRAILER_DURATION ) {
        target.seekTo( START_TIME )
        if ( !hovered_target ) {
            recall = false
            trailer_to_poster( target )
        }
    }
    if ( recall && hovered_target)
        setTimeout( () => trailer_limiter( target, recall ), 1000 )
    else target.pauseVideo()
}
