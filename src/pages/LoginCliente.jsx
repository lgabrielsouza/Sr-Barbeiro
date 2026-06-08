import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function LoginCliente() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const login = async () => {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password: senha
      })

    if (error) {
      alert("Email ou senha inválidos")
      return
    }

    navigate("/")
  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-2">
          Entrar
        </h1>

        <p className="text-gray-400 mb-8">
          Acesse sua conta
        </p>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-xl p-3 text-white"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-xl p-3 text-white"
          />

          <button
            onClick={login}
            className="w-full bg-[#C89B55] text-black py-3 rounded-xl font-bold"
          >
            Entrar
          </button>

        </div>

        <p className="text-center text-gray-400 mt-6">

          Não possui conta?

          <Link
            to="/cadastro"
            className="text-[#C89B55] ml-2"
          >
            Cadastre-se
          </Link>

        </p>

      </div>

    </div>
  )
}