import type { JSX } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { LOGIN_PATH, MAIN_PATH, OPERATION_PATH, CLIENT_PATH } from '@/constants/paths'
import { LoginPage } from '@/pages/login'
import { MainPage } from '@/pages/main'
import { OperationPage } from '@/pages/operation'
import { ClientPage } from '@/pages/client'
import { Toaster } from '@/components/ui/sonner'
import { Router } from '@/components/router'

type Route = {
	path: string
	element: () => JSX.Element
	isAuth?: boolean
}

const routes: Route[] = [
	{
		path: LOGIN_PATH,
		element: LoginPage,
		isAuth: true,
	},
	{
		path: MAIN_PATH,
		element: MainPage,
	},
	{
		path: OPERATION_PATH,
		element: OperationPage,
	},
	{
		path: CLIENT_PATH,
		element: ClientPage,
	},
]

export function App() {
	return (
		<div className='flex min-h-screen flex-col'>
			<Routes>
				{routes.map(({ path, element: Page, isAuth }) => (
					<Route
						key={path}
						path={path}
						element={
							<Router isAuthRoute={isAuth}>
								<Page />
							</Router>
						}
					/>
				))}

				<Route path='*' element={<Navigate to={MAIN_PATH} replace />} />
			</Routes>

			<Toaster position='top-center' richColors />
		</div>
	)
}
