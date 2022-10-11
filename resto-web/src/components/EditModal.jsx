import { Button, Modal, InputGroup, Form } from 'react-bootstrap';

const EditModal = (props) => {
  return(
    <div className='modal-section'>
      <Modal show={props.showModal} onHide={props.toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
            <Form.Control
              placeholder="Menu name..."
              defaultValue={props.name}
              onChange={props.onChangeFunc}
              id="name"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Desc</InputGroup.Text>
            <Form.Control
              placeholder="Menu description..."
              defaultValue={props.description}
              onChange={props.onChangeFunc}
              id="description"
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Price</InputGroup.Text>
            <Form.Control
              placeholder="Menu price..."
              defaultValue={props.price}
              onChange={props.onChangeFunc}
              id="price"
            />
          </InputGroup>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.submitEditFunc}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditModal