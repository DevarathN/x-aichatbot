import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import HistoryPage from "./components/HistoryPage/HistoryPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<HistoryPage />} path="/history" />
      </Routes>
    </Router>
  );
}

export default App;
