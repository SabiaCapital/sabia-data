export type Theme = 'dark' | 'light' | 'system'

export type ThemeProviderProps = {
	children: React.ReactNode
	storageKey?: string
	defaultTheme?: Theme
}

export type ThemeProviderState = {
	theme: Theme
	setTheme: (theme: Theme) => void
}
