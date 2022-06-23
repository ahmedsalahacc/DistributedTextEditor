// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Notebook from "./pages/Notebook";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"></header> */}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/notebook" element={<Notebook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
