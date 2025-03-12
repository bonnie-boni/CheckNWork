import './App.css'
import Dashboard from "./components/dashboard"
import Jobslist from "./components/jobslist";
import PostJob from "./components/postJob";
import Confirmation from './components/confirmation';
import AppliedJob from "./components/appliedJob";
import About from "./components/about";
import { Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom

function App() {

  return (
    <>
      <Routes> {/* Define the routes for the application */}
        
        <Route path="/" element={<Dashboard />} /> {/* Route for the Dashboard component */}
        <Route path="/jobs" element={<Jobslist/>} /> {/* Route for the Jobslist component */}
        <Route path="/confirmation" element={<Confirmation/>} /> {/* Route for the Jobslist component */}
        <Route path="/post" element={<PostJob />} /> {/* Route for the PostJob component */}
        <Route path="/applied" element={<AppliedJob />} /> {/* Route for the AppliedJob component */}
        <Route path="/about" element={<About />} /> {/* Route for the About component */}
        
      </Routes>
    </>
  )
}

export default App
