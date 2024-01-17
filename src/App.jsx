import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/notes" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
