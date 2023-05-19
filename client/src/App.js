import './App.css';
// import useApplicationData from './hooks/useApplicationData';
import { Route, Routes, BrowserRouter as Router, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Calendar from './components/Calendar/Calender';
import Home from "./components/Home"
import Login from "./components/Login"
import Register from "./components/Register"
import History from "./components/History"
import Form from "./components/Form"
import FormView from "./components/FormView"
import FormTest from './components/FormTest'
import HomeTest from "./components/homeTest"

function NavBar() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return <Navigation />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/log/new" element={<Form />} />
          <Route path="/log/view" element={<FormView />} />
          <Route path="log/test" element={<FormTest/>}/>
          <Route path="/test" element={<HomeTest/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;