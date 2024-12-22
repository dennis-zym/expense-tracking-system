import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./pages/auth/index";
import { AdminPage } from "./pages/expense-tracker/adminPage";
import { UserPage } from "./pages/expense-tracker/userPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Auth />} />
          <Route path="/adminPage" element={<AdminPage />} />
          <Route path="/userPage" element={<UserPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
