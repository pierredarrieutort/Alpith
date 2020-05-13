import 'bootstrap'

import '../css/app.scss'

import home_player from './home_player'
import mediaUpload from './media_upload'
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('trends-carousel'))
        home_player()

    if (document.getElementById('admin-media-upload'))
        mediaUpload()
})
