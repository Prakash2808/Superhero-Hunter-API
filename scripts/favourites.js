const ts = 1;
const hash = CryptoJS.MD5(ts + "98ab300885209331e2dab3257d78477da33b2ffa" + "c97e1b74c79cd168d399bc7e230a5964");
const apiKey = "c97e1b74c79cd168d399bc7e230a5964";

const favCards = document.getElementById('fav-cards');

function getFavMovieIdsFromLocalStorage() {
  const favMovieIds = localStorage.getItem('movie-ids');
 

  if (favMovieIds === null || JSON.parse(favMovieIds).length === 0) {
    alert("No favourite movies added");
  }
  else {
    let ids = JSON.parse(favMovieIds);
    fetchFavoriteMoviesById(ids);
  }
}

async function fetchFavoriteMoviesById(ids) {
  const results = [];
  let obj = {};
  for (i in ids) {
    let url = `https://gateway.marvel.com/v1/public/characters/${ids[i]}?ts=1&apikey=${apiKey}&hash=${hash}`
    let res = await fetch(url);
    let data = await res.json();

    obj = {
      ...data.data.results[0]
    }
    results.push(obj);
  }
  createCharateCard(results);
  removeFavourite();
}


function createCharateCard(characters) {
  characters.map(data => {
    let img = data.thumbnail;
    let src = `${img.path}.${img.extension}`
    let link = document.createElement('a');
    let card = document.createElement('div');
    let cardWrapper = document.createElement('div');
    cardWrapper.className = 'card-wrapper';
    link.setAttribute('href', `details.html?id=${data.id}`);
    card.id = `${data.id}`;
    card.className = 'character-card';
    card.innerHTML = `
  <div class="card-body">
      <img src=${src} alt="thumbnail" width="100%"/>
  </div>
  <div class="card-footer">
              <h3 class="card-title">${data.name}</h3>
              <div class="remove-favorite-btn">
                  <button type="button" class="remove-favourite"  movie-id=${data.id}>Remove to Favourite</button>
              </div>
 </div>
  `;
    link.append(card);
    cardWrapper.append(link);
    favCards.append(cardWrapper);
  })
};


// funtion for add favorite movie
function removeFavourite() {
  const favbtn = document.querySelectorAll('.remove-favorite-btn');
  for (let i = 0; i < favbtn.length; i++) {
    favbtn[i].addEventListener('click', (e) => {
      e.preventDefault();
      let id = e.target.getAttribute('movie-id');
      if (localStorage.getItem('movie-ids') !== null) {
        let ids = JSON.parse(localStorage.getItem('movie-ids'));
        let newMovies = ids.filter(val => val !== id);
        localStorage.setItem('movie-ids', JSON.stringify([...newMovies]));
        location.reload();
      }
    });
  }
};


getFavMovieIdsFromLocalStorage();