import type { User } from '@/models'

export const getFullName = (user: User): string => `${user.firstName} ${user.lastName}`

export const getInitials = (user: User): string => `${user.firstName[0]}${user.lastName[0]}`
