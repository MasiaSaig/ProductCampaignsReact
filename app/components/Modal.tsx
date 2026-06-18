import { IconX } from '@/icons/X'

export interface ModalProps {
  title?: string
  exit: () => void
  children: React.ReactNode
}

export function Modal({ title = '', exit, children }: ModalProps) {
  function closeModal(e: any) {
    if (e.target === e.currentTarget) exit()
  }

  function handleCancel(e: any) {
    console.log('cancel')
    e.preventDefault()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
    >
      <dialog
        open
        className="relative flex flex-col w-full md:w-[calc(100vw-8rem)] sm:w-[calc(100vw-4rem)] max-w-3xl sm:max-h-[90vh] sm:h-auto h-screen sm:rounded-2xl shadow-2xl border-0 p-0 m-0 bg-white"
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900 leading-tight tracking-tight">
            {title}
          </h2>
          <button
            onClick={exit}
            aria-label="Close modal"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <IconX />
          </button>
        </header>

        <div className="overflow-y-auto flex-1 px-6 py-5 text-black">{children}</div>
      </dialog>
    </div>
  )
}
