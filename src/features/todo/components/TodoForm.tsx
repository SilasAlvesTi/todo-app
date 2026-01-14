import { useState } from "react";

interface FormProps {
  onAddTarefa: (nome: string) => void;
}

export default function({ onAddTarefa } : FormProps) {
  const [nome, setNome] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onAddTarefa(nome);
    setNome("");
  }

  return(
    <div className="flex justify-center items-center mt-6">
      <form onSubmit={handleSubmit} className="flex gap-6">
        <input 
          type="text"
          className="text-purple-400 border-2 border-purple-200"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <button 
          type="submit"
          className="bg-transparent text-white">
          Adicionar Tarefa
        </button>
      </form>
    </div>
  );
}