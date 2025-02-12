import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Statement from "./pages/Statement";
import Transfer from "./pages/Transfer";

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/statement" element={<Statement />} />
        <Route path="/transfer" element={<Transfer />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
