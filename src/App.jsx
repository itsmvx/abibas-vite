import './App.css'
import {LoginPage} from "./pages/LoginPage.jsx";
import {AdminPage} from "./pages/AdminPage.jsx";
import {NotFoundPage} from "./pages/NotFoundPage.jsx";
import {HomePage} from "./pages/HomePage.jsx";
import {StorePage} from "./pages/StorePage.jsx";
import {ErrorPage} from "./pages/ErrorPage.jsx"
import {Route, Routes} from "react-router-dom";
function App() {

  return (
      <Routes>
        <Route path="*" element={<NotFoundPage />} errorElement={<ErrorPage />} />
        <Route path="/" element={<HomePage />} errorElement={<ErrorPage />} />
        <Route path="/store" element={<StorePage />} errorElement={<ErrorPage />} />

      </Routes>
  )
}

export default App
