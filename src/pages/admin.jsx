import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

export default function Admin() {

  //LOGIN

  const navigate = useNavigate()

  useEffect(() => {
    verificarUsuario()

  }, [])


  const [aba, setAba] = useState("dashboard")

  const [agendamentos, setAgendamentos] = useState([])

  const [clientes, setClientes] = useState([])

  //CADASTRO CLIENTES/ADMIN
  useEffect(() => {
    carregarAgendamentos()
    carregarClientes()
  }, [])


  const faturamentoTotal = agendamentos
    .filter(item => item.status === "confirmado")
    .reduce((total, item) => total + Number(item.valor || 0), 0)


  const carregarAgendamentos = async () => {

    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .order("id", { ascending: false })

    if (!error) {
      setAgendamentos(data)
    }
  }

  const carregarClientes = async () => {

  const { data, error } = await supabase
    .from("clientes")
    .select("*")
    .order("id", { ascending: false })

  if (!error) {
    setClientes(data)
    }
  }


  const verificarUsuario = async () => {

    const {
      data: { session }
    } = await supabase.auth.getSession()

    if (!session) {
      navigate("/login")
    }
  }

  const sair = async () => {

    await supabase.auth.signOut()

    navigate("/login")
  }

  return (

    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0d0d0d] border-r border-gray-800 p-6 hidden md:flex flex-col">

        <h1 className="text-2xl font-bold mb-10 text-[#C89B55]">
          Barber Admin
        </h1>

        <div className="space-y-3">

          <button
            onClick={() => setAba("dashboard")}
            className={`w-full text-left px-5 py-4 rounded-2xl transition font-medium ${
              aba === "dashboard"
                ? "bg-[#C89B55] text-black"
                : "hover:bg-[#1a1a1a]"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setAba("pagamentos")}
            className={`w-full text-left px-5 py-4 rounded-2xl transition font-medium ${
              aba === "pagamentos"
                ? "bg-[#C89B55] text-black"
                : "hover:bg-[#1a1a1a]"
            }`}
          >
            Pagamentos
          </button>

          <button
            onClick={() => setAba("clientes")}
            className={`w-full text-left px-5 py-4 rounded-2xl transition font-medium ${
              aba === "clientes"
                ? "bg-[#C89B55] text-black"
                : "hover:bg-[#1a1a1a]"
            }`}
          >
            Clientes
          </button>

          <button
            onClick={sair}
            className="w-full mt-auto bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl"
          >
            Sair
          </button>

        </div>

      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-6 md:p-10">

        {/* DASHBOARD */}
        {aba === "dashboard" && (

          <div>

            <div className="mb-10">

              <h2 className="text-4xl font-bold">
                Dashboard
              </h2>

              <p className="text-gray-500 mt-2">
                Controle geral da barbearia
              </p>

            </div>

            {/* CARDS */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">

              <div className="bg-[#111] border border-gray-800 rounded-3xl p-6">

                <p className="text-gray-400">
                  Total de Agendamentos
                </p>

                <h3 className="text-4xl font-bold mt-3">
                  {agendamentos.length}
                </h3>

              </div>

              <div className="bg-[#111] border border-green-500/30 rounded-3xl p-6">

                <p className="text-green-400">
                  Confirmados
                </p>

                <h3 className="text-4xl font-bold mt-3 text-green-400">

                  {
                    agendamentos.filter(
                      item => item.status === "confirmado"
                    ).length
                  }

                </h3>

              </div>

              <div className="bg-[#111] border border-yellow-500/30 rounded-3xl p-6">

                <p className="text-yellow-400">
                  Pendentes
                </p>

                <h3 className="text-4xl font-bold mt-3 text-yellow-400">
                  {
                    agendamentos.filter(
                      item => item.status === "pendente"
                    ).length
                  }
                </h3>

              </div>

              <div className="bg-[#111] border border-[#C89B55]/30 rounded-3xl p-6">

                <p className="text-[#C89B55]">
                  Faturamento
                </p>

                <h3 className="text-4xl font-bold mt-3 text-[#C89B55]">
                  R$ {faturamentoTotal}
                </h3>

              </div>

            </div>

              {/* AGENDAMENTOS */}
            <div className="space-y-5">

              {agendamentos.map((item, index) => (

                <div
                  key={index}
                  className="bg-[#111] border border-gray-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-5"
                >

                  <div>

                    <h3 className="text-xl font-bold">
                      {item.cliente}
                    </h3>

                    <p className="text-gray-400 mt-1">
                      Barbeiro: {item.profissional}
                    </p>

                    <p className="text-gray-500 text-sm mt-2">
                      📅 {item.data} • ⏰ {item.horario}
                    </p>

                  </div>

                  {/* BOTÕES */}
                  <div className="flex items-center gap-3 flex-wrap">

                    <span
                      className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                        item.status === "confirmado"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>

                    {item.status !== "confirmado" && (

                      <button

                        onClick={async () => {

                          await supabase
                            .from("agendamentos")
                            .update({
                              status: "confirmado",
                              pagamento: "confirmado"
                            })
                            .eq("id", item.id)

                          carregarAgendamentos()
                        }}

                        className="bg-[#C89B55] hover:opacity-90 text-black px-4 py-2 rounded-xl font-semibold transition"
                      >

                        Confirmar

                      </button>

                    )}

                      <button

                        onClick={async () => {

                        await supabase
                          .from("agendamentos")
                          .delete()
                          .eq("id", item.id)

                          carregarAgendamentos()

                        }}

                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
                    >

                      Remover

                      </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

        {aba === "clientes" && (

          <div>

            <div className="mb-10">

              <h2 className="text-4xl font-bold">
                Clientes
              </h2>

              <p className="text-gray-500 mt-2">
                Clientes cadastrados
              </p>

            </div>

            <div className="space-y-4">

              {clientes.map((cliente) => (

                <div
                  key={cliente.id}
                  className="bg-[#111] border border-gray-800 rounded-3xl p-6"
                >

                  <h3 className="text-xl font-bold">
                    {cliente.nome}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {cliente.email}
                  </p>

                  <p className="text-gray-500">
                    {cliente.telefone}
                  </p>

                </div>

              ))}

            </div>

          </div>

        )}

      </main>

    </div>

  )
}