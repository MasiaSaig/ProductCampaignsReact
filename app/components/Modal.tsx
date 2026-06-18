import { IconX } from '@/icons/X'

export interface ModalProps {
  title?: string
  exit: () => void
  children: React.ReactNode
}

export function Modal({ title = '', exit, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.45)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) exit()
      }}
    >
      <dialog
        open
        className="relative flex flex-col w-full md:w-[calc(100vw-8rem)] sm:w-[calc(100vw-4rem)] max-w-3xl sm:max-h-[90vh] sm:h-auto h-screen sm:rounded-2xl shadow-2xl border-0 p-0 m-0 bg-white"
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
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

// ── Demo ─────────────────────────────────────────────────────────────────────
// export default function App() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <button
//         onClick={() => setOpen(true)}
//         className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-400"
//       >
//         Open Modal
//       </button>

//       {open && (
//         <Modal title="Example Modal" exit={() => setOpen(false)}>
//           <p className="text-gray-600 text-sm leading-relaxed">
//             This is the modal body. Any children can be placed here — forms,
//             images, lists, or custom components.
//           </p>
//           <div className="mt-4 p-4 rounded-lg bg-gray-50 text-sm text-gray-500">
//             Slot for any <strong className="text-gray-700">React node</strong> you'd like to insert.
//           </div>
//           <div className="mt-6 flex justify-end gap-3">
//             <button
//               onClick={() => setOpen(false)}
//               className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors duration-150"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => setOpen(false)}
//               className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors duration-150"
//             >
//               Confirm
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }
