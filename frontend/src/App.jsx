import LandingPage from "./pages/LandingPage.jsx"
import Auth from "./pages/Auth.jsx"
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </>
  )
}

export default App
