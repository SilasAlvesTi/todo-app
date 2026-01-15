type GenericButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function GenericButton({className = "", ...props}: GenericButtonProps) {
  return (
    <button
      className={`border border-solid border-purple-200 p-2 cursor-pointer ${className}`}
      {...props}
    />
  )
}