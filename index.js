// Callback


// setTimeout(

//   () => { 
//     console.log("HEHE") 
//     console.log("HIHI")
//   }, // this is callback
  
//   2000
// )

// $(".button").click(
//   () => {
//     console.log("I am clicked")
//   }
// )

// const fs = require('fs')

// fs.readFile('./test.txt', { encoding: 'utf-8'}, (err, data) => {
//   if(err){
//     console.log(err)
//   }else{
//     setTimeout(
//       () => {
//         setTimeout(
//           () => {
//             setTimeout(
//               () => {
//                 console.log("wow")
//               },
//               1000
//             )
//           },
//           1000
//         )
//       },
//       2000
//     )
//   }
  
// } )
// console.log("HEHE")

// callback hell




// Promise
// resolve - reject

// const myPromise = new Promise((resolve, reject) => {
//   const random = Math.floor(Math.random() * 2) // 0 - 1
//   if(random === 0){
//     resolve(`Resolved With Value ${random}`)
//   }else{
//     reject(`Rejected with Value ${random}`)
//   }
// })

// myPromise
//   .then( (a) => { console.log(`THEN - ${a}`) } )
//   .catch( (b) => { console.log(`CATCH - ${b}`) } )


// const fs = require('fs')

// fs.promises.readFile('./test.txt', { encoding: 'utf-8' })
//   .then( (data) => { console.log(data) })
//   .catch( (error) => { console.log(error) })

// fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//   .then( (resp) => {
//     resp.json()
//     .then( (data) => {
//       console.log(data)
//     })
//   })
//   .catch( (err) => {
//     console.log('WITHIN CATCH')
//     console.log(err)
//   })


// Async - Await

// const fs = require('fs')

// const loadData = async () => {
//   const data = await fs.promises.readFile('./test.txt', {encoding: 'utf-8'})
//   console.log(data)
// }

// loadData()

// const getPokemonData = async () => {
//   const pokemonData = await fetch('https://pokeapi.co/api/v2/pokemon/ditto')
//   const bodyResponse = await pokemonData.json()
//   console.log(bodyResponse)
// }

// getPokemonData()

