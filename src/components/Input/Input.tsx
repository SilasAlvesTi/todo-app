type GenericInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function GenericInput({className, type, ...props}: GenericInputProps) {
  return (
    <input 
      type={type}
      className={`px-2 text-purple-400 border-2 border-purple-200 ${className}`}
      {...props}
    />
  );
}