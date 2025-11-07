import { useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import type { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { BLACK_TOKEN_STORAGE_KEY, MANTYZ_TOKEN_STORAGE_KEY } from '@/constants/storage'
import { UNAUTHORIZED_EVENT } from '@/constants/events'
import { getToken as getBlackToken } from '@/api/black'
import { getToken as getMantyzToken } from '@/api/mantyz'
import { useLocalStorage } from '@/hooks/use-local-storage'
import type { UserProviderProps, UserProviderState } from './types'
import { UserProviderContext } from './helpers'

export function UserProvider({ children, storageKey = 'user', ...props }: UserProviderProps) {
	const [user, setUser] = useLocalStorage<User | null>(storageKey, null)

	const login: UserProviderState['login'] = async (email, password) => {
		try {
			const response = await supabase.auth.signInWithPassword({ email, password })

			if (response.error) {
				return {
					success: false,
					error: {
						code: response.error.code,
						message: 'Erro inesperado ao fazer login. Tente novamente mais tarde.',
					},
				}
			}

			const blackToken = await getBlackToken()
			const mantyzToken = await getMantyzToken()

			setUser(response.data.user)

			localStorage.setItem(BLACK_TOKEN_STORAGE_KEY, blackToken)
			localStorage.setItem(MANTYZ_TOKEN_STORAGE_KEY, mantyzToken)

			return {
				success: true,
				data: response.data.user,
			}
		} catch {
			return {
				success: false,
				error: { message: 'Erro inesperado ao fazer login. Tente novamente mais tarde.' },
			}
		}
	}

	const logout = useCallback<UserProviderState['logout']>(async () => {
		try {
			const response = await supabase.auth.signOut()

			if (response.error) {
				return {
					success: false,
					error: {
						code: response.error.code,
						message: 'Erro inesperado ao encerrar sessão. Tente novamente mais tarde.',
					},
				}
			}

			setUser(null)

			localStorage.removeItem(BLACK_TOKEN_STORAGE_KEY)
			localStorage.removeItem(MANTYZ_TOKEN_STORAGE_KEY)

			return { success: true }
		} catch {
			return {
				success: false,
				error: {
					message: 'Erro inesperado ao encerrar sessão. Tente novamente mais tarde.',
				},
			}
		}
	}, [setUser])

	useEffect(() => {
		const handleUnauthorized = () => {
			logout()
				.catch((err) => {
					console.error('Erro ao encerrar sessão automaticamente:', err)
				})
				.finally(() => {
					toast.warning('Sua sessão expirou. Faça login novamente.')
				})
		}

		window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized)

		return () => {
			window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized)
		}
	}, [logout])

	return (
		<UserProviderContext.Provider {...props} value={{ user, login, logout }}>
			{children}
		</UserProviderContext.Provider>
	)
}
