import '@/Buttons/Button.css'

export interface ButtonProps {
  className?: string
  style?: React.CSSProperties
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  onClick?: () => void
  children: React.ReactNode
}

export default function Button({
  className,
  style,
  type = 'button',
  onClick,
  children,
}: ButtonProps) {
  return (
    <button type={type} onClick={onClick} className={'jumping-button ' + className} style={style}>
      {children}
    </button>
  )
}
