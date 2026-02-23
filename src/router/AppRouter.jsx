import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "../pages/Login/Login"
import AltaNotaCredito from "../pages/AltaNC/AltaNC"

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/alta-nota" element={<AltaNotaCredito />} />

      </Routes>

    </BrowserRouter>
  )
}

export default AppRouter
