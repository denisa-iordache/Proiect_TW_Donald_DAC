import React from "react";
import '../css/Homepage.css'

import { useState } from "react";

import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';

function ModalAddBug(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Adaugare bug
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h4>Nume Proiect:</h4> 
        <div>Severitate - </div>
        <input type="text"></input>
        <div>Prioritate de rezolvare - </div>
        <input type="text"></input>
        <div>Descriere - </div>
        <input type="text"></input>
        <div>Link commit - </div>
        <input type="text"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalAddBugs(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editare proiectul
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Severitate:</h4>
        <input type="text"></input>
        <div>Prioritate de rezolvare - </div>
        <input type="text"></input>
        <div>Descriere - </div>
        <input type="text"></input>
        <div>Link Commit - </div>
        <input type="text"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function TesterHome() {
  const user = "iFindAllBugs007";

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="homepage">
      <div>Welcome, dear {user}!</div>
      <section>
        <h1>Proiectele pe care puteti testa</h1>
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nume Proiect</th>
                <th>Status</th>
                <th>Add Bug</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td>01</td>
                <td>Tehnologii Web</td>
                <td>In Progress</td>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                        Add
                </Button>
              </tr>
              <tr>
                <td>02</td>
                <td>Multimedia</td>
                <td>Done</td>
                <td>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                        View
                </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <ModalAddBug
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default TesterHome;
