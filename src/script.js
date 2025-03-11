const form = document.querySelector('form');
const inputField = document.getElementById("pokemon-name");
const img = document.querySelector('img');
const URL = 'https://pokeapi.co/api/v2/pokemon/';
const btn = document.querySelector('button');
const error = document.getElementById("error-message")

function getPokemonName() {
    const pokemonName = inputField.value.trim().toLowerCase();
    inputField.value = '';
    return pokemonName;
}

async function getPokemonSprite() {
    try {
        error.textContent = "";
        const pokemonName = getPokemonName();
        if (!pokemonName) {
            error.textContent = "Please enter a Pokemon name";
            return;
        }
        const response = await fetch(`${URL}${pokemonName}`);
        if (!response.ok) {
            error.textContent = "Pokemon not found";
            return;
            
        }
        const data = await response.json();
        const sprite = data.sprites.front_default;
        return sprite;
    } catch (err) {
        console.error(err);
        return;
    };

};

async function setPokemonSprite(e) {
    e.preventDefault();
    const sprite = await getPokemonSprite();
    img.src = sprite;
}


btn.addEventListener('click', setPokemonSprite);
