import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import {
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa"

export default function Pagamento() {

  const [diaSelecionado, setDiaSelecionado] = useState(null)
  const [profissional, setProfissional] = useState(null)
  const [horario, setHorario] = useState(null)

  // 🔥 SEMANA
  const [offsetSemana, setOffsetSemana] = useState(0)

  // 🔥 TOAST
  const [toast, setToast] = useState(false)

  // 📅 GERAR SEMANA
  const gerarSemana = () => {

    const hoje = new Date()

    const primeiroDia = new Date(hoje)

    const diaAtual = hoje.getDay()

    const diferenca =
      diaAtual === 0
        ? -6
        : 1 - diaAtual

    primeiroDia.setDate(
      hoje.getDate() +
      diferenca +
      offsetSemana * 7
    )

    const nomes = [
      "Seg",
      "Ter",
      "Qua",
      "Qui",
      "Sex",
      "Sáb",
      "Dom",
    ]

    const dias = []

    for (let i = 0; i < 7; i++) {

      const data = new Date(primeiroDia)

      data.setDate(primeiroDia.getDate() + i)

      // 🔥 VERIFICAR SE JÁ PASSOU
      const hojeSemHora = new Date()

      hojeSemHora.setHours(0, 0, 0, 0)

      const dataComparacao = new Date(data)

      dataComparacao.setHours(0, 0, 0, 0)

      const passou =
        offsetSemana === 0 &&
        dataComparacao < hojeSemHora

      dias.push({

        dia: nomes[i],

        numero: data.getDate(),

        full: data.toLocaleDateString("pt-BR"),

        mes: data.toLocaleDateString("pt-BR", {
          month: "short",
        }),

        passou,
      })
    }

    return dias
  }

  const dias = gerarSemana()

  // 👤 PROFISSIONAIS
  const profissionais = [
    {
      nome: "Lucas",
      foto:
        "https://randomuser.me/api/portraits/men/32.jpg",
      nota: "5.0",
    },

    {
      nome: "João",
      foto:
        "https://randomuser.me/api/portraits/men/45.jpg",
      nota: "5.0",
    },

    {
      nome: "Carlos",
      foto:
        "https://randomuser.me/api/portraits/men/12.jpg",
      nota: "4.9",
    },
  ]

  // ⏰ HORÁRIOS
  const horarios = {

    manhã: [
      "09:00",
      "10:00",
      "11:00",
    ],

    tarde: [
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ],

    noite: [
      "18:00",
      "19:00",
      "20:00",
    ],
  }

  // 💾 AGENDAMENTOS
  const agendamentos =
    JSON.parse(
      localStorage.getItem("agendamentos")
    ) || []

  // 🔒 HORÁRIOS OCUPADOS
  const horariosOcupados = agendamentos
    .filter(
      (item) =>
        item.data === dias[diaSelecionado]?.full &&
        item.profissional ===
          profissionais[profissional]?.nome
    )
    .map((item) => item.horario)

  // 💾 SALVAR
  const salvarAgendamento = () => {

    const agendamento = {

      cliente: "Cliente WhatsApp",

      data: dias[diaSelecionado].full,

      horario,

      profissional:
        profissionais[profissional].nome,

      pagamento: "pendente",
    }

    const lista =
      JSON.parse(
        localStorage.getItem("agendamentos")
      ) || []

    lista.push(agendamento)

    localStorage.setItem(
      "agendamentos",
      JSON.stringify(lista)
    )
  }

  // 📲 CONFIRMAR
  const confirmar = () => {

    if (
      diaSelecionado === null ||
      profissional === null ||
      !horario
    ) return

    salvarAgendamento()

    setToast(true)

    setTimeout(() => {

      setToast(false)

      const dia = dias[diaSelecionado]

      const nome =
        profissionais[profissional].nome

      const mensagem = `Olá! Quero agendar um horário:

📅 Data: ${dia.full}
⏰ Horário: ${horario}
✂️ Profissional: ${nome}`

      const url = `https://wa.me/5583999999999?text=${encodeURIComponent(
        mensagem
      )}`

      window.open(url, "_blank")

    }, 1800)
  }

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10 relative overflow-hidden">

      {/* GLOW */}
      <div className="absolute w-[500px] h-[500px] bg-[#C89B55]/10 blur-3xl rounded-full top-[-150px] left-[-150px]" />

      {/* TOAST */}
      <AnimatePresence>

        {toast && (

          <motion.div

            initial={{
              opacity: 0,
              y: -40,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              y: -40,
            }}

            className="fixed top-6 right-6 z-50 bg-[#111] border border-[#C89B55] px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3"
          >

            <FaCheckCircle className="text-[#C89B55] text-xl" />

            <div>

              <p className="font-semibold">
                Agendamento iniciado
              </p>

              <p className="text-sm text-gray-400">
                Redirecionando para WhatsApp...
              </p>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

      {/* CONTAINER */}
      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.6,
        }}

        className="bg-[#111]/90 backdrop-blur w-full max-w-4xl rounded-[32px] p-6 border border-gray-800 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative z-10"
      >

        {/* HEADER */}
        <div className="mb-10">

          <h1 className="text-4xl font-bold">
            Agendamento
          </h1>

          <p className="text-gray-400 mt-2">
            Escolha um horário disponível
          </p>

        </div>

        {/* CALENDÁRIO */}
        <div className="mb-12">

          {/* TOPO */}
          <div className="flex items-center justify-between mb-6">

            {/* ESQUERDA */}
            <button

              disabled={offsetSemana <= 0}

              onClick={() => {

                setOffsetSemana((prev) => {

                  if (prev <= 0) return 0

                  return prev - 1
                })

                setDiaSelecionado(null)
              }}

              className={`w-11 h-11 rounded-full border flex items-center justify-center transition

              ${
                offsetSemana <= 0
                  ? "bg-[#111] border-gray-800 text-gray-600 cursor-not-allowed opacity-50"
                  : "bg-[#1a1a1a] border-gray-700 hover:border-[#C89B55]"
              }
              `}
            >
              <FaChevronLeft />
            </button>

            <h2 className="text-xl font-semibold">
              Agenda Semanal
            </h2>

            {/* DIREITA */}
            <button

              onClick={() => {

                setOffsetSemana((prev) => prev + 1)

                setDiaSelecionado(null)
              }}

              className="w-11 h-11 rounded-full bg-[#1a1a1a] border border-gray-700 flex items-center justify-center hover:border-[#C89B55] transition"
            >
              <FaChevronRight />
            </button>

          </div>

          {/* DIAS */}
          <div className="flex gap-4 overflow-x-auto pb-3">

            {dias.map((d, i) => (

              <motion.button

                key={i}

                disabled={d.passou}

                whileHover={
                  !d.passou
                    ? { scale: 1.05 }
                    : {}
                }

                whileTap={
                  !d.passou
                    ? { scale: 0.95 }
                    : {}
                }

                onClick={() => {

                  if (d.passou) return

                  setDiaSelecionado(i)

                  setHorario(null)
                }}

                className={`min-w-[95px] rounded-3xl p-4 border transition

                ${
                  d.passou
                    ? "bg-[#0f0f0f] border-gray-800 text-gray-600 cursor-not-allowed opacity-40"

                    : diaSelecionado === i
                    ? "bg-[#C89B55] text-black border-[#C89B55]"

                    : "bg-[#111] border-gray-700 hover:border-[#C89B55]"
                }
                `}
              >

                <p className="text-sm">
                  {d.dia}
                </p>

                <p className="text-3xl font-bold mt-1">
                  {d.numero}
                </p>

                <p className="text-xs uppercase mt-1 opacity-70">
                  {d.mes}
                </p>

              </motion.button>

            ))}

          </div>

        </div>

        {/* PROFISSIONAIS */}
        <div className="mb-12">

          <h2 className="text-xl font-semibold mb-5">
            Profissionais
          </h2>

          <div className="flex gap-5 overflow-x-auto pb-4">

            {profissionais.map((p, i) => (

              <motion.div

                key={i}

                whileHover={{
                  scale: 1.05,
                }}

                onClick={() => {
                  setProfissional(i)
                  setHorario(null)
                }}

                className={`cursor-pointer rounded-3xl p-5 border transition min-w-[150px]

                ${
                  profissional === i
                    ? "border-[#C89B55] bg-[#C89B55]/10"
                    : "border-gray-700 bg-[#111]"
                }
                `}
              >

                <img
                  src={p.foto}

                  className="w-20 h-20 rounded-full mx-auto border-2 border-[#C89B55] object-cover"
                />

                <h3 className="text-center mt-4 font-semibold text-lg">
                  {p.nome}
                </h3>

                <p className="text-center text-yellow-400 text-sm mt-1">
                  ⭐ {p.nota}
                </p>

              </motion.div>

            ))}

          </div>

        </div>

        {/* HORÁRIOS */}
        {profissional !== null &&
          diaSelecionado !== null && (

          <motion.div

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className="space-y-10"
          >

            {Object.entries(horarios).map(
              ([periodo, lista]) => (

                <div key={periodo}>

                  <h2 className="text-xl font-semibold capitalize mb-5">
                    {periodo}
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    {lista.map((h, i) => {

                      const ocupado =
                        horariosOcupados.includes(h)

                      return (

                        <motion.button

                          key={i}

                          whileHover={
                            !ocupado
                              ? { scale: 1.04 }
                              : {}
                          }

                          whileTap={
                            !ocupado
                              ? { scale: 0.95 }
                              : {}
                          }

                          onClick={() =>
                            !ocupado &&
                            setHorario(h)
                          }

                          className={`p-5 rounded-2xl border transition font-semibold text-lg

                          ${
                            ocupado
                              ? "bg-red-500/10 border-red-500 text-red-400 cursor-not-allowed"
                              : horario === h
                              ? "bg-[#C89B55] text-black border-[#C89B55]"
                              : "bg-[#111] border-gray-700 hover:border-[#C89B55]"
                          }
                          `}
                        >

                          {ocupado
                            ? "Ocupado"
                            : h}

                        </motion.button>

                      )
                    })}

                  </div>

                </div>
              )
            )}

          </motion.div>
        )}

        {/* BOTÃO */}
        {horario && (

          <motion.button

            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            whileHover={{
              scale: 1.02,
            }}

            whileTap={{
              scale: 0.98,
            }}

            onClick={confirmar}

            className="w-full mt-12 bg-[#C89B55] text-black py-5 rounded-3xl font-bold text-lg shadow-[0_0_30px_rgba(200,155,85,0.4)]"
          >

            Confirmar via WhatsApp

          </motion.button>

        )}

      </motion.div>

    </div>
  )
}