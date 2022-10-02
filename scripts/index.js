
const ts = 1;
const hash = CryptoJS.MD5(ts + "98ab300885209331e2dab3257d78477da33b2ffa" + "c97e1b74c79cd168d399bc7e230a5964");
const apiKey = "c97e1b74c79cd168d399bc7e230a5964";

async function fetchMarvals() {
    let res = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c97e1b74c79cd168d399bc7e230a5964&hash=${hash}`)
    let data = await res.json();
    return data;
}



(async function fetchCharacter() {
    let result = await fetchMarvals();
    createCharateCard(result.data.results);
    AddFavourite()
})();

function createCharateCard(characters) {
    const characterContainer = document.getElementById("characters");
    characters.forEach(data => {
        // console.log(data);
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
                    <div class="add-favorite-btn">
                        <button type="button" class="add-favourite"  movie-id=${data.id}>Add to Favourite</button>
                    </div>
                    </div>
        `;
        link.append(card);
        cardWrapper.append(link);
        characterContainer.append(cardWrapper);
    });
    getCardList();
};




function getCardList() {
    const cardList = document.querySelector('#characters').children;
    for (var i = 0; i < cardList.length; i++) {
        cardList[i].addEventListener('click', (e) => {
            let id = e.target.parentElement.parentElement.getAttribute('id');
        })
    }
}

const searchForm = document.getElementById('searchForm');
const search = document.getElementById('search');
const characterContainer = document.getElementById("characters");
const searchResultContainer = document.getElementById("serach-result");



async function searchInput(value) {
    if (value === '') {
        searchResultContainer.style.transform = 'translateY(-350px)';
        searchResultContainer.style.transition = 'transform .1s linear';
        searchResults = document.querySelectorAll('.card-list-item');
        while (searchResultContainer.firstChild) {
            searchResultContainer.removeChild(searchResultContainer.lastChild);
        }
        return;
    }
    else {
        let result = await fetchMarvals();
        const characters = result.data.results;
        let matchCharacter = characters.filter(character => {
            const regex = new RegExp(`^${value}`, 'gi');
            return character.name.match(regex);
        });

        if (matchCharacter) {
            searchResultContainer.style.transform = 'translateY(0px)';
            searchResultContainer.style.transition = 'transform .1s linear';
            matchCharacter.forEach(data => {
                let img = data.thumbnail;
                let src = `${img.path}.${img.extension}`
                let link = document.createElement('a');
                let card = document.createElement('div');

                link.setAttribute('href', `details.html?id=${data.id}`);
                link.className = "card-list-item"
                card.id = `${data.id}`;
                card.className = 'character-card';
                card.innerHTML = `
                <div class="card-body" height="200px" style="object-fit : contain">
                    <img src=${src} alt="thumbnail" width="100%"/>
                </div>
                <div class="card-footer">
                  <h3 class="card-title">${data.name}</h3>
                  <div class="add-favorite-btn">
                     <button type="button" class="add-favourite"  movie-id=${data.id}>Add to Favourite</button>
                  </div>
                </div>
                `;
                link.append(card);
                searchResultContainer.append(link);
            });
        }

    }
}

// funtion for add favorite movie
function AddFavourite() {
    const favbtn = document.querySelectorAll('.add-favorite-btn');
    for(let i = 0; i < favbtn.length; i++) {
      favbtn[i].addEventListener('click' , (e) => {
        e.preventDefault();
        let id = e.target.getAttribute('movie-id');
        if(localStorage.getItem('movie-ids') === null) {
            localStorage.setItem('movie-ids', JSON.stringify([id]));
        }
        else {
            let prevIds = JSON.parse(localStorage.getItem('movie-ids'));
            localStorage.setItem("movie-ids" , JSON.stringify([...prevIds , id]));
        }
      });
    }
  };

search.addEventListener('input', () => searchInput(search.value));