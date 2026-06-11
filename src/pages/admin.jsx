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

  const [periodo, setPeriodo] = useState("mensal")

  //CADASTRO CLIENTES/ADMIN
  useEffect(() => {
    carregarAgendamentos()
    carregarClientes()
  }, [])

  const faturamentoTotal = agendamentos
    .filter(item => item.status === "confirmado")
    .reduce((total, item) => total + Number(item.valor || 0), 0)

  const hoje = new Date()

  // FATURAMENTO MENSAL

  const faturamentoMensal = agendamentos
    .filter(item => {

      const dataCriacao = new Date(item.created_at)

      return (
        item.status === "confirmado" &&
        dataCriacao.getMonth() === hoje.getMonth() &&
        dataCriacao.getFullYear() === hoje.getFullYear()
      )

    })
    .reduce(
      (total, item) =>
        total + Number(item.valor || 0),
      0
    )

  // FATURAMENTO SEMANAL

  const seteDiasAtras = new Date()

  seteDiasAtras.setDate(
    hoje.getDate() - 7
  )

  const faturamentoSemanal = agendamentos
    .filter(item => {

      const dataCriacao = new Date(item.created_at)

      return (
        item.status === "confirmado" &&
        dataCriacao >= seteDiasAtras
      )

    })
    .reduce(
      (total, item) =>
        total + Number(item.valor || 0),
      0
    )

  // GRÁFICO

  const faturamentoPorDia = {}

  agendamentos
    .filter(item => item.status === "confirmado")
    .forEach(item => {

      const dataAgendamento = item.data

      if (!faturamentoPorDia[dataAgendamento]) {
        faturamentoPorDia[dataAgendamento] = 0
      }

      faturamentoPorDia[dataAgendamento] += Number(item.valor || 0)

    })

  const dadosGrafico = Object.entries(
    faturamentoPorDia
  ).map(([data, valor]) => ({
    data,
    valor
  }))

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
            onClick={() => setAba("financas")}
            className={`w-full text-left px-5 py-4 rounded-2xl transition font-medium ${
              aba === "financas"
                ? "bg-[#C89B55] text-black"
                : "hover:bg-[#1a1a1a]"
            }`}
          >
            Finanças
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

      {aba === "financas" && (

        <div>

          <div className="mb-10">

            <h2 className="text-4xl font-bold">
              Finanças
            </h2>

            <p className="text-gray-500 mt-2">
              Controle financeiro da barbearia
            </p>

          </div>

          <div className="flex gap-4 mb-8">

            <button
              onClick={() => setPeriodo("semanal")}
              className={`px-5 py-3 rounded-xl ${
                periodo === "semanal"
                  ? "bg-[#C89B55] text-black"
                  : "bg-[#111]"
              }`}
            >
              Semanal
            </button>

            <button
              onClick={() => setPeriodo("mensal")}
              className={`px-5 py-3 rounded-xl ${
                periodo === "mensal"
                  ? "bg-[#C89B55] text-black"
                  : "bg-[#111]"
              }`}
            >
              Mensal
            </button>

          </div>

          <div className="bg-[#111] border border-[#C89B55]/30 rounded-3xl p-8">

            <p className="text-gray-400">
              Faturamento
            </p>

            <h3 className="text-5xl font-bold text-[#C89B55] mt-3">

              R$

              {
                periodo === "mensal"
                  ? faturamentoMensal
                  : faturamentoSemanal
              }

            </h3>

          </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">

  <div className="bg-[#111] border border-green-500/30 rounded-3xl p-6">

    <p className="text-green-400">
      Faturamento Semanal
    </p>

    <h3 className="text-4xl font-bold mt-3 text-green-400">
      R$ {faturamentoSemanal}
    </h3>

  </div>

  <div className="bg-[#111] border border-[#C89B55]/30 rounded-3xl p-6">

    <p className="text-[#C89B55]">
      Faturamento Mensal
    </p>

    <h3 className="text-4xl font-bold mt-3 text-[#C89B55]">
      R$ {faturamentoMensal}
    </h3>

  </div>

</div>

      <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 mt-8">

          <h3 className="text-2xl font-bold mb-6">
            Faturamento por Dia
          </h3>

          <div className="space-y-3">

            {dadosGrafico.length > 0 ? (

              dadosGrafico.map((item, index) => (

                <div
                  key={index}
                  className="flex justify-between items-center border border-gray-800 rounded-xl p-4"
                >

                  <span>
                    {item.data}
                  </span>

                  <span className="text-[#C89B55] font-bold">
                    R$ {item.valor}
                  </span>

                </div>

              ))

            ) : (

              <p className="text-gray-500">
                Nenhum faturamento encontrado.
              </p>

            )}

          </div>

        </div>

        </div>

          )}

      </main>

    </div>

  )
}