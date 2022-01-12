import React from "react";
import '../css/Homepage.css'

function TesterHome() {
  const user = "iFindAllBugs007";

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
                <td>
                    <input type="image" className="icons" src="https://cdn-icons-png.flaticon.com/128/709/709612.png" /> 
                </td>
              </tr>
              <tr>
                <td>02</td>
                <td>Multimedia</td>
                <td>Done</td>
                <td>
                    <input type="image" className="icons" src="https://cdn-icons-png.flaticon.com/128/709/709612.png" /> 
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default TesterHome;
