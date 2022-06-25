import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import About from "./Pages/About";
import Home from "./Pages/Home";
import Notebook from "./Pages/Notebook";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route
            exact
            path="/"
            element={<Navigate to={`/docs/${uuidV4()}`} />}
          /> */}
          <Route path="/docs/:id" element={<Notebook />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
