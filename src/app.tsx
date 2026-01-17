import type { JSX } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import {
	LOGIN_PATH,
	MAIN_PATH,
	OPERATIONS_PATH,
	OPERATION_PATH,
	CNPJ_SEARCH_PATH,
} from '@/constants/paths'
import { LoginPage } from '@/pages/login'
import { MainPage } from '@/pages/main'
import { OperationsPage } from '@/pages/operations'
import { OperationPage } from '@/pages/operation'
import { CnpjSearchPage } from '@/pages/cnpj-search'
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
		path: OPERATIONS_PATH,
		element: OperationsPage,
	},
	{
		path: OPERATION_PATH,
		element: OperationPage,
	},
	{
		path: CNPJ_SEARCH_PATH,
		element: CnpjSearchPage,
	},
]

export function App() {
	return (
		<div className='min-h-screen w-full'>
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
