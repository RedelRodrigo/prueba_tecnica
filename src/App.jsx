import "./App.css";
import { Products } from "./components/Products.jsx";
import { Routes, Route } from "react-router-dom";
import { PokemonDetail } from "./components/PokemonDetail.jsx";
import { Tasks } from "./components/Tasks.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/pokemon/:id" element={<PokemonDetail />} />
      <Route path="/tasks" element={<Tasks />} />
    </Routes>
  );
}

export default App;
