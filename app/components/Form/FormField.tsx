interface FormFieldPorps {
  label: string
  required?: boolean
  error?: string
  children: React.ReactNode
  hint?: string
}

export function FormField({
  label,
  required = false,
  error = '',
  children,
  hint = '',
}: FormFieldPorps) {
  return (
    <div className="mb-[20px] flex flex-col">
      <label>
        {label}
        {required && <span style={{ color: '#6366f1', marginLeft: '3px' }}>*</span>}
      </label>
      {hint && (
        <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '5px' }}>{hint}</div>
      )}
      {children}
      {error && <div>{error}</div>}
    </div>
  )
}
