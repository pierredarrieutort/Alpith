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
        origin: window.location.href,
        videoId: player.dataset.video,
        controls: 0,
        disablekb: 1,
        autoplay: 1,
        start: 3,
        end: 30,
        iv_load_policy: 3,
        loop: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        enablejsapi: 1,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    } )
}

function onPlayerReady( event ) {
    event.target.mute();
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange( event ) {
    if ( event.data == YT.PlayerState.PLAYING && !done ) {
        // setTimeout( () => stopVideo( event.target ), 3000 )
        done = true
    }
}



function stopVideo( event ) {
    event.stopVideo()
}
