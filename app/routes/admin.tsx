import type { Route } from './+types/admin'
import { AdminPanel } from '~/adminPanel/adminPanel'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New Admin React Router App' },
    { name: 'description', content: 'Welcome to Admin React Router!' },
  ]
}

export default function Admin() {
  return <AdminPanel />
}
