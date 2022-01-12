import React from "react";
import '../css/Homepage.css'

import { useState } from "react";

import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
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
                <th>View</th>
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
                        View
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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default TesterHome;
