import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react"
import { motion, AnimatePresence, number } from "framer-motion"

import { useLocation } from "react-router-dom"

import {
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
} from "react-icons/fa"

export default function Pagamento() {

  const [diaSelecionado, setDiaSelecionado] = useState(null)
  const [profissional, setProfissional] = useState(null)
  const [horario, setHorario] = useState(null)
  
  const location = useLocation()

  const servicoRecebido =
    location.state?.servico

  const valorRecebido =
    location.state?.valor

  const [agendamentos, setAgendamentos] = useState([])

  const [offsetSemana, setOffsetSemana] = useState(0)

  const [toast, setToast] = useState(false)

  //temporario
  const carregarAgendamentos = async () => {

  const { data, error } = await supabase
    .from("agendamentos")
    .select("*")

    if (error) {
      console.error(error)
      return
    }

    setAgendamentos(data)
  }

  useEffect(() => {
    carregarAgendamentos()
  }, [])


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

  //SERVIÇOS
  const servicos = [

  {
    nome: "Corte Tradicional",
    valor: 45
  },

  {
    nome: "Barba",
    valor: 35
  },

  {
    nome: "Corte + Barba",
    valor: 70
  },

  {
    nome: "Corte Infantil",
    valor: 35
  },

  {
    nome: "Platinado",
    valor: 120
  },

  {
    nome: "Degradê",
    valor: 55
  }

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


  // 🔒 HORÁRIOS OCUPADOS
    const horariosOcupados = agendamentos
      .filter(
        (item) =>
          item.data === dias[diaSelecionado]?.full &&
          item.profissional === profissionais[profissional]?.nome
      )
        .map((item) => item.horario)

        const horarioEstaOcupado = (hora) => {
          return horariosOcupados.includes(hora)
        }

  const salvarAgendamento = async () => {

  const dia = dias[diaSelecionado]

  const barbeiro = profissionais[profissional]

    const {
    data: { user }
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
  .from("agendamentos")
  .insert([
    {
      cliente: user?.email,
      profissional: barbeiro.nome,
      data: dia.full,
      horario: horario,
      servico: servicoRecebido,
      valor: Number(valorRecebido),
      status: "pendente",
      pagamento: "pendente"
    }
  ])
  .select()

    console.log("EMAIL:", user?.email)
    console.log("ERROR:", error)
    console.log("DATA:", data)

  if (error) {
    console.error(error)
    alert("Erro ao salvar agendamento")
    return false
  }

  console.log("Agendamento salvo:", data)
  return true
}


const confirmar = async () => {

  if (
    diaSelecionado === null ||
    profissional === null ||
    !horario
  ) return

  const sucesso = await salvarAgendamento()

  if (!sucesso) return

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
      <div className="bg-[#111]/90 backdrop-blur w-full max-w-4xl rounded-[32px] p-6 border border-gray-800">

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

              <button

                key={i}

                disabled={d.passou}

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

              </button>

            ))}

          </div>

        </div>

        {/* SERVIÇO RECEBIDO*/}   
        <div className="mb-8 p-5 rounded-2xl bg-[#111] border border-[#C89B55]">

          <h2 className="text-2xl font-bold">
            Serviço Selecionado
          </h2>

          <p className="mt-3 text-lg">
            {servicoRecebido}
          </p>

          <p className="text-[#C89B55] font-bold text-xl mt-1">
            R$ {valorRecebido}
          </p>

        </div>


        {/* PROFISSIONAIS */}
        <div className="mb-12">

          <h2 className="text-xl font-semibold mb-5">
            Profissionais
          </h2>

          <div className="flex gap-5 overflow-x-auto pb-4">

            {profissionais.map((p, i) => (

              <div

                key={i}

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

              </div>

            ))}

          </div>

        </div>

        {/* HORÁRIOS */}
        {profissional !== null &&
          diaSelecionado !== null && (

          <div className="space-y-10">

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

                        <button

                          key={i}

                          disabled={ocupado}

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

                        </button>

                      )
                    })}

                  </div>

                </div>
              )
            )}

          </div>
        )}

        {/* BOTÃO */}
        {horario && (

          <button

            onClick={confirmar}

            className="w-full mt-12 bg-[#C89B55] text-black py-5 rounded-3xl font-bold text-lg"
          >

            Confirmar via WhatsApp

          </button>

        )}

      </div>

    </div>


  )
}