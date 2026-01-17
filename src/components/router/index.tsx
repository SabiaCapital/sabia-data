import { Navigate } from 'react-router'
import { LOGIN_PATH, MAIN_PATH } from '@/constants/paths'
import { useUser } from '@/hooks/use-user'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { Header } from '@/components/header'
import { Menu } from '@/components/menu'
import type { RouterProps } from './types'

export function Router({ children, isAuthRoute }: RouterProps) {
	const { user } = useUser()

	if (isAuthRoute) {
		return user ? <Navigate to={MAIN_PATH} replace /> : children
	}

	if (user) {
		return (
			<SidebarProvider>
				<Menu />

				<SidebarInset>
					<Header />
					<main className='mt-16 p-6 md:p-8'>{children}</main>
				</SidebarInset>
			</SidebarProvider>
		)
	}

	return <Navigate to={LOGIN_PATH} replace />
}
