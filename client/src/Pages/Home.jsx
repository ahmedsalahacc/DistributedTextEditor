import React from 'react';
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD:client/src/Pages/Home.jsx

=======
import Notebook from './Notebook';

// import '../styles/Home.css'; 
>>>>>>> 2431f5db496d15639c6fc71eed5f3b3b7cd09b52:frontend/src/pages/Home.jsx
import '../styles/Home.css'

function Home() {

  const navigate = useNavigate();
  function goToNotebook()
  {
    let notebookID = document.getElementById("notebookID").value;
    // console.log(notebookID);
    let path = `/docs/${notebookID}`; 
    navigate(path);
  }

  return (
        <div>
            <div class="topnav">
              <a href="/about">About Us</a>
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
        </div>
  )
}

export default Home