import React, {useEffect, useState} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {HomePageComponent} from "./components/HomePageComponent.jsx";
import './App.css'
function App() {
  const [userState, setUserState] = useState({
    theme: localStorage.getItem('theme') === '' ? 'light' : localStorage.getItem('theme'),
    smallWindow: window.innerWidth < 640,
  })

  useEffect(() => {
    const handleResize = () => {
      setUserState(prevState => ({
        ...prevState,
        smallWindow: window.innerWidth < 640
      }))
    }
    window.addEventListener('resize', handleResize)
    return ()=>{
      window.removeEventListener('resize', handleResize)
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element:
          <HomePageComponent
              userPreferences={userState}
              setUserPreferences={()=>setUserState}
          />
    },
  ]);

  return (
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
  )
}

export default App
