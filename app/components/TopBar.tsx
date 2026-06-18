import { Link } from 'react-router'

export function TopBar() {
  return (
    <header className="w-full bg-gray-300 mb-4">
      <nav className="flex justify-center gap-4">
        <Link to="/admin">Admin</Link>
        <Link to="/">Home</Link>
      </nav>
    </header>
  )
}
