import { useState } from "react";
import { GenericButton } from "../../../components/Button/Button";
import GenericInput from "../../../components/Input/Input";

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
        <GenericInput 
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <GenericButton 
          type="submit"
          className="text-white">
          Adicionar Tarefa
        </GenericButton>
      </form>
    </div>
  );
}