import MenuTable from "../components/MenuTable";

const { Component } = require("react");

class Menu extends Component{
  state = {
    menus: [],
    menuName: '',
    menuDesc: '',
    menuPrice: 0,
    isInsert: true,
    activeId: ''
  }

  retrieveAllMenus = async () => {
    const resp = await fetch('http://localhost:7070/menu')
    const data = await resp.json()

    this.setState({
      menus: data
    })
  }

  submitNewMenus = async () => {
    // TODO INSERT DATA
    const data = {
      name: this.state.menuName,
      description: this.state.menuDesc,
      price: this.state.menuPrice
    }

    const resp = await fetch('http://localhost:7070/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(resp.status === 201){
      this.retrieveAllMenus()
      this.setState({
        menuName: '',
        menuDesc: '',
        menuPrice: 0
      })
    }
  }

  componentDidMount(){
    this.retrieveAllMenus()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  toggleEdit = (menu) => {
    this.setState({
      menuName: menu.name,
      menuDesc: menu.description,
      menuPrice: menu.price,
      isInsert: false,
      activeId: menu.id
    })
  }

  submitEdit = async () => {
    const data = {
      name: this.state.menuName,
      description: this.state.menuDesc,
      price: this.state.menuPrice
    }

    const resp = await fetch(`http://localhost:7070/menu/${this.state.activeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(resp.status === 202){
      this.retrieveAllMenus()
      this.setState({
        menuName: '',
        menuDesc: '',
        menuPrice: 0,
        isInsert: true
      })
    }
  }

  submitDelete = async (id) => {
    console.log('DELETE BUTTON!', id)
    const resp = await fetch(`http://localhost:7070/menu/${id}`,{
      method: 'DELETE'
    })
    if(resp.status === 202){
      this.retrieveAllMenus()
    }
  }

  render(){
    return(
      <div>
        {/* BEGIN FORM */}
        <div className="input-section">
          <div className="form-group">
            <input 
              id="menuName" 
              onChange={this.handleChange} 
              className="form-control" 
              placeholder="Menu Name..."
              value={this.state.menuName}/>
          </div>
          <div className="form-group">
            <input 
              id="menuDesc" 
              onChange={this.handleChange} 
              className="form-control" 
              placeholder="Description..."
              value={this.state.menuDesc}/>
          </div>
          <div className="form-group">
            <input 
              id="menuPrice" 
              onChange={this.handleChange} 
              className="form-control" 
              placeholder="Price..."
              value={this.state.menuPrice}/>
          </div>
          {
            this.state.isInsert === true ? (
              <button type="submit" className="btn btn-primary" onClick={this.submitNewMenus}>Submit</button>
            ) : (
              <button type="submit" className="btn btn-warning" onClick={this.submitEdit}>Edit</button>
            )
          }
        </div>
        {/* END OF FORM */}

        <MenuTable 
          menus={this.state.menus} 
          editFunc={ (menu) => { this.toggleEdit(menu) } }
          deleteFunc={(id) => { this.submitDelete(id) } }
          />

      </div>
    )
  }
}

export default Menu