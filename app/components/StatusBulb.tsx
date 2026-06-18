interface statusBulbProps {
  isActive: Boolean
}

export function StatusBulb({ isActive }: statusBulbProps) {
  return (
    <div
      className={
        'size-5 rounded-full ring-2 ' +
        (isActive ? 'bg-green-400 ring-green-400/50' : 'bg-red-500 ring-red-500/50')
      }
    ></div>
  )
}
