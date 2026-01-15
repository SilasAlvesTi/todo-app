import { GenericButton } from "../../../../components/Button/Button";
import GenericInput from "../../../../components/Input/Input";

interface TodoHeaderProps {
  filter: "all" | "done" | "pending";
  onChangeFilter: (filter: TodoHeaderProps["filter"]) => void;
  onChangeText: (text: string) => void;
}

export function TodoHeader({ onChangeFilter, onChangeText }: TodoHeaderProps) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <GenericInput
        type="text"
        className="flex-1"
        placeholder="Buscar tarefa..."
        onChange={(e) => onChangeText(e.target.value)}
      />

      <div className="flex gap-2">
        <GenericButton onClick={() => onChangeFilter("all")} className="text-purple-400">
          Todas
        </GenericButton>
        <GenericButton onClick={() => onChangeFilter("done")} className="text-purple-400">
          Concluídas
        </GenericButton>
        <GenericButton onClick={() => onChangeFilter("pending")} className="text-purple-400">
          Pendentes
        </GenericButton>
      </div>
    </div>
  );
}
