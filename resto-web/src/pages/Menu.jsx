import { Component } from 'react';
import MenuTable from '../components/MenuTable';
import EditModal from '../components/EditModal';

class Menu extends Component{
  state={
    menus: [],
    showModal: false,
    name: '',
    description: '',
    price: 0,
    id: 0
  }

  setEditMenu = (menu) => {
    this.setState({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      id: menu.id
    })
    this.toggleModal()
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleSubmitEdit = async () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price
    }

    const resp = await fetch(`http://localhost:7070/menu/${this.state.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(resp.status === 202){
      this.toggleModal()
      this.getAllMenu()
    }
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  getAllMenu = async () => {
    const resp = await fetch('http://localhost:7070/menu')
    const data = await resp.json()
    
    this.setState({
      menus: data
    })
  }
  
  componentDidMount(){
    this.getAllMenu()
  }

  render(){
    return(
      <div>
        <MenuTable 
          menus={this.state.menus}
          editFunc={ (menu) => { this.setEditMenu(menu)} }
          />

        <EditModal 
          showModal={this.state.showModal}
          name={this.state.name}
          description={this.state.description}
          price={this.state.price}
          toggleModal={this.toggleModal}
          onChangeFunc={this.handleOnChange}
          submitEditFunc={this.handleSubmitEdit}
        />
      </div>
    )
  }
}

export default Menu

