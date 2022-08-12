$(".my-row").on("click", async (element) => {
  let pokemonName = element.target.innerText
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  let getPokemonDetail = await fetch(url)
  let getPokemonDetailBody = await getPokemonDetail.json()
  
  let pokeImgUrl = getPokemonDetailBody.sprites.front_default
  // $(element.target).css("background", "grey")
  // document.getElementById("pokemon-img").src = pokeImgUrl
  $("#pokemon-img").attr("src", pokeImgUrl)

  $("#pokemon-name").text(pokemonName)

  $("#pokemon-detail-link").attr("href", `/pokemon?name=${pokemonName}`)
})