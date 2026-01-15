import { useEffect, useState } from "react";
import type { Tarefa } from "./types/tarefa";
import Header from "./components/Header";
import Item from "./components/item/Item";
import TodoForm from "./components/TodoForm";
import { TodoHeader } from "./components/item/TodoHeader";
import { TodoContainer } from "./components/item/TodoContainer";

export default function TodoApp() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    const saved = localStorage.getItem("tarefas");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");
  const [text, setText] = useState('')

  const tarefasVisiveis = tarefas.filter((tarefa) => {
    const matchFilter =
      filter === "all" ||
      (filter === "done" && tarefa.concluida) ||
      (filter === "pending" && !tarefa.concluida);

    const matchSearch = tarefa.nome
      .toLowerCase()
      .includes(text.toLowerCase());

    return matchFilter && matchSearch;
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
      <TodoContainer>
        <TodoHeader filter={filter} onChangeFilter={setFilter} onChangeText={setText}/>
        <Item
          tarefas={tarefasVisiveis}
          onCompleteTarefa={handleComplete}
          onDeleteTarefa={handleDelete}
          onEditTarefa={handleEdit}
        />
      </TodoContainer>
      <TodoForm onAddTarefa={handleSubmit} />
    </>
  )
}