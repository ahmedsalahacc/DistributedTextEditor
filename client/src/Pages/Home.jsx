import React from 'react';
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

import '../styles/Home.css'

function Home() {

  const navigate = useNavigate();
  function goToNotebook()
  {
    let notebookID = document.getElementById("notebookID").value;
    // console.log(notebookID);
    
    notebookID = CryptoJS.MD5(notebookID).toString()
    let path = `/docs/${notebookID}`; 
    navigate(path);
  }

  return (
        <div class="contentContainer">
            <div className="topnav">
              <a href="/about">About Us</a>
            </div>
            <div id="ovr">
            <div >
              <h1 id="welcome-message">Welcome To BroDox</h1>
            </div>
            <div className="formdiv"> 
              <form>
                <label id="notebookLabel"><strong>Notebook ID</strong></label>
                <input type="text" min="1" id="notebookID"></input>
                <button class="btn-opn" type="submit" onClick={goToNotebook}>Open Notebook</button>
              </form>
            </div>
          </div>
        </div>
  )
}

export default Home