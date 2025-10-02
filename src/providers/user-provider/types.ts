import type { User } from '@supabase/supabase-js'

export type UserProviderProps = {
	children: React.ReactNode
	storageKey?: string
}

export type UserProviderState = {
	user: User | null
	login: (
		email: string,
		password: string
	) => Promise<
		| { success: true; data: User }
		| { success: false; error: { code?: string; message: string } }
	>
	logout: () => Promise<
		{ success: true } | { success: false; error: { code?: string; message: string } }
	>
}
