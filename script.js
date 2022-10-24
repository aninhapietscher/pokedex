var pokemons = []
var listPokemonContentElement = document.querySelector('.list-pokemon-content')
var offSet = 0

function fetchPokemons() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=${offSet}`)
        .then((resposta) => resposta.json())
        .then((resposta) => Promise.all(resposta.results.map((pokemon) =>
            fetch(pokemon.url)
                .then((resposta) => resposta.json())
                .then((resposta) => {
                    pokemons.push({
                        id: resposta.id,
                        name: resposta.name,
                        image: resposta.sprites.other.dream_world.front_default

                    })
                })
        )))
        .finally(() => listPokemonContentElement.innerHTML = exibePokemons())

}

function exibePokemons() {
    return pokemons.map((pokemon) => `
     <div class="card-pokemon"> 
        <img class ="card-pokemon-image" src=${pokemon.image} />
        <span class ="card-pokemon-id"> ${pokemon.id}</span>
        <strong class ="card-pokemon-name">${pokemon.name}</strong>
    </div>
    `).join('')
}

function loadMore() {
    offSet += 16
    fetchPokemons ()
}

fetchPokemons()