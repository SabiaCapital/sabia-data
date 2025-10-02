import { createContext } from 'react'
import type { UserProviderState } from './types'

export const UserProviderContext = createContext<UserProviderState | undefined>(undefined)
