import './App.css';
import Dashboard from "./components/dashboard";
import Jobslist from "./components/jobslist";
import PostJob from "./components/postJob";
import Confirmation from "./components/confirmation";
import About from "./components/about";
import NotFound from "./components/NotFound";
import AppliedJob from "./components/appliedJob";

import Login from "./components/Login";
import Register from "./components/Register";
import MyJobs from "./components/my_jobs";
import BusinessVerifier from "./components/BusinessVerifier";
import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter from here

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobslist />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/applied-jobs" element={<AppliedJob />} />
        <Route path="/about" element={<About />} />
        <Route path="/myjobs" element={<MyJobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/business-verifier" element={<BusinessVerifier />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <footer>
        &copy; {new Date().getFullYear()}
      </footer>
    </>
  );
}

export default App;
