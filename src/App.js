import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./pages/NavBar";
import CountryList from "./component/CountryList";
import SingleCountry from "./component/SingleCountry";
function App() {
  return (
    <BrowserRouter basename={window.location.pathname || ""}>
      <NavBar />
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path=":id" element={<SingleCountry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
