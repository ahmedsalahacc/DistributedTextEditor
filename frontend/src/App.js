// import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
          <Route path="/redirect" element={ <Navigate to="/error" /> } />
          <Route path="/notebook" element={ <Navigate to="/notebook" /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
