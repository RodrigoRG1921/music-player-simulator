import Form from 'react-bootstrap/Form'
import React, { useState } from 'react'
import { Button, Modal, FormControl, InputGroup,  } from "react-bootstrap";

export const AddModal = ({ handleClose, show, handleSubmitModal, song, handleChangeSong, playlists}) => {
  return (

      <Modal show={show} onHide={handleClose} style={{color: "black"}}> 
        <Modal.Header closeButton>
          <Modal.Title> Search for a song </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Song name</Form.Label>
              <Form.Control id="name" onChange={handleChangeSong} value={song.name}/>
            </Form.Group>
            <Form.Label>Song duration</Form.Label>
            <InputGroup className="mb-3">
               <FormControl placeholder="Time"
               aria-label="Recipient's username"
               aria-describedby="basic-addon2"
               id="durationMinutes"
               onChange={handleChangeSong}
               value={song.durationMinutes}
               />
               <InputGroup.Text id="basic-addon2">Minutes</InputGroup.Text>
             </InputGroup>
             <InputGroup className="mb-3">
               <FormControl placeholder="Time"
               aria-label="Recipient's username"
               aria-describedby="basic-addon2"
               id="durationSeconds"
               onChange={handleChangeSong}
               value={song.durationSeconds}
               />
               <InputGroup.Text id="basic-addon2">Seconds</InputGroup.Text>
             </InputGroup>
            <Form.Group className="mb-3">
              <Form.Label> Add to playlist </Form.Label>
              <Form.Select aria-label="Default select example" id="playlist" value={song.playlist}>
                <option id="Favorites" >All songs</option>
               /* {playlists.map((playlist) => (
                  <option id={playlist} key={playlist.id}>{playlist.name}</option>
                ))} */
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button >Close</Button>
          <Button onClick={handleSubmitModal}>Submit</Button>
        </Modal.Footer>
      </Modal>
    
  )
}
