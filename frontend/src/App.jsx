import './App.css';
import Dashboard from "./components/dashboard";
import Jobslist from "./components/jobslist";
import PostJob from "./components/postJob";
import Confirmation from "./components/confirmation";
import AppliedJob from "./components/appliedJob";
import About from "./components/about";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Register from "./components/Register";
import MyJobs from "./components/my_jobs";
import { Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom

function App() {

  return (
    <>
      <Routes> {/* Define the routes for the application */}
        
        <Route path="/" element={<Dashboard />} /> {/* Route for the Dashboard component */}
        <Route path="/jobs" element={<Jobslist/>} /> {/* Route for the Jobslist component */}
        <Route path="/confirmation" element={<Confirmation/>} /> {/* Route for the Jobslist component */}
        <Route path="/post" element={<PostJob />} /> {/* Route for the PostJob component */}
        <Route path="/applied-jobs" element={<AppliedJob />} /> {/* Route for the AppliedJob component */}
        <Route path="/about" element={<About />} /> {/* Route for the About component */}
        <Route path="/myjobs" element={<MyJobs />} /> {/* Route for the MyJobs component */}
        <Route path="/login" element={<Login />} /> {/* Route for the Login component */}
        <Route path="/register" element={<Register />} /> {/* Route for the Register component */}
        <Route path="*" element={<NotFound />} /> {/* Route for the Not Found component */}
        
      </Routes>
    </>
  )
}

export default App
