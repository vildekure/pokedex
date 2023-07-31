import { Browser } from "./Pages/Browser";
import { Pokemon } from "./Pages/Pokemon";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Browser />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
