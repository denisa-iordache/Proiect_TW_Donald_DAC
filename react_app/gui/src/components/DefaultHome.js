import React from "react";
import "../css/Homepage.css";
import Select from "react-select";

import { useState } from "react";

import Axios from "axios";
import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function DefaultHome() {

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
        tr.appendChild(td3);
      }
    });
  }

  return (
    <div className="homepage">
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
    </div>
  );
}

export default DefaultHome;
