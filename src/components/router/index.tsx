import { Navigate } from 'react-router'
import { LOGIN_PATH, MAIN_PATH } from '@/constants/paths'
import { useUser } from '@/hooks/use-user'
import { Header } from '@/components/header'
import type { RouterProps } from './types'

export function Router({ children, isAuthRoute }: RouterProps) {
	const { user } = useUser()

	if (isAuthRoute) {
		return user ? <Navigate to={MAIN_PATH} replace /> : children
	}

	if (user) {
		return (
			<>
				<Header />
				<main className='p-10'>{children}</main>
			</>
		)
	}

	return <Navigate to={LOGIN_PATH} replace />
}
