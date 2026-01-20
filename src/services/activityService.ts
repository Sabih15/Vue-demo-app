export interface Activity {
  id: number
  message: string
  date: string
}

export const getRecentActivities = (): Activity[] => {
  return [
    { id: 1, message: 'Logged in', date: 'Today' },
    { id: 2, message: 'Viewed dashboard', date: 'Today' },
    { id: 3, message: 'Updated profile', date: 'Yesterday' }
  ]
}
