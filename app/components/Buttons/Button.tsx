import '@/Buttons/Button.css'

export interface ButtonProps {
  className?: string
  onClick: () => void
  children: React.ReactNode
}

export function Button({ className = '', onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className={'jumping-button ' + className}>
      {children}
    </button>
  )
}
