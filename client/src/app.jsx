import React from 'react'
import Dashboard from './pages/dashboard'
// import Login from './pages/login'
// import EmailVerify from './pages/emailVerify'
// import ResetPassword from './pages/resetPassword'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import TimetablePage from './pages/timeTablePage';
import { Routes, Route } from "react-router-dom";
import PerformanceList from "./pages/Performance/PerformanceList";
import AddPerformance from "./pages/Performance/AddPerformance";
import EditPerformance from "./pages/Performance/EditPerformance";
import PerformanceDetails from "./pages/Performance/PerformanceDetails";
import Navbar from './components/navbar';

const App = () => {
  return (
    // <div >
    //   <ToastContainer/>
      
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/email-verify" element={<EmailVerify />} />
    //     <Route path="/reset-password" element={<ResetPassword />} />
    //     <Route path='/timetable' element={<TimetablePage/>}/>
    //   </Routes>
    // </div>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/performance" element={<PerformanceList />} />
        <Route path="/performance/add" element={<AddPerformance />} />
        <Route path="/performance/edit/:id" element={<EditPerformance />} />
        <Route path="/performance/:id" element={<PerformanceDetails />} />
      </Routes>
    </div> 
  )
}



export default App;

