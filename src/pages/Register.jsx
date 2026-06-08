import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Register() {

  const navigate = useNavigate()

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [senha, setSenha] = useState("")

  const cadastrar = async () => {

    if (!nome || !email || !telefone || !senha) {
      alert("Preencha todos os campos")
      return
    }

    const { data, error } =
      await supabase.auth.signUp({

        email,

        password: senha

      })

    if (error) {

      alert(error.message)

      return
    }

    const { error: erroCliente } =
      await supabase
        .from("clientes")
        .insert([
          {
            nome,
            email,
            telefone
          }
        ])

    if (erroCliente) {

      alert("Erro ao salvar cliente")

      return
    }

    alert("Cadastro realizado com sucesso!")

    navigate("/login-cliente")
  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-white mb-2">
          Criar Conta
        </h1>

        <p className="text-gray-400 mb-8">
          Cadastre-se para agendar horários
        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-xl p-3 text-white"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-xl p-3 text-white"
          />

          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
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
            onClick={cadastrar}
            className="w-full bg-[#C89B55] hover:opacity-90 text-black py-3 rounded-xl font-bold transition"
          >
            Cadastrar
          </button>

        </div>

        <p className="text-center text-gray-400 mt-6">

          Já possui conta?

          <Link
            to="/login-cliente"
            className="text-[#C89B55] ml-2"
          >
            Entrar
          </Link>

        </p>

      </div>

    </div>
  )
}