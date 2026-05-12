import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Pagamento from "./pages/pagamento"
import Confirmado from "./pages/confirmado"
import Admin from "./pages/admin"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pagamento" element={<Pagamento />} />
      <Route path="/confirmado" element={<Confirmado />} />
      <Route path="/admin" element={<Admin />} /> {/* 👈 AQUI DENTRO */}
    </Routes>
  )
}