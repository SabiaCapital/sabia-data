import js from '@eslint/js'
import globals from 'globals'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'
import pluginQuery from '@tanstack/eslint-plugin-query'

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			eslintPluginPrettierRecommended,
		],
		files: ['**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'@tanstack/query': pluginQuery,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...pluginQuery.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'off',
		},
	}
)
