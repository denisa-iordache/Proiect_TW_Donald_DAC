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

function Home() {
  const user = "iFindAllBugs007";

  const [modalShow, setModalShow] = React.useState(false);

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
                  <button
                    type="button"
                    className="btn btn-info btn-lg"
                    data-toggle="modal"
                    data-target="#myModal"
                  >
                    Open Modal
                  </button>
                </td>
                <td>
                  <input
                    type="image"
                    className="icons"
                    src="https://cdn-icons.flaticon.com/png/512/2356/premium/2356780.png?token=exp=1641984823~hmac=421ba9fac1b52664281ba07707b2e045"
                  />
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>Multimedia</td>
                <td>Done</td>
                <td>
                  <input
                    type="image"
                    className="icons"
                    src="https://cdn-icons-png.flaticon.com/128/709/709612.png"
                  />
                </td>
                <td>
                  <input
                    type="image"
                    className="icons"
                    src="https://cdn-icons.flaticon.com/png/512/2356/premium/2356780.png?token=exp=1641984823~hmac=421ba9fac1b52664281ba07707b2e045"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
       {/* <!-- Modal --> */}
       <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
      <button>ADD PROJECT</button>
    </div>
    </React.Fragment>
  );
}

export default Home;
