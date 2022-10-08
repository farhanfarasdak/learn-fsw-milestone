import { Component } from "react";

class MenuTable extends Component{
  render(){
    return(
      <div className="table-section">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Desc</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            { 
            this.props.menus.map((menu) => (
              <tr key={menu.id}>
                <td>{menu.name}</td>
                <td>{menu.description}</td>
                <td>{menu.price}</td>
                <td>
                  <button className="btn btn-primary" 
                    onClick={() => { this.props.editFunc(menu) }}>UPDATE</button>
                  <button className="btn btn-danger m-1" 
                    onClick={() => { this.props.deleteFunc(menu.id) }}>DELETE</button>
                </td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default MenuTable