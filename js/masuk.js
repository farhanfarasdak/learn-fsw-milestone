const URL_API_POKEMON = "https://pokeapi.co/api/v2/pokemon"
const URL_PRODUCTS = "http://localhost:3000"
const URL_LOGIN = "http://localhost:3000/login"

const getPokemonData = async () => {
  const resp = await fetch(URL_API_POKEMON)
  const data = await resp.json()
  return data.results
}

const getProducts = async () => {
  const resp = await fetch(URL_PRODUCTS)
  const data = await resp.json()
  return data
}

const displayPokemon = async () => {
  let div = document.getElementById("pokemon-list")
  let data = await getPokemonData()
  console.log(data)
  for(let i = 0; i < data.length; i++){
    let h1 = document.createElement("h1")
    h1.innerText = data[i].name
    div.append(h1)
  }
}

const authorizer = async () => {
  const myPassword = document.getElementById("my-password").value
  console.log(myPassword)
  const resp = await fetch(URL_LOGIN, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: myPassword
    })
  })
  // unauthorized
  if(resp.status === 401){
    alert("SALAH PASSWORD OM!")
  }else{
    alert("PASSWORD BETUL")
    window.location.replace("sudah-masuk")
  }
}

displayPokemon()