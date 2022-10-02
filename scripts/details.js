const name = document.getElementById('superhero-name');
const image = document.getElementById('superhero-img');
const fav = document.getElementById('favourite');
const snackbar = document.getElementById('snackbar');

const ts = 1;
const hash = CryptoJS.MD5(ts + "98ab300885209331e2dab3257d78477da33b2ffa" + "c97e1b74c79cd168d399bc7e230a5964");
const apiKey = "c97e1b74c79cd168d399bc7e230a5964";

var query = window.location.search;
var paramters = new URLSearchParams(query);
let Id = paramters.get('id');

(function fetchCharacterById() {
  let url = `https://gateway.marvel.com/v1/public/characters/${Id}?ts=1&apikey=${apiKey}&hash=${hash}`
  fetch(url)
    .then(response => response.json())
    .then(res => {
      RenderOnToDom(res.data.results);
    })
    .catch(err => console.log(err));
})();


function RenderOnToDom(data) {
  let movieContainer;

  movieContainer = document.getElementById("movie-wrapper");

  const { id, thumbnail, name, description } = data[0]
  const img_url = thumbnail.path + "." + thumbnail.extension;

  if (movieContainer) {
    movieContainer.innerHTML = `
    <div id="movie-poster">
       <img src=${img_url} />
       </div>
       <div id="movie-details">
          <h2 id="title">${name}</h2>
          <!-- movie description -->
          <p id="movie-description">
           <span>
             <strong>Plot: </strong>
              ${description}
            </span>: 
          </p>
        <div class="add-favorite-btn">
            <button type="button" class="add-favourite"  movie-id=${id}>Add to Favourite</button>
         </div>
       </div>
     `;
    //  const addFavoriteBtn = document.getElementById('add-favourite');
    //   AddMovieTofavourite(addFavoriteBtn);
  }
}