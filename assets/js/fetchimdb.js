import Axios from "axios"

export default function imdbFetch() {

    if (getParam('entity')==='Movie') {
        const elem = document.getElementById("movie_title");
        elem.addEventListener("change", getimdb);

    }
}


function getimdb(e) {
    Axios.request( {
        method: 'post',
        url: 'https://www.omdbapi.com/?apikey=41be2698&t='+e.target.value,

    } )
        .then( ( { data } ) => setData(data)
        )

}
function setData(data) {
    if (data) {
        document.getElementById("movie_description").value = data.Plot ? data.Plot : "No description";
        document.getElementById("movie_released").value = data.Released ? new Date(data.Released).toISOString().split('T')[0] : 1;
        document.getElementById("movie_rating").value = data.imdbRating ? parseInt(data.imdbRating) : 0;
        document.getElementById("movie_thumbnail").value = data.Poster ? data.Poster : "";
        document.getElementById("movie_runtime").value = data.Runtime ? parseInt(data.Runtime) : 0;
        document.getElementById("movie_director").value = data.Director ? data.Director : "";
        document.getElementById("movie_actors").value = data.Actors ? data.Actors : "";
        document.getElementById("movie_imdbID").value = data.imdbID ? data.imdbID : "";
    }
}


function getParam(param){
    return new URLSearchParams(window.location.search).get(param);
}