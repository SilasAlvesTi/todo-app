interface TodoItemProps {
  children: React.ReactNode;
}

export function TodoItem({ children }: TodoItemProps) {
  return (
    <div className="w-full max-w-xl grid grid-cols-[32px_1fr_160px] items-center px-4 py-2 border-b border-purple-200">
      {children}
    </div>
  );
}
