import React from 'react'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import {BrowserRouter , Routes, Route , Link} from 'react-router-dom'
import Reservations from './pages/Reservations'
import Payment from './pages/Payment'
import Layout from './pages/Dashboard'
export default function App() {
  // removing ability to inspect 
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && ["u", "s", "i"].includes(event.key.toLowerCase()) || event.key === "F12") {
      event.preventDefault();
    }
  });
  //devtools remove
  let devToolsOpen = false;
  const detectDevTools = () => {
    const widthThreshold = window.outerWidth - window.innerWidth > 100;
    const heightThreshold = window.outerHeight - window.innerHeight > 100;
    devToolsOpen = widthThreshold || heightThreshold;
    if (devToolsOpen) {
      alert("Developer tools detected!");
    }
  };
  window.addEventListener("resize", detectDevTools);
  return (
    <main className="overflow-y-hidden ">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavBar className="text-neutral-200"/>}>
        <Route index element={<HomePage/>}/>
        
        
      </Route>
      <Route path='/signup' element={<SignUp/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Reservations' element={<Reservations/>}/>
        <Route path='/Payment' element={<Payment/>}/>
      <Route path='/Dashboard' element={<Layout/>}/>
    </Routes>
    </BrowserRouter>
    </main>
  )
}

