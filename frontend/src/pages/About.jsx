import React from "react";
import "./styles/About.css";

function About() {
  return (
    <html>
      <head>
        <title>About</title>
      </head>
      <body>
        <div>
          <h1>About Us</h1>
          <div>
            <p>
              This project is done by the four senior(1) students of the faculty
              of Engineering of Ain Shams University presented above; Computer
              Engineering and Software Systems (CESS) major and to be submitted
              as the course major assessment project. The project follows and
              abides to the requirements presented by college for the
              assessment. A Full Documentation &amp; A Running Demo Video of The
              project is provided in the links below.
            </p>
          </div>
          <div>
            <h3>Website Developers</h3>
            <table>
              <tr>
                <td>Ahmed Salah Eldin</td>
                <td class="shft">
                  <a href="mailto:18P9076@eng.asu.edu.eg">18P9076@eng.asu.edu.eg</a>
                </td>
              </tr>
              <tr>
                <td>Emad Mostafa Mohamed</td>
                <td class="shft">
                  <a href="mailto:18P1003@eng.asu.edu.eg">18P1003@eng.asu.edu.eg</a>
                </td>
              </tr>
              <tr>
                <td>Yehia Mohamed Hesham</td>
                <td class="shft">
                  <a href="mailto:1804493@eng.asu.edu.eg">1804493@eng.asu.edu.eg</a>
                </td>
              </tr>
              <tr>
                <td>Kareem Ayman Farouk</td>
                <td class="shft">
                  <a href="mailto:18P6994@eng.asu.edu.eg">18P6994@eng.asu.edu.eg</a>
                </td>
              </tr>
            </table>
          </div>
          <div>
            <h3>Associate Links</h3>
            <span>
              Find Our Source Code <span class="dcrt">@</span>
              <a href="https://github.com/ahmedsalahacc/DistributedTextEditor" target="_blank" rel="noreferrer">Source Code </a>
            </span>
            <br></br>
            <span>Watch Our Demonstration Video <span class="dcrt">@</span><a href="https://youtube.com" target="_blank" rel="noreferrer">Youtube Channel</a>
            </span>
            <br></br>
            <span>
              Back To Home? <a id="shft" href="/">Home Page</a>
            </span>
          </div>
          <div>
            
            <br></br>
            <span>
              <i>&copy; copyrights, Ain Shams University</i>
            </span><br></br>
            <span>
              <i>Special Thanks For Prof. Ayman Bahaa &amp; Eng. Mostafa for their support.</i>
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}

export default About;