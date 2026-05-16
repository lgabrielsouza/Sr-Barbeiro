import { NavLink } from "react-router-dom"

import {
  Scissors,
  Sparkles,
  Blend,
  Wind,
} from "lucide-react"

const services = [
  {
    id: 1,
    name: "Corte Tradicional",
    description:
      "Corte clássico masculino com acabamento impecável.",

    price: "R$ 45",

    duration: "30 min",

    icon: <Scissors className="w-8 h-8" />,
  },

  {
    id: 2,

    name: "Corte + Barba",

    description:
      "Corte completo com design de barba e hidratação.",

    price: "R$ 70",

    duration: "50 min",

    icon: <Sparkles className="w-8 h-8" />,
  },

  {
    id: 3,

    name: "Barba",

    description:
      "Design e aparação com navalha e toalha quente.",

    price: "R$ 35",

    duration: "25 min",

    icon: <Blend className="w-8 h-8" />,
  },

  {
    id: 4,

    name: "Degradê",

    description:
      "Degradê moderno com acabamento detalhado.",

    price: "R$ 55",

    duration: "40 min",

    icon: <Wind className="w-8 h-8" />,
  },

  {
    id: 5,

    name: "Platinado",

    description:
      "Coloração profissional com produtos premium.",

    price: "R$ 120",

    duration: "90 min",

    icon: <Sparkles className="w-8 h-8" />,
  },

  {
    id: 6,

    name: "Corte Infantil",

    description:
      "Atendimento especial para crianças.",

    price: "R$ 35",

    duration: "25 min",

    icon: <Scissors className="w-8 h-8" />,
  },
]

export default function Services() {

  return (

    <div className="min-h-screen bg-[#0b0b0b] text-white py-20 px-4">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-20">

          <h1 className="text-5xl font-bold mb-5">
            Nossos Serviços
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Qualidade, estilo e profissionalismo em cada detalhe.
          </p>

        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">

          {services.map((service) => (

            <div

              key={service.id}

              className="bg-[#111] border border-gray-800 rounded-3xl p-7 hover:border-[#C89B55] transition-all duration-300 hover:-translate-y-1"
            >

              <div className="bg-[#C89B55]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-[#C89B55]">

                {service.icon}

              </div>

              <h3 className="text-2xl font-bold mb-3">
                {service.name}
              </h3>

              <p className="text-gray-400 mb-6 min-h-[60px]">
                {service.description}
              </p>

              <div className="flex items-center justify-between border-t border-gray-800 pt-5">

                <div>

                  <p className="text-2xl font-bold text-[#C89B55]">
                    {service.price}
                  </p>

                  <span className="text-sm text-gray-500">
                    {service.duration}
                  </span>

                </div>

                <NavLink

                  to="/pagamento"

                  className="bg-[#C89B55] hover:opacity-90 text-black px-5 py-2 rounded-xl font-semibold transition"
                >

                  Agendar

                </NavLink>

              </div>

            </div>

          ))}

        </div>

        {/* INFORMAÇÕES */}
        <div className="bg-[#111] border border-gray-800 rounded-[32px] p-10">

          <div className="grid md:grid-cols-2 gap-12">

            {/* ESQUERDA */}
            <div>

              <h2 className="text-3xl font-bold mb-6">
                Informações
              </h2>

              <ul className="space-y-4 text-gray-400">

                <li>
                  • Aceitamos PIX, cartão e dinheiro
                </li>

                <li>
                  • Atendimento premium e personalizado
                </li>

                <li>
                  • Produtos profissionais
                </li>

                <li>
                  • Ambiente climatizado
                </li>

                <li>
                  • Agendamento online rápido
                </li>

              </ul>

            </div>

            {/* DIREITA */}
            <div>

              <h2 className="text-3xl font-bold mb-6">
                Funcionamento
              </h2>

              <div className="space-y-4 text-gray-400">

                <div className="flex justify-between">

                  <span>Segunda - Sexta</span>

                  <span className="text-white">
                    09h às 20h
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Sábado</span>

                  <span className="text-white">
                    09h às 18h
                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Domingo</span>

                  <span className="text-red-400">
                    Fechado
                  </span>

                </div>

              </div>

              {/* BOTÕES */}
              <div className="flex flex-col gap-4 mt-8">

                <NavLink

                  to="/pagamento"

                  className="bg-[#C89B55] text-black py-4 rounded-2xl text-center font-bold hover:opacity-90 transition"
                >

                  Agendar Online

                </NavLink>

                <a

                  href="https://wa.me/5583999999999"

                  target="_blank"

                  className="border border-gray-700 hover:border-[#C89B55] py-4 rounded-2xl text-center font-semibold transition"
                >

                  WhatsApp

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}