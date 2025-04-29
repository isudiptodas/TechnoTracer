import LandingPage from "./pages/LandingPage.jsx"
import Auth from "./pages/Auth.jsx"
import Dashboard from "./pages/user/Dashboard.jsx";

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/user/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
