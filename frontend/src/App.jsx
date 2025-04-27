import React from "react";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from "./Pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Products from "./Pages/Products.jsx";
import Navbar from "./Components/Navbar.jsx"
import Profile from "./pages/Profile.jsx"; // Protected route
import PrivateRoute from "./Components/PrivateRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element:
    <div>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path: "/about",
    element:
    <div>
      <Navbar/>
      <About/>
    </div>
  },
  {
    path: "/profile",
    element:
    <div>
      <Navbar/>
      <Profile/>
    </div>
  },
  {
    path: "/contact",
    element:
    <div>
      <Navbar/>
      <Contact/>
    </div>
  },
  {
    path: "/products",
    element:
    <div>
      <Navbar/>
      <Products/>
    </div>
  },
  {
  path: "/login",
  element:
  <div>
    <Login/>
  </div>
},
{
  path: "/signup",
  element:
  <div>
    <Signup/>
  </div>
}
])

function App() {
  

  return (
    <>
      <div>
      <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
