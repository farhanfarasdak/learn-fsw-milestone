import { Component } from "react";

class Card extends Component{
  // Lifecycle
  state = {
    counter: 0,
    // isLoading: true,
    pokemonImg: '',
    pokemonName: '',
    pokemonList: []
  }

  increaseCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  async componentDidUpdate(){
    await this.handleSearchPokemon()
  }

  handleInputPokemon = async (e) => {
    const currentValue = e.target.value
    if(currentValue !== ""){
      let newList = []
      this.state.pokemonList.forEach( e => {
        if(e.includes(currentValue)){
          newList.push(e)
        }
      })

      this.setState({
        pokemonName: currentValue,
        pokemonList: newList
      })
    }
    else{
      const respPokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`)
      const dataPokemonList = await respPokemonList.json()

      let pokemonList = []
      dataPokemonList.results.forEach(e => {
        pokemonList.push(e.name)
      })
      
      this.setState({
        pokemonList: pokemonList
      })
    }
  }

  handleSearchPokemon = async () => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`)
    const data = await resp.json()

    this.setState({
      pokemonImg: data.sprites.front_default,
    })
  }

  reloadAllPokemon = async () => {
    const respPokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`)
    const dataPokemonList = await respPokemonList.json()

    let pokemonList = []
    dataPokemonList.results.forEach(e => {
      pokemonList.push(e.name)
    })

    this.setState({
      pokemonList: pokemonList
    })
  }

  async componentDidMount(){
    await this.reloadAllPokemon()
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`)
    const data = await resp.json()

    this.setState({
      pokemonImg: data.sprites.front_default,
    })
  }

  render(){
    const { name, address } = this.props
    const { counter, isLoading, pokemonImg, pokemonList } = this.state
    const { increaseCounter, handleInputPokemon, handleSearchPokemon } = this

    // if(isLoading === false){
      return(
        <div>
          {/* <h1>I am Card - {name} - {address} - {counter}</h1>
          <button onClick={increaseCounter}>Increase Counter</button> */}
          <input onChange={handleInputPokemon} placeholder="input pokemon name"/>
          {/* <button onClick={handleSearchPokemon}>Search Pokemon Image</button> */}
          { pokemonImg === '' ? (
            <img src="https://image.shutterstock.com/image-vector/september-23-2016-vector-icon-260nw-487367941.jpg" alt="POKEMON NAME"/>
          ):
          (
            <img src={pokemonImg} alt="POKEMON NAME"/>
          )
          }
          
          {
            pokemonList.map((e) => (<h1 key={e} >{e}</h1>))
          }
        </div>
      )
    // }else{
    //   return(
    //     <h1>LOADING...</h1>
    //   )
    // }
  }
}

export default Card