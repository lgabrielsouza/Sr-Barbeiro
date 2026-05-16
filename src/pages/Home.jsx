import { NavLink } from "react-router-dom";
import { Scissors, Clock, Award, Users } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="relative h-[600px] bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1610475680335-dafab5475150?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Interior da barbearia"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Estilo & Tradição
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-neutral-200">
              A melhor experiência em cortes masculinos. Profissionais
              qualificados e ambiente acolhedor.
            </p>

            <div className="flex flex-wrap gap-4">
              <NavLink
                to="/pagamento"
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-md font-semibold transition-colors shadow-lg"
              >
                Agendar Agora
              </NavLink>

              <NavLink
                to="/services"
                className="border-2 border-white hover:bg-white hover:text-neutral-900 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Ver Serviços
              </NavLink>

              <a
                href="#galeria"
                className="border-2 border-white hover:bg-white hover:text-neutral-900 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Galeria
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Por que nos escolher?
            </h2>

            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Combinamos técnicas tradicionais com as tendências mais modernas
              do mercado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-amber-600" />
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Profissionais
              </h3>

              <p className="text-neutral-600">
                Barbeiros experientes e altamente qualificados
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Pontualidade
              </h3>

              <p className="text-neutral-600">
                Agendamento online e horários flexíveis
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-amber-600" />
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Qualidade
              </h3>

              <p className="text-neutral-600">
                Produtos premium e equipamentos modernos
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-amber-600" />
              </div>

              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Atendimento
              </h3>

              <p className="text-neutral-600">
                Ambiente acolhedor e atendimento personalizado
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-neutral-900 mb-6">
                Mais de 10 anos de experiência
              </h2>

              <p className="text-lg text-neutral-600 mb-6">
                Nossa barbearia é referência em cortes masculinos, barba e
                tratamentos capilares. Cada cliente recebe atenção especial e
                um serviço personalizado de acordo com seu estilo.
              </p>

              <p className="text-lg text-neutral-600 mb-8">
                Utilizamos apenas produtos de alta qualidade e mantemos nossos
                profissionais sempre atualizados com as últimas tendências e
                técnicas do mercado.
              </p>

              <a
                href="#catalogo"
                className="inline-block bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Conheça nossos serviços
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1754294437661-129b86f868ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                alt="Barbearia"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />

              <img
                src="https://images.unsplash.com/photo-1759142449398-89357aa1bb36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                alt="Barbearia"
                className="w-full h-64 object-cover rounded-lg shadow-lg mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-amber-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para um novo visual?
          </h2>

          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agende seu horário agora e garanta o melhor atendimento
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <NavLink
              to="/pagamento"
              className="inline-block bg-white text-amber-500 hover:bg-neutral-100 px-8 py-3 rounded-md font-semibold transition-colors shadow-lg"
            >
              Agendar Online
            </NavLink>

            <a
              href="https://wa.me/5583999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-white hover:bg-white hover:text-amber-500 text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}