import { Table, Container, Button } from 'react-bootstrap';

const MenuTable = (props) => {
  return(
    <div className='table-section'>
      <Container>
        <Table striped bordered hover variant="dark">
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
              props.menus.map(menu => (
                <tr key={menu.id}>
                  <td>{menu.name}</td>
                  <td>{menu.description}</td>
                  <td>{menu.price}</td>
                  <td>
                    <Button variant="success" onClick={() => { props.editFunc(menu) }}>
                      EDIT
                    </Button>
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

export default MenuTable