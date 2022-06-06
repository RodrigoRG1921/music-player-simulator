import React from 'react'
import { Button, Modal, Form, InputGroup,  } from "react-bootstrap";
import { useState  } from 'react'

export const AddSongToPlaylistModal = ({playlists, show, handleClose, handleSubmit}) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({})
  

  return (
    <Modal show={show} onHide={handleClose} style={{color: "black"}}> 
        <Modal.Header closeButton>
          <Modal.Title> Add to playlist </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label> Add to playlist </Form.Label>
              <Form.Select
                value={selectedPlaylist}
                aria-label="Default select example"
                id="playlist" 
                onChange={(e) => setSelectedPlaylist(e.target.value)} >
                {playlists.map((playlist) => (
                    <option key={playlist.id} value={playlist.id} >{playlist.name}</option> 
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} >Close</Button>
          <Button onClick={() => handleSubmit(selectedPlaylist)} >Submit</Button>
        </Modal.Footer>
      </Modal>
  )
}
