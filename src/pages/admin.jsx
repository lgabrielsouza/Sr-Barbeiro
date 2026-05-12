import { useEffect, useState } from "react"
import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaCog,
  FaCheckCircle,
  FaClock,
  FaTrash,
} from "react-icons/fa"

import { motion } from "framer-motion"

export default function Admin() {

  const [agendamentos, setAgendamentos] = useState([])
  const [filtro, setFiltro] = useState("Todos")

  // 🔄 CARREGAR
  useEffect(() => {
    const dados =
      JSON.parse(localStorage.getItem("agendamentos")) || []

    setAgendamentos(dados)
  }, [])

  // 💰 CONFIRMAR
  const confirmarPagamento = (index) => {
    const lista = [...agendamentos]

    lista[index].pagamento = "confirmado"

    localStorage.setItem(
      "agendamentos",
      JSON.stringify(lista)
    )

    setAgendamentos(lista)
  }

  // ❌ REMOVER
  const removerAgendamento = (index) => {
    const lista = [...agendamentos]

    lista.splice(index, 1)

    localStorage.setItem(
      "agendamentos",
      JSON.stringify(lista)
    )

    setAgendamentos(lista)
  }

  // 🎯 FILTRAR
  const filtrados =
    filtro === "Todos"
      ? agendamentos
      : agendamentos.filter(
          (item) => item.profissional === filtro
        )

  // 📊 ESTATÍSTICAS
  const total = agendamentos.length

  const pagos = agendamentos.filter(
    (a) => a.pagamento === "confirmado"
  ).length

  const pendentes = total - pagos

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0f0f0f] border-r border-gray-800 p-6 hidden md:flex flex-col">

        <h1 className="text-2xl font-bold text-[#C89B55] mb-10">
          Barber Admin
        </h1>

        <nav className="space-y-4">

          <button className="w-full flex items-center gap-3 bg-[#C89B55] text-black px-4 py-3 rounded-xl font-semibold">
            <FaCalendarAlt />
            Dashboard
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-[#1a1a1a] px-4 py-3 rounded-xl transition">
            <FaMoneyBillWave />
            Pagamentos
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-[#1a1a1a] px-4 py-3 rounded-xl transition">
            <FaUsers />
            Clientes
          </button>

          <button className="w-full flex items-center gap-3 hover:bg-[#1a1a1a] px-4 py-3 rounded-xl transition">
            <FaCog />
            Configurações
          </button>

        </nav>

      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-6">

        {/* TOPO */}
        <div className="mb-10">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Controle completo da barbearia
          </p>

        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#111] border border-gray-800 rounded-2xl p-5"
          >
            <p className="text-gray-400 text-sm">
              Total Agendamentos
            </p>

            <h2 className="text-4xl font-bold mt-3">
              {total}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#111] border border-green-500/20 rounded-2xl p-5"
          >
            <p className="text-green-400 text-sm">
              Pagamentos Confirmados
            </p>

            <h2 className="text-4xl font-bold mt-3 text-green-400">
              {pagos}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-[#111] border border-yellow-500/20 rounded-2xl p-5"
          >
            <p className="text-yellow-400 text-sm">
              Pendentes
            </p>

            <h2 className="text-4xl font-bold mt-3 text-yellow-400">
              {pendentes}
            </h2>
          </motion.div>

        </div>

        {/* FILTROS */}
        <div className="flex gap-3 flex-wrap mb-8">

          {["Todos", "Lucas", "João", "Carlos"].map((nome, i) => (

            <button
              key={i}
              onClick={() => setFiltro(nome)}
              className={`px-4 py-2 rounded-xl transition ${
                filtro === nome
                  ? "bg-[#C89B55] text-black"
                  : "bg-[#111] border border-gray-700 hover:border-[#C89B55]"
              }`}
            >
              {nome}
            </button>

          ))}

        </div>

        {/* LISTA */}
        <div className="space-y-5">

          {filtrados.length === 0 && (
            <div className="bg-[#111] rounded-2xl p-10 text-center text-gray-500">
              Nenhum agendamento encontrado
            </div>
          )}

          {filtrados.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111] border border-gray-800 rounded-2xl p-6"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* INFO */}
                <div>

                  <h2 className="text-xl font-semibold">
                    {item.profissional}
                  </h2>

                  <div className="mt-3 space-y-2 text-gray-300">

                    <p>
                      👤 Cliente: {item.cliente}
                    </p>

                    <p>
                      📅 Data: {item.data}
                    </p>

                    <p>
                      ⏰ Horário: {item.horario}
                    </p>

                  </div>

                </div>

                {/* STATUS */}
                <div className="flex flex-col items-start md:items-end gap-4">

                  {item.pagamento === "confirmado" ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <FaCheckCircle />
                      Confirmado
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <FaClock />
                      Pendente
                    </div>
                  )}

                  {/* BOTÕES */}
                  <div className="flex gap-3 flex-wrap">

                    {item.pagamento !== "confirmado" && (
                      <button
                        onClick={() => confirmarPagamento(index)}
                        className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-xl text-black font-semibold"
                      >
                        Confirmar
                      </button>
                    )}

                    <button
                      onClick={() => removerAgendamento(index)}
                      className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
                    >
                      <FaTrash />
                      Remover
                    </button>

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </main>

    </div>
  )
}