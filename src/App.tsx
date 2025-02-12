import { HashRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes></Routes>
    </HashRouter>
  );
}

export default App;
