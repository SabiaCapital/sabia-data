import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		try {
			const storedValue = localStorage.getItem(key)
			return storedValue ? JSON.parse(storedValue) : initialValue
		} catch (error) {
			console.warn(`Error reading localStorage key "${key}":`, error)
			return initialValue
		}
	})

	useEffect(() => {
		try {
			if (value === null || value === undefined) {
				localStorage.removeItem(key)
			} else {
				localStorage.setItem(key, JSON.stringify(value))
			}
		} catch (error) {
			console.warn(`Error writing localStorage key "${key}":`, error)
		}
	}, [key, value])

	return [value, setValue] as const
}
