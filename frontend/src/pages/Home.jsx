import React from 'react';
import { useNavigate } from "react-router-dom";
import Notebook from './Notebook';
import './styles/Home.css'; 

function Home() {

  const navigate = useNavigate();
  function goToNotebook()
  {
    let notebookID = document.getElementById("notebookID").value;
    console.log(notebookID);
    let path = `/notebook`; 
    navigate(path);
  }

  return (
    <html>
        <head>
          <title>Home</title>
        </head>
        <body>
            <div class="topnav">
              <a href="/About">About Us</a>
            </div>
            <div id="ovr">
            <div >
              <h1>Edit Shared Documents with Your Teammates</h1>
            </div>
            <div class="formdiv">
              <form>
                <label>Notebook ID </label>
                <input type="text" min="1" id="notebookID"></input>
                <button type="submit" onClick={goToNotebook}>Open</button>
              </form>
            </div>
          </div>
        </body>
    </html>
  )
}

export default Home