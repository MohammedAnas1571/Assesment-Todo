import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import TaskDetails from "./pages/TaskDetails";
function App() {
  return (
    <>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path = "/"  element = {<Home/>}/>
        <Route path ="/view-details/:taskId" element={<TaskDetails/>}/>
        
      </Routes>
    </BrowserRouter>
    </>
  );

 
}

export default App
