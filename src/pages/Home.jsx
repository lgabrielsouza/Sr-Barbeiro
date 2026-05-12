import { FaWhatsapp, FaInstagram, FaBeer, FaSnowflake, FaUserTie, FaBars } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {

  const [menuOpen, setMenuOpen] = useState(false);

  const imagens = [
    { img: "https://picsum.photos/500/400?1", tipo: "ANTES" },
    { img: "https://picsum.photos/500/400?2", tipo: "DEPOIS" },
    { img: "https://picsum.photos/500/400?3", tipo: "ANTES" },
    { img: "https://picsum.photos/500/400?4", tipo: "DEPOIS" },
    { img: "https://picsum.photos/500/400?5", tipo: "ANTES" },
    { img: "https://picsum.photos/500/400?6", tipo: "DEPOIS" },
  ];

  const catalogo = [
    { nome: "Corte Social", preco: "R$ 40", desc: "Corte tradicional com acabamento." },
    { nome: "Degradê", preco: "R$ 50", desc: "Fade moderno com transição suave." },
    { nome: "Barba", preco: "R$ 30", desc: "Navalha + toalha quente." },
    { nome: "Combo", preco: "R$ 70", desc: "Corte + barba.", destaque: true },
  ];

  return (
    <div className="bg-[#0F0F0F] text-white pt-20">

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

          <h1 className="text-[#C89B55] font-bold">O Corte & Navalha</h1>

          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#servicos">Serviços</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#galeria">Galeria</a>
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <FaBars />
          </button>

          <a href="/pagamento" className="hidden md:block bg-[#C89B55] px-4 py-2 rounded text-black">
            Agendar
          </a>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-black p-4 flex flex-col gap-3">
            <a href="#servicos">Serviços</a>
            <a href="#catalogo">Catálogo</a>
            <a href="#galeria">Galeria</a>
            <a href="/pagamento" className="bg-[#C89B55] text-black px-4 py-2 rounded text-center">
              Agendar
            </a>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="h-screen flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            Mais que um corte, <span className="text-[#C89B55]">um ritual</span>
          </h1>

          <p className="text-gray-400 mt-4">
            Experiência premium em cada detalhe
          </p>

          <a href="/pagamento" className="mt-6 inline-block bg-[#C89B55] text-black px-6 py-3 rounded-xl">
            Agendar Agora
          </a>
        </motion.div>
      </section>

      {/* CATÁLOGO (RESTAURADO) */}
      <motion.section
        id="catalogo"
        className="max-w-6xl mx-auto py-20 px-4"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-3xl text-center mb-12">Catálogo de Preços</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {catalogo.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl ${
                item.destaque
                  ? "border-2 border-[#C89B55] bg-black/40"
                  : "border border-gray-800"
              }`}
            >
              <h3 className="text-xl mb-2">{item.nome}</h3>

              <p className="text-gray-400 mb-4">{item.desc}</p>

              <span className="text-[#C89B55] font-bold">{item.preco}</span>

              <a
                href="/pagamento"
                className="block mt-4 bg-[#C89B55] text-black py-2 rounded text-center"
              >
                Agendar
              </a>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* GALERIA */}
      <section id="galeria" className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-3xl text-center mb-12">Resultados Reais</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imagens.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-xl group"
            >
              <img src={item.img} className="w-full h-56 object-cover" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* DIFERENCIAIS */}
      <section className="bg-black py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">

          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }}>
            <FaBeer className="mx-auto text-[#C89B55]" />
            <p>Cerveja artesanal</p>
          </motion.div>

          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }}>
            <FaSnowflake className="mx-auto text-[#C89B55]" />
            <p>Ambiente climatizado</p>
          </motion.div>

          <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 50 }}>
            <FaUserTie className="mx-auto text-[#C89B55]" />
            <p>Profissionais experientes</p>
          </motion.div>

        </div>
      </section>

      {/* WHATSAPP */}
      <a href="https://wa.me/5583999999999"
        className="fixed bottom-4 right-4 bg-green-500 p-4 rounded-full">
        <FaWhatsapp />
      </a>

      {/* INSTAGRAM */}
      <a href="https://instagram.com/SEU_USUARIO"
        className="fixed bottom-20 right-4 bg-pink-500 p-4 rounded-full">
        <FaInstagram />
      </a>

    </div>
  )
}