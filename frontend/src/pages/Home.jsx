import React from 'react';
//import { useNavigate } from "react-router-dom";
import Notebook from './Notebook';
import './styles/Home.css'; 
//const navigate = useNavigate();

function Home() {

  function goToNotebook(){
      
    //   const routeChange = () =>{ 
    //   let path = `newPath`; 
    //   navigate(path);
    // }
    alert("Edit Me");
  }

  return (
    <html>
        <head>
          <title>Home</title>
        </head>
        <body>
          <div>
            <div class="topnav">
              <a href="/About">About Us</a>
            </div>
            <div>
              <h1>Welcome To Our Multi-Editor Software</h1>
            </div>
            <div class="formdiv">
              <form>
                <label>Enter Notebook ID</label>
                <input type="number" id="notebookID"></input>
                <input type="submit" value="Head To Notebook" onClick={goToNotebook}></input>
              </form>
            </div>
          </div>
        </body>
    </html>
  )
}

export default Home