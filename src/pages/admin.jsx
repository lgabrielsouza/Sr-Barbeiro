import { useState } from "react"

export default function Admin() {

  const [aba, setAba] = useState("dashboard")

  const [agendamentos, setAgendamentos] = useState(() => {

    return (
      JSON.parse(
        localStorage.getItem("agendamentos")
      ) || []
    )
  })

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
            <div className="grid md:grid-cols-3 gap-6 mb-10">

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

                        onClick={() => {

                          const novosAgendamentos = [...agendamentos]

                          novosAgendamentos[index].status =
                            "confirmado"

                          novosAgendamentos[index].pagamento =
                            "confirmado"

                          setAgendamentos(novosAgendamentos)

                          localStorage.setItem(
                            "agendamentos",
                            JSON.stringify(novosAgendamentos)
                          )
                        }}

                        className="bg-[#C89B55] hover:opacity-90 text-black px-4 py-2 rounded-xl font-semibold transition"
                      >

                        Confirmar

                      </button>

                    )}

                    <button

                      onClick={() => {

                        const novaLista =
                          agendamentos.filter(
                            (_, i) => i !== index
                          )

                        setAgendamentos(novaLista)

                        localStorage.setItem(
                          "agendamentos",
                          JSON.stringify(novaLista)
                        )
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

      </main>

    </div>
  )
}