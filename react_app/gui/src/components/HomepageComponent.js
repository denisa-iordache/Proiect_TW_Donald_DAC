import React from "react";
import "../css/Homepage.css";
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
          Vizualizare proiect
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Nume Proiect</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <div>Status Proiect - </div>
        <div>Link Repo - </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Home() {
  const user = "iFindAllBugs007";

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowAddProject, setModalShowAddProject] = React.useState(false);

  return (
  <React.Fragment>
    <div className="homepage">
      <div>Welcome, dear {user}!</div>
      <section>
        <h1>Proiectele in care sunteti implicat</h1>
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nume Proiect</th>
                <th>Status</th>
                <th>View</th>
                <th>Edit</th>
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
                <td>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        View
                     </Button>
                </td>
                <td>
                    <Button variant="primary" onClick={() => setModalShow(true)}>
                        Edit
                    </Button>
                </td>
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
                <td>
                  <Button variant="primary" onClick={() => setModalShow(true)}>
                     Edit
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
       {/* <!-- Modal --> */}
       <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
      <button variant="primary" onClick={() => setModalShowAddProject(true)}>ADD PROJECT</button>
      <MyVerticallyCenteredModal
        show={modalShowAddProject}
        onHide={() => setModalShowAddProject(false)}
      />
    </div>
    </React.Fragment>
  );
}

export default Home;
