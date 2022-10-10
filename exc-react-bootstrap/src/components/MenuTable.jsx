import { Component } from "react";
import { Button, Container, Table } from 'react-bootstrap';

class MenuTable extends Component{
  render(){
    return(
      <div className="menu-table">
        <Container>
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
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
                      <Button variant="danger" onClick={ () => { this.props.deleteFunc(menu.id) } }>DELETE</Button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Container>
      </div>
    )
  }
}

export default MenuTable