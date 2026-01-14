import { useState } from "react";
import type { Tarefa } from "../types/tarefa";

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
    <div className="w-full flex flex-col items-center gap-2">
      {tarefas.map((tarefa) => (
        <div
          key={tarefa.id}
          className="w-full max-w-xl grid grid-cols-[32px_1fr_160px] items-center px-4 py-2 border-b border-purple-200"
        >
          <div className="flex justify-start">
            <input
              type="checkbox"
              checked={!!tarefa.concluida}
              onChange={() => onCompleteTarefa(tarefa.id)}
            />
          </div>

          <div className="px-4">
            {editingId === tarefa.id ? (
              <input
                type="text"
                className="w-full border-2 border-purple-200 px-2 text-purple-400"
                value={editingNome}
                onChange={(e) => setEditingNome(e.target.value)}
              />
            ) : (
              <p
                className={`text-lg break-words ${
                  tarefa.concluida
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
                <button
                  className="text-green-400"
                  onClick={() => saveEdit(tarefa.id)}
                >
                  Salvar
                </button>
                <button
                  className="text-gray-400"
                  onClick={() => setEditingId(null)}
                >
                  Cancelar
                </button>
              </>
            ) : (
              <button
                className="text-blue-400"
                onClick={() => startEdit(tarefa)}
              >
                Editar
              </button>
            )}

            <button
              className="text-red-400"
              onClick={() => onDeleteTarefa(tarefa.id)}
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
