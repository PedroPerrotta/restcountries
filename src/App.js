import "./styles/global.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllCountries from "./components/countries/allCountries";
import SingleCountry from "./components/countries/singleCountry";

function App() {
  return (
    <Router>
      <div className="main-page">
        <Routes>
          <Route path="/" element={<AllCountries from="all" />}></Route>
          <Route path="/country/:country" element={<SingleCountry />}></Route>
          <Route path="/continent/:continent" element={<AllCountries from="continent" />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
