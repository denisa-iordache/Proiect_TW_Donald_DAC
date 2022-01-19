import React from "react";
import Axios from "axios";
import "../css/Homepage.css";
import "./LoginComponent";
import { useEffect, useState } from "react";

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
        <h4>Nume Proiect:</h4>
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
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Vizualizare bug-uri
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <h4>Nume Proiect:</h4>
        <input
          type="text"
          onChange={(e) => {
            setprojectNameReg(e.target.value);
          }}
        ></input>
        <div>Status Proiect - </div>
        <input
          type="text"
          onChange={(e) => {
            setStatusReg(e.target.value);
          }}
        ></input>
        <div>Link Repo - </div>
        <input
          type="text"
          onChange={(e) => {
            setLinkReg(e.target.value);
          }}
        ></input>
        <h4>Membri:</h4>
        <input type="text"></input>
        <input type="text"></input>
        <input type="text"></input>
        <input type="text"></input>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addProject}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

// Axios.defaults.withCredentials = true;

// function studentAuthenticated(){
//   useEffect(() => {
//     Axios.get("http://localhost:8080/studentslogin").then((response) => {
//       if (response.data.loggedIn == true) {
//         let user = response.data.student.username;
//       }
//     });
//   }, []);

//   Axios.get("http://localhost:8080/studentAuth", {
//     headers: {
//       "x-access-token": localStorage.getItem("token"),
//     },
//   }).then((response) => {
//     console.log(response);
//   });
// };

// function getProiecte(){

//   const response  = Axios.get("http://localhost:8080/projectsFront").data
//   response.map(item =>{
//     return (
//       <tr key={item.id}>
//         <td>{ item.nume_proiect }</td>
//         {/* <td>{ item.lastname }</td>
//         <td>{ item.password }</td>
//         <td>{ item.email }</td> */}
//       </tr>
//     )
//   })
//   // return(
//   //   <>
//   //   {
//   //     response.data.map(e=><div key={e.id}>{e.nume_proiect}</div>)
//   //   }
//   //   </>
//   // )
// };

const getProiecte = () => {

  Axios.get("http://localhost:8080/projectsFront", {
  }).then((response) => {
    for(let i=0;i<response.data.length;i++){
      //console.log(response.data[i].nume_proiect)
    }
      
  });
};

const logged =()=>{
  Axios.get("http://localhost:8080/studentslogin").then((response) => {
    //if (response.data.loggedIn == true) {
     console.log(response.data.student.username) ;
    //}
  });
};

function Home() {
  const user = "iFindAllBugs007";

  const [modalShowViewProject, setModalShowViewProject] = React.useState(false);
  const [modalShowEditProject, setModalShowEditProject] = React.useState(false);
  const [modalShowAddProject, setModalShowAddProject] = React.useState(false);
  const [modalShowBugs, setModalShowBugs] = React.useState(false);



  return (
    <React.Fragment>
      <div className="homepage">
        <div>Welcome, dear {logged}!</div>
        <Button variant="primary" onClick={() => setModalShowAddProject(true)}>
          Adauga un proiect
        </Button>
        <Button variant="primary" onClick={getProiecte}>
          Get un proiect
        </Button>
        <section>
          <h1>Proiectele in care sunteti implicat</h1>
          <div class="tbl-header">
            <table cellpadding="0" cellspacing="0" border="0">
              <thead>
                <tr>
                  <th>Nume Proiect</th>
                  <th>Detalii</th>
                  <th>Editare</th>
                  <th>Status</th>
                  <th>Bug-uri</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="tbl-content">
            <table cellpadding="0" cellspacing="0" border="0">
              <tbody>
                {getProiecte()}
                  
                {/* <tr>
                  <td>ghgj</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => setModalShowViewProject(true)}
                    >
                      Vizualizeaza detalii
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => setModalShowEditProject(true)}
                    >
                      Editeaza proiect
                    </Button>
                  </td>
                  <td>In Progress</td>
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
                  <td>02</td>
                  <td>Tehnologii Web</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => setModalShowViewProject(true)}
                    >
                      Vizualizeaza detalii
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => setModalShowEditProject(true)}
                    >
                      Editeaza proiect
                    </Button>
                  </td>
                  <td>In Progress</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => setModalShowViewProject(true)}
                    >
                      Vizualizeaza bug-uri
                    </Button>
                  </td>
                </tr> */}
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
