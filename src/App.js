import "./styles/global.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCountries from "./components/countries/allCountries";
import SingleCountry from "./components/countries/singleCountry";

function App() {
  return (
    <Router>
      <div className="main-page">
        <Routes>
          <Route path="/" element={<AllCountries />}></Route>
          <Route path="/name/:country" element={<SingleCountry />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;