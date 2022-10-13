import React from "react";
import Axios from "axios";
import "../css/Homepage.css";
import "./LoginComponent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

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
        <div>Nume Proiect:</div>
        <input type="text"></input>
        <div>Status Proiect - </div>
        <input type="text"></input>
        <div>Link Repo - </div>
        <input type="text"></input>
        <div>Membri - </div>
        <input type="text"></input>
        <input type="text"></input>
        <input type="text"></input>
        <input type="text"></input>
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

function ModalAddProject(props) {
  const [projectNameReg, setprojectNameReg] = useState("");
  const [statusReg, setStatusReg] = useState("");
  const [LinkReg, setLinkReg] = useState("");

  const addProject = () => {
    Axios.post("http://localhost:8080/projectsFront", {
      nume_proiect: projectNameReg,
      status_proiect: statusReg,
      link_repository: LinkReg,
    }).then((response) => {
      console.log(response.data);
    });
  };

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
        <div>Nume Proiect:</div>
        <input
          type="text"
          onChange={(e) => {
            setprojectNameReg(e.target.value);
          }}
        ></input>
        <div>Status Proiect: </div>
        <input
          type="text"
          placeholder="Deschis / In testare / Inchis"
          onChange={(e) => {
            setStatusReg(e.target.value);
          }}
        ></input>
        <div>Link Repo: </div>
        <input
          type="text"
          onChange={(e) => {
            setLinkReg(e.target.value);
          }}
        ></input>
        <div>Membri:</div>
        <input type="text"></input>
        <input type="text"></input>
        <input type="text"></input>
        <input type="text"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addProject}>Save</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Home() {
  const user = "iFindAllBugs007";

  const [modalShowViewProject, setModalShowViewProject] = React.useState(false);
  const [modalShowEditProject, setModalShowEditProject] = React.useState(false);
  const [modalShowAddProject, setModalShowAddProject] = React.useState(false);
  const [modalShowBugs, setModalShowBugs] = React.useState(false);
  function creareCelulaTabel(celula, continut_celula) {
    //functia folosita la popularea celulelor cu valorile indicatorilor
    let continut_paragraf = document.createTextNode(continut_celula); //creez continutul pe care vreau sa il am in celula
    celula.appendChild(continut_paragraf); //adaug continutul in celula
  }
  function getProj() {
    Axios.get("http://localhost:8080/projectsFront").then((response) => {
      let tabel = document.getElementById("table");
      let tbody = document.querySelector("#tbody");
      // let td = document.createElement("td");
      //let unique = response.data.length.filter((item, i, ar) => ar.indexOf(item) === i);
      const uniqueArr = [... new Set(response.data.map(data => data))]
      for (let i = 0; i < uniqueArr.length; i++) {
        let tr = document.createElement("tr");
        tbody.appendChild(tr);

        let th = document.createElement("th");
        th.textContent = uniqueArr[i].nume_proiect;
        th.setAttribute("scope", "row");
        tr.appendChild(th);
        let td2 = document.createElement("td");
        td2.textContent = uniqueArr[i].status_proiect;
        tr.appendChild(td2);
        let td3 = document.createElement("td");
        td3.textContent = "Editeaza proiect";
        tr.appendChild(td3);
        let td4 = document.createElement("td");
        td4.textContent = uniqueArr[i].status_proiect;
        tr.appendChild(td4);
        //let td2 = document.createElement("td");
        // let button = document.createElement("button");
        // button.textContent="Editeaza proiect";
        // button.onclick=()=>{setModalShowViewProject(true)}
        // button.addEventListener("click", function(){
        //   setModalShowViewProject(true)
        // })
        // td2.appendChild(button)
        //tr.appendChild(td2);
        // // td2.textContent = (
        // //   <Button
        // //     variant="primary"
        // //     onClick={() => setModalShowViewProject(true)}
        // //   >
        // //     Vizualizeaza detalii
        // //   </Button>
        // // );
        // tr.appendChild(td2);
      }
    });
  }

  function logg() {
    const element = document.querySelector("#div1");
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

  return (
    <React.Fragment>
      <div className="homepage">
        <div id="div1">{logg()}</div>
        <Button variant="primary" onClick={() => setModalShowAddProject(true)}>
          Adauga un proiect
        </Button>
        <Link to="/login">
          <Button variant="primary" onClick={logout}>
            Logout
          </Button>
        </Link>
        {/* <Button variant="primary" onClick={logg()}>
          Get un proiect
        </Button> */}
        <section>
          <h1>Proiectele in care sunteti implicat</h1>
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
                <th>Editare</th>
                <th>Bug-uri</th>
              </tr>
            </thead>
            <tbody id="tbody" class="tbl-content">
              <tr>
                <td>Proiect 1</td>
                <td>Deschis</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setModalShowEditProject(true)}
                  >
                    Editeaza proiect
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setModalShowBugs(true)}
                  >
                    Vizualizeaza bug-uri
                  </Button>
                </td>
              </tr>
              <tr>
                <td>Proiect 2</td>
                <td>Deschis</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setModalShowEditProject(true)}
                  >
                    Editeaza proiect
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => setModalShowBugs(true)}
                  >
                    Vizualizeaza bug-uri
                  </Button>
                </td>
              </tr>
              {getProj()}
            </tbody>
          </table>
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
        {/* <button variant="primary" onClick={() => setModalShowAddProject(true)}>
          ADD PROJECT
        </button> */}
        <ModalAddProject
          show={modalShowAddProject}
          onHide={() => setModalShowAddProject(false)}
        />
        <ModalViewBugs
          show={modalShowBugs}
          onHide={() => setModalShowBugs(false)}
        />
      </div>
    </React.Fragment>
  );
}

export default Home;
