import React from "react";
import "../css/Homepage.css";
import { useState } from "react";

import {Button} from 'react-bootstrap';
import {Modal} from 'react-bootstrap';

function ModalViewProject(props) {
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
        <h4>Nume Proiect:</h4>
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

function ModalEditProject(props) {
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
      <h4>Nume Proiect:</h4> 
        <input type="text"></input>
        <div>Status Proiect - </div>
        <input type="text"></input>
        <div>Link Repo - </div>
        <input type="text"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalAddProject(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Adaugati un proiect
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Nume Proiect:</h4> 
        <input type="text"></input>
        <div>Status Proiect - </div>
        <input type="text"></input>
        <div>Link Repo - </div>
        <input type="text"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Home() {
  const user = "iFindAllBugs007";

  const [modalShowViewProject, setModalShowViewProject] = React.useState(false);
  const [modalShowEditProject, setModalShowEditProject] = React.useState(false);
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
                    <Button variant="primary" onClick={() => setModalShowViewProject(true)}>
                        View
                     </Button>
                </td>
                <td>
                    <Button variant="primary" onClick={() => setModalShowEditProject(true)}>
                        Edit
                    </Button>
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>Multimedia</td>
                <td>Done</td>
                <td>
                  <Button variant="primary" onClick={() => setModalShowViewProject(true)}>
                     View
                  </Button>
                </td>
                <td>
                  <Button variant="primary" onClick={() => setModalShowEditProject(true)}>
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
      <ModalViewProject
        show={modalShowViewProject}
        onHide={() => setModalShowViewProject(false)}
      />
      <ModalEditProject
        show={modalShowEditProject}
        onHide={() => setModalShowEditProject(false)}
      />
      </>
      <button variant="primary" onClick={() => setModalShowAddProject(true)}>ADD PROJECT</button>
      <ModalAddProject
        show={modalShowAddProject}
        onHide={() => setModalShowAddProject(false)}
      />
    </div>
    </React.Fragment>
  );
}

export default Home;
