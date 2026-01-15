import { useEffect, useState } from "react";
import type { Tarefa } from "./types/tarefa";
import Header from "./components/Header";
import Item from "./components/item/Item";
import TodoForm from "./components/TodoForm";
import { TodoHeader } from "./components/item/TodoHeader";

export default function TodoApp() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    const saved = localStorage.getItem("tarefas");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filter === "done") return tarefa.concluida;
    if (filter === "pending") return !tarefa.concluida;
    return true;
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
      <TodoHeader filter={filter} onChangeFilter={setFilter} />
      <Item
        tarefas={tarefasFiltradas}
        onCompleteTarefa={handleComplete}
        onDeleteTarefa={handleDelete}
        onEditTarefa={handleEdit}
      />
      <TodoForm onAddTarefa={handleSubmit} />
    </>
  )
}