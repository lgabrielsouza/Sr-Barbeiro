import { Link } from "react-router-dom"

export default function Confirmado() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">

      <h1 className="text-3xl font-bold mb-4 text-green-500">
        Pagamento Confirmado!
      </h1>

      <p className="mb-6 text-gray-400">
        Seu horário foi reservado com sucesso.
      </p>

      <Link
        to="/"
        className="bg-[#C89B55] text-black px-6 py-3 rounded"
      >
        Voltar ao início
      </Link>

    </div>
  );
}