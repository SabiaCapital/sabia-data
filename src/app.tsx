import { type ComponentType, lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import {
	LOGIN_PATH,
	MAIN_PATH,
	OPERATIONS_PATH,
	OPERATION_PATH,
	CNPJ_SEARCH_PATH,
} from '@/constants/paths'
import { Toaster } from '@/components/ui/sonner'
import { Router } from '@/components/router'

const LoginPage = lazy(() => import('@/pages/login').then((m) => ({ default: m.LoginPage })))
const MainPage = lazy(() => import('@/pages/main').then((m) => ({ default: m.MainPage })))
const OperationsPage = lazy(() =>
	import('@/pages/operations').then((m) => ({ default: m.OperationsPage }))
)
const OperationPage = lazy(() =>
	import('@/pages/operation').then((m) => ({ default: m.OperationPage }))
)
const CnpjSearchPage = lazy(() =>
	import('@/pages/cnpj-search').then((m) => ({ default: m.CnpjSearchPage }))
)

type RouteConfig = {
	path: string
	element: ComponentType
	isAuth?: boolean
}

const routes: RouteConfig[] = [
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
			<Suspense>
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
			</Suspense>

			<Toaster position='top-center' richColors />
		</div>
	)
}
