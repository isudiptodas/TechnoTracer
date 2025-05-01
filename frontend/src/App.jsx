import LandingPage from "./pages/LandingPage.jsx"
import Auth from "./pages/Auth.jsx"
import Dashboard from "./pages/user/Dashboard.jsx";
import AdminAuth from "./pages/admin/AdminAuth.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Settings from "./pages/user/Settings.jsx";
import Report from "./pages/user/Report.jsx";
import PastListing from "./pages/user/PastListing.jsx";
import ClaimPage from "./pages/user/ClaimPage.jsx";

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<Auth/>}/>

        <Route path="/user/dashboard" element={<Dashboard/>}/>
        <Route path="/user/report" element={<Report/>}/>
        <Route path="/user/past-listing" element={<PastListing/>}/>
        <Route path="/user/settings" element={<Settings/>}/>
        <Route path="/user/item/details" element={<ClaimPage/>}/>

        <Route path="/admin/auth" element={<AdminAuth/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
      </Routes>
    </>
  )
}

export default App
