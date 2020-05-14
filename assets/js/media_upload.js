import Axios from "axios"

export default function mediaUpload() {
    inject_style()

    const FILE_ELEM = document.getElementById('fileElem')

    document.getElementById('fileSelect').onclick = () => FILE_ELEM.click()

    FILE_ELEM.onchange = function () { handleFiles(this.files) }

    drag_and_drop()

}

function drag_and_drop() {
    const DROPBOX = document.getElementById("admin-media-upload")
    DROPBOX.ondragenter = drag
    DROPBOX.ondragover = drag
    DROPBOX.ondrop = drop

    function drag(e) {
        e.stopPropagation()
        e.preventDefault()
    }

    function drop(e) {
        drag(e)
        handleFiles(e.dataTransfer.files)
    }
}

function handleFiles(files) {
    files.forEach(file => fileUpload(file))
}

function fileUpload(file) {

    let form_data = new FormData()
    form_data.append('upload_preset', 'ml_default')
    form_data.append('tags', 'browser_upload')
    form_data.append('file', file)


    Axios.request({
        method: 'post',
        url: 'https://api.cloudinary.com/v1_1/dktvfwhgy/upload',
        data: form_data,
        onUploadProgress: ({ loaded, total }) => {
            const progress = `${Math.floor(loaded / total * 100)}%`

            document.getElementById('progress').textContent = progress
            document.getElementById('progress-bar').style.width = progress
        }
    }).then(({ data }) => display_uploaded_file(data))

    function display_uploaded_file({ secure_url, public_id }) {
        const video = document.createElement('video');

        video.src = secure_url
        video.alt = public_id
        video.autoplay = true
        video.mute = true
        video.loop = true

        const URL_CONTAINER = document.getElementById('movie_videoUrl') || document.getElementById('episode_videoUrl')

        URL_CONTAINER.innerHTML = secure_url
        URL_CONTAINER.setAttribute('readonly', true)

        document.getElementById('gallery').appendChild(video)
    }
}


function inject_style() {
    const style = document.createElement('style')

    style.innerHTML = '#admin-media-upload {border:9px dashed;background:#e0e0e0;text-align:center;display:grid;gap:20px;padding: 2% 10%;}#admin-media-upload .progress{margin:0 auto;color:#f6f6f6;background:none;}#admin-media-upload video{width: 100%;} #admin-media-upload #fileSelect{cursor:pointer;padding:20px;border:5px solid #121212;background:#666;color: #fff}'

    document.getElementById('admin-media-upload').appendChild(style)
}
