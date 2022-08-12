const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.use('/css', express.static(__dirname+'/css'))
app.use('/js', express.static(__dirname+'/js'))


app.get('/', (req,res)=> {
  res.send("Hellow World")
})

app.get('/pokedex', async (req,res)=> {
  let pokemonList = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
  let resultBody = await pokemonList.json()
  res.render('pokedex', { pokemons: resultBody.results })
})

app.get('/pokemon', async (req,res)=> {
  // query params
  let pokemonName = req.query.name
  let pokemonDetail = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  let resultBody = await pokemonDetail.json()
  res.render('pokemon', { pokemon: resultBody})
})

app.listen(4000, () => {
  console.log("Application is running at localhost:4000")
})