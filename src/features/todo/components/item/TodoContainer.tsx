interface TodoContainerProps {
  children: React.ReactNode;
}

export function TodoContainer({ children }: TodoContainerProps) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-xl">
        {children}
      </div>
    </div>
  );
}
