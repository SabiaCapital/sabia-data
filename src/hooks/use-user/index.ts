import { useContext } from 'react'
import { UserProviderContext } from '@/providers/user-provider/helpers'

export function useUser() {
	const context = useContext(UserProviderContext)

	if (context === undefined) throw new Error('useUser must be used within a UserProvider')

	return context
}
