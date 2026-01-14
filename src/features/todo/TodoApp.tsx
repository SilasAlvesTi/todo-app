import { useEffect, useState } from "react";
import type { Tarefa } from "./types/tarefa";
import Header from "./components/Header";
import Item from "./components/item/Item";
import TodoForm from "./components/TodoForm";

export default function TodoApp() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    const saved = localStorage.getItem("tarefas");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  function handleSubmit(nome: string) {
    if (nome === "") {
      return;
    }
    setTarefas((anteriores) => [
      ...anteriores,
      {
        id: crypto.randomUUID(),
        nome,
        concluida: false,
      },
    ]);
  }

  function handleComplete(id: string) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function handleDelete(id: string) {
    setTarefas((anteriores) =>
      anteriores.filter((tarefa) =>
        tarefa.id !== id
      )
    )
  }

  function handleEdit(id: string, novoNome: string) {
    setTarefas((anteriores) =>
      anteriores.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, nome: novoNome }
          : tarefa
      )
    );
  }

  return (
    <>
      <Header />
      <Item
        tarefas={tarefas}
        onCompleteTarefa={handleComplete}
        onDeleteTarefa={handleDelete}
        onEditTarefa={handleEdit}
      />
      <TodoForm onAddTarefa={handleSubmit} />
    </>
  )
}