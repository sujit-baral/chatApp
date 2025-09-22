import React from "react";
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute"; 

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    )
  },
  {
    path: '/register',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
