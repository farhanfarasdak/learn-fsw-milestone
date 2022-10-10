import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Component } from "react";

class ModalInsertMenu extends Component{
  state = {
    name: '',
    desc: '',
    price: ''
  }

  handleSubmit = async () => {
    const data = {
      name: this.state.name,
      description: this.state.desc,
      price: this.state.price
    }

    const resp = await fetch('http://localhost:7070/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if(resp.status === 201){
      this.props.toggleFunc()
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  render(){
    return(
      <Modal show={this.props.showModal} onHide={this.props.toggleFunc}>
        <Modal.Header closeButton>
          <Modal.Title>New Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="name..."
              aria-label="name"
              aria-describedby="basic-addon1"
              id="name"
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Desc</InputGroup.Text>
            <Form.Control
              placeholder="Description..."
              aria-label="Description"
              aria-describedby="basic-addon1"
              id="desc"
              onChange={this.handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
            <Form.Control
              placeholder="Price..."
              aria-label="Price"
              aria-describedby="basic-addon1"
              id="price"
              onChange={this.handleChange}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalInsertMenu