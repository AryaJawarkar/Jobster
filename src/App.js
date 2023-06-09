import {Landing,Error,Register,ProtectedRoute }from "./pages";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import {
  Profile,
  AddJob,
  AllJobs,
  Stats,
  SharedLayout,
} from './pages/dashboard'


function App() {
  return (
    <BrowserRouter>
    <Routes>

    <Route path="/Jobster" element={
      <ProtectedRoute>
    <SharedLayout/>
      </ProtectedRoute>
    } >
    <Route index element={<Stats/>} /> 
    <Route path="/Jobster/all-jobs" element={<AllJobs/>} /> 
    <Route path="/Jobster/add-job" element={<AddJob/>} /> 
    <Route path="/Jobster/profile" element={<Profile/>} /> 

    </Route> 
    <Route path="/landing" element={<Landing/>} /> 
    <Route path="/register" element={<Register/>} /> 
    <Route path="*" element={<Error/>} /> 
    </Routes>
    <ToastContainer  position="top-center"/>
    </BrowserRouter>
  );
}

export default App;
