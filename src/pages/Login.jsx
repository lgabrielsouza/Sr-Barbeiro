import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"

export default function Login() {

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const navigate = useNavigate()

  const entrar = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    })

    if (error) {
      alert("Login inválido")
      return
    }

    navigate("/admin")
  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-[#111] p-8 rounded-3xl w-full max-w-md">

        <h1 className="text-white text-3xl font-bold mb-6">
          Login Admin
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-black border border-gray-700 text-white"
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-black border border-gray-700 text-white"
        />

        <button
          onClick={entrar}
          className="w-full bg-[#C89B55] text-black py-3 rounded-xl font-bold"
        >
          Entrar
        </button>

      </div>

    </div>
  )
}