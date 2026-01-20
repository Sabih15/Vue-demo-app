export interface AppUser {
  id: number
  username: string
  role: 'admin' | 'user'
  active: boolean
}

let users: AppUser[] = [
  { id: 1, username: 'admin', role: 'admin', active: true },
  { id: 2, username: 'user', role: 'user', active: true },
  { id: 3, username: 'john', role: 'user', active: false }
]

export const getUsers = (): AppUser[] => {
  return users
}

export const toggleUserStatus = (id: number) => {
  const user = users.find(u => u.id === id)
  if (user) user.active = !user.active
}

export const changeUserRole = (id: number) => {
  const user = users.find(u => u.id === id)
  if (user) {
    user.role = user.role === 'admin' ? 'user' : 'admin'
  }
}
