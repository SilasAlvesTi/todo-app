import { useState } from "react";
import type { Tarefa } from "../../types/tarefa";
import { GenericButton } from "../../../../components/Button/Button";
import GenericInput from "../../../../components/Input/Input";
import { TodoItem } from "./TodoItem";

interface ItemProps {
  tarefas: Tarefa[];
  onCompleteTarefa: (id: string) => void;
  onDeleteTarefa: (id: string) => void;
  onEditTarefa: (id: string, novoNome: string) => void;
}

export default function Item({
  tarefas,
  onCompleteTarefa,
  onDeleteTarefa,
  onEditTarefa,
}: ItemProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingNome, setEditingNome] = useState("");

  function startEdit(tarefa: Tarefa) {
    setEditingId(tarefa.id);
    setEditingNome(tarefa.nome);
  }

  function saveEdit(id: string) {
    onEditTarefa(id, editingNome);
    setEditingId(null);
    setEditingNome("");
  }

  return (
    <>
      {tarefas.map((tarefa) => (
        <TodoItem
          key={tarefa.id}
        >
          <div className="flex justify-start">
            <GenericInput
              type="checkbox"
              checked={!!tarefa.concluida}
              onChange={() => onCompleteTarefa(tarefa.id)}
            />
          </div>

          <div className="px-4">
            {editingId === tarefa.id ? (
              <GenericInput
                type="text"
                className="w-full"
                value={editingNome}
                onChange={(e) => setEditingNome(e.target.value)}
              />
            ) : (
              <p
                className={`text-lg break-all max-w-md ${tarefa.concluida
                    ? "line-through text-gray-400"
                    : "text-purple-400"
                  }`}
              >
                {tarefa.nome}
              </p>
            )}
          </div>

          <div className="flex justify-end items-center gap-2">
            {editingId === tarefa.id ? (
              <>
                <GenericButton
                  className="text-green-400"
                  onClick={() => saveEdit(tarefa.id)}
                >
                  Salvar
                </GenericButton>
                <GenericButton
                  className="text-gray-400 text-sm"
                  onClick={() => setEditingId(null)}
                >
                  Cancelar
                </GenericButton>
              </>
            ) : (
              <>
                <GenericButton
                  className="text-blue-400"
                  onClick={() => startEdit(tarefa)}
                >
                  Editar
                </GenericButton>
                <GenericButton
                  className="text-red-400"
                  onClick={() => onDeleteTarefa(tarefa.id)}
                >
                  Deletar
                </GenericButton>
              </>
            )}

          </div>
        </TodoItem>
      ))}
      <h1 className="flex justify-end text-purple-200 mt-2">Total: {tarefas.length}</h1>
    </>
  );
}
