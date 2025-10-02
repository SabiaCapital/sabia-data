import { useEffect } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import type { Theme, ThemeProviderProps } from './types'
import { ThemeProviderContext } from './helpers'

export function ThemeProvider({
	children,
	storageKey = 'theme',
	defaultTheme = 'system',
	...props
}: ThemeProviderProps) {
	const [theme, setTheme] = useLocalStorage<Theme>(storageKey, defaultTheme)

	useEffect(() => {
		const root = window.document.documentElement

		root.classList.remove('light', 'dark')

		if (theme === 'system') {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	return (
		<ThemeProviderContext.Provider {...props} value={{ theme, setTheme }}>
			{children}
		</ThemeProviderContext.Provider>
	)
}
