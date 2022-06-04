import React from 'react'
import { Button, Modal, Form, InputGroup,  } from "react-bootstrap";

export const AddSongToPlaylistModal = ({playlists, show, handleClose, handleSubmit}) => {
  return (
    <Modal show={show} onHide={handleClose} style={{color: "black"}}> 
        <Modal.Header closeButton>
          <Modal.Title> Add to playlist </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label> Add to playlist </Form.Label>
              <Form.Select aria-label="Default select example" id="playlist">
                <option id="Favorites" >All songs</option>
                {playlists.map((playlist) => (
                    <option>{playlist.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} >Close</Button>
          <Button onClick={handleSubmit} >Submit</Button>
        </Modal.Footer>
      </Modal>
  )
}
