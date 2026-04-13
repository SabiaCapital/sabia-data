import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import { queryClient } from '@/lib/react-query'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import { THEME_STORAGE_KEY, USER_STORAGE_KEY } from './constants/storage'
import { ThemeProvider } from '@/providers/theme-provider'
import { UserProvider } from '@/providers/user-provider'
import { App } from './app'
import '@/lib/dayjs'
import './main.css'

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<BrowserRouter>
			<ThemeProvider storageKey={THEME_STORAGE_KEY} defaultTheme='system'>
				<UserProvider storageKey={USER_STORAGE_KEY}>
					<TooltipProvider delayDuration={200}>
						<App />
					</TooltipProvider>
				</UserProvider>
			</ThemeProvider>
		</BrowserRouter>
	</QueryClientProvider>
)
