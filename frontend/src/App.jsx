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
import Feedback from "./pages/Feedback.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import { Routes, Route } from 'react-router-dom';
import RegisterCollege from "./pages/RegisterCollege.jsx";
import SuperAdminAuth from "./pages/super-admin/SuperAdminAuth.jsx";
import SuperDashboard from "./pages/super-admin/SuperDashboard.jsx";
import ContactAdmin from "./pages/user/ContactAdmin.jsx";
import QueryPage from "./pages/admin/QueryPage.jsx";
import Claims from "./pages/admin/Claims.jsx";
import AdminSettings from "./pages/admin/AdminSettings.jsx";
import PasswordRecovery from "./pages/PasswordRecovery.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";

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
        <Route path="/user/admin-contact" element={<ContactAdmin/>}/>

        <Route path="/admin/auth" element={<AdminAuth/>}/>
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
        <Route path="/admin/queries" element={<QueryPage/>}/>
        <Route path="/admin/claims" element={<Claims/>}/>
        <Route path="/admin/settings" element={<AdminSettings/>}/>

        <Route path="/super-admin/auth" element={<SuperAdminAuth/>}/>
        <Route path="/super-admin/dashboard" element={<SuperDashboard/>}/>
        
        <Route path="/register/college" element={<RegisterCollege/>}/>
        
        <Route path="/about" element={<About/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/password-recovery" element={<PasswordRecovery/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
      </Routes>
    </>
  )
}

export default App
