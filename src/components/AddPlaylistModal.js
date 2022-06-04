import React from 'react'
import Form from 'react-bootstrap/Form'
import { Button, Modal, FloatingLabel } from "react-bootstrap";

export const AddPlaylistModal = ({ show, handleClose, handleSubmitModal, handleChangePlaylist, playlist}) => {
  return (
    <Modal show={show} onHide={handleClose} style={{color: "black"}}> 
        <Modal.Header closeButton>
          <Modal.Title> Search for a song </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Playlist Name</Form.Label>
              <Form.Control id="name" onChange={handleChangePlaylist} value={playlist.name}/>
            </Form.Group>
            <FloatingLabel label="Add an optional description">
                <Form.Control 
                id="description"
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
                onChange={handleChangePlaylist}
                value={playlist.description}
                />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleSubmitModal(playlist)}>Submit</Button>
        </Modal.Footer>
      </Modal>
  )
}
