import { Box } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/mainPage";
import SignUpPage from "./components/SignUpPage";

function App() {
  return (
    <Box minWidth="100vw" minHeight="100vh">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signuppage" element={<SignUpPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
