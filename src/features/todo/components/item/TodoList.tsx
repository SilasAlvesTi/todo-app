interface TodoListProps {
  children: React.ReactNode;
}

export function TodoList({ children }: TodoListProps) {
  return (
    <div className="w-full flex flex-col items-center">
      {children}
    </div>
  );
}
