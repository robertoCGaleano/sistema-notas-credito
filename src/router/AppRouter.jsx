import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import AltaNotaCredito from "../pages/AltaNC/AltaNC";
import ConsultaNC from "../pages/ConsultaNC/ConsultaNC";
import Empresas from "../pages/Empresas/Empresas";
import DetalleNC from "../pages/DetalleNC/DetalleNC";

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/altaNC" element={<AltaNotaCredito />} />

        <Route path="/consultaNC" element={<ConsultaNC />} />

        <Route path="/detalleNC" element={<DetalleNC />} />

        <Route path="/empresas" element={<Empresas />} />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRouter;