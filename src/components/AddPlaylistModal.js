import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import { Button, Modal, FloatingLabel } from "react-bootstrap";

const AddPlaylistModal = ({
  show,
  handleClose,
  handleSubmitModal,
  title
}) => {
  const [playlist, setPlaylist] = useState({ name: '', description: '' })

  const handleOnChange = ({ target }) => {
    const { id, value } = target
    setPlaylist({ ...playlist, [id]: value})
  }

  return (
    <Modal show={ show } onHide={ handleClose } style={{ color: "black" }}> 
      <Modal.Header closeButton>
        <Modal.Title> { title } </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Playlist Name</Form.Label>
            <Form.Control id='name' onChange={ handleOnChange } value={ playlist.name }/>
          </Form.Group>
          <FloatingLabel controlId="floatingTextarea2" label="Add an optional description">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: '100px' }}
              value={ playlist.description }
              onChange={ handleOnChange }
              id="description" />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={ () => handleSubmitModal(playlist) }>Submit</Button>
      </Modal.Footer>
    </Modal>
  )
}

AddPlaylistModal.propTypes = {
  title: PropTypes.string,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmitModal: PropTypes.func
}

AddPlaylistModal.defaultProps = {
  title: 'Search for a song'
}

export default AddPlaylistModal