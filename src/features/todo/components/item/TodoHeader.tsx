import { GenericButton } from "../../../../components/Button/Button";

interface TodoHeaderProps {
  filter: "all" | "done" | "pending";
  onChangeFilter: (filter: TodoHeaderProps["filter"]) => void;
}

export function TodoHeader({ onChangeFilter }: TodoHeaderProps) {
  return (
    <div className="flex justify-center">
      <div className="flex gap-4 mb-4">
        <GenericButton onClick={() => onChangeFilter("all")} className="text-purple-400">Todas</GenericButton>
        <GenericButton onClick={() => onChangeFilter("done")} className="text-purple-400">Concluídas</GenericButton>
        <GenericButton onClick={() => onChangeFilter("pending")} className="text-purple-400">Pendentes</GenericButton>
      </div>
    </div>
  );
}
