import { Component } from "react";
import MenuTable from "../components/MenuTable";
import Button from 'react-bootstrap/Button';
import { Container } from "react-bootstrap";
import ModalInsertMenu from "../components/ModalInsertMenu";

class Home extends Component{
  state = {
    menus: [],
    showModal: false
  }

  getMenuData = async () => {
    const resp = await fetch('http://localhost:7070/menu')
    const data = await resp.json()
    this.setState({
      menus: data
    })
  }

  handleDelete = async (id) => {
    const resp = await fetch(`http://localhost:7070/menu/${id}`, {
      method: 'DELETE'
    })
    console.log(resp)
    if(resp.status === 202){
      this.getMenuData()
    }
  }

  componentDidMount(){
    this.getMenuData()
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
    this.getMenuData()
  }

  render(){
    return(
      <div>
        <MenuTable menus={this.state.menus} deleteFunc={this.handleDelete}/>

        <Container>
          <Button variant="success" onClick={this.toggleModal}>NEW MENU</Button>
        </Container>

        <ModalInsertMenu 
          showModal={this.state.showModal}
          toggleFunc={this.toggleModal}
          />
      </div>
    )
  }
}

export default Home