import React from "react";
import "../css/Homepage.css";
import Select from "react-select";

import { useState } from "react";

import Axios from "axios";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function ModalAddBug(props) {
  const [severiatateReg, setseveriatateReg] = useState("");
  const [prioritateReg, setRIORITATEReg] = useState("");
  const [descriereReg, setDescriereReg] = useState("");
  const [linkReg, setlinkReg] = useState("");
  const [projectNameReg, setprojectNameReg] = useState("");
  const [statusReg, setstatusReg] = useState("");
  const [linkrezReg, setlinkrezReg] = useState("");

  const addBug = () => {
    Axios.post("http://localhost:8080/bugs", {
      severitate: severiatateReg,
      prioritate_de_rezolvare: prioritateReg,
      descriere: descriereReg,
      link_commit_bug: linkReg,
      nume_proiect: projectNameReg,
      status_rezolvare: statusReg,
      link_commit_rezolvare: linkrezReg,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const options = [
    { value: "Nepreluat", label: "Nepreluat" },
    { value: "Preluat", label: "Preluat" },
  ];

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
        <div>Nume proiect - </div>
        <input
          type="text"
          onChange={(e) => {
            setprojectNameReg(e.target.value);
          }}
        ></input>
        <div>Severitate - </div>
        <input
          type="text" placeholder="Mica / Minora / Majora / Critica"
          onChange={(e) => {
            setseveriatateReg(e.target.value);
          }}
        ></input>
        <div>Prioritate de rezolvare - </div>
        <input
          type="text"  placeholder="Mica / Medie / Mare"
          onChange={(e) => {
            setRIORITATEReg(e.target.value);
          }}
        ></input>
        <div>Descriere - </div>
        <input
          type="text"
          onChange={(e) => {
            setDescriereReg(e.target.value);
          }}
        ></input>
        <div>Link commit - </div>
        <input
          type="text"
          onChange={(e) => {
            setlinkReg(e.target.value);
          }}
        ></input>
        <div>Status rezolvare - </div>
        <input
          type="text" placeholder="Preluat / Nepreluat"
          onChange={(e) => {
            setstatusReg(e.target.value);
          }}
        ></input>
        {/* <Select
          defaultValue={statusReg}
          onChange={
            setstatusReg}
          options={options}
        /> */}
        <div>Link commit rezolvare- </div>
        <input
          type="text"
          onChange={(e) => {
            setlinkrezReg(e.target.value);
          }}
        ></input>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
        <Button onClick={addBug}>Save</Button>
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
        <div>Nume proiect - </div>
        <input type="text"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

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
        <div>Membri - </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function ModalViewBugs(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal"
      style={{}}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Vizualizare bug-uri
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <div class="modal-body">
        <table>
          <thead></thead>
          <tbody class="table">
            <tr>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>3</td>
              <td>4</td>
            </tr>
          </tbody>
        </table>
        </div> */}
        <div>Severitate - </div>
        <div>Prioritate de rezolvare - </div>
        <div>Descriere - </div>
        <div>Link commit - </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function TesterHome() {
  const user = "iFindAllBugs007";

  const [modalShowViewProject, setModalShowViewProject] = React.useState(false);
  const [modalShowBugs, setModalShowBugs] = React.useState(false);
  const [modalaDDBugs, setModalShowAddBug] = React.useState(false);

  function logg() {
    const element = document.querySelector("#div2");
    Axios.get("http://localhost:8080/studentslogin").then((response) => {
      if (response.data.loggedIn == true) {
        element.innerHTML =
          "Bine ai revenit, " + response.data.student.username + "!";
      }
    });
  }

  const logout = () => {
    localStorage.clear();
  };

  function getProj() {
    Axios.get("http://localhost:8080/projects").then((response) => {
      let tabel = document.getElementById("table");
      let tbody = document.querySelector("#tbody");
      let td = document.createElement("td");
      for (let i = 0; i < response.data.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        let th = document.createElement("th");
        th.textContent = response.data[i].nume_proiect;
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        let td2 = document.createElement("td");
        td2.textContent = response.data[i].status_proiect;
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        let a= document.createElement("a");
        a.setAttribute('href', response.data[i].link_repository);
        a.textContent="Catre GitHub"
        td3.appendChild(a)
        // td3.textContent = a
        tr.appendChild(td3);
      }
    });
  }

  return (
    <div className="homepage">
      <div id="div2">{logg()}</div>
      <Button variant="primary" onClick={() => setModalShowAddBug(true)}>
        Adauga un bug
      </Button>
      <Link to="/login">
        <Button variant="primary" onClick={logout}>
          Logout
        </Button>
      </Link>
      <section>
        <h1>Lista proiectelor disponibile</h1>
        <table
            cellpadding="0"
            cellspacing="0"
            border="0"
            class="table-sm"
            class="table-bordered"
            id="table"
          >
            <thead class="tbl-header">
              <tr>
                <th>Nume Proiect</th>
                <th>Status</th>
                <th>Link repository</th>
              </tr>
            </thead>
            <tbody id="tbody" class="tbl-content">
              {getProj()}
            </tbody>
          </table>
      </section>
      {/* <ModalAddBug show={modalShow} onHide={() => setModalShow(false)} /> */}
      <ModalViewProject
        show={modalShowViewProject}
        onHide={() => setModalShowViewProject(false)}
      />
      <ModalViewBugs
        show={modalShowBugs}
        onHide={() => setModalShowBugs(false)}
      />
      <ModalAddBug
        show={modalaDDBugs}
        onHide={() => setModalShowAddBug(false)}
      />
    </div>
  );
}

export default TesterHome;
