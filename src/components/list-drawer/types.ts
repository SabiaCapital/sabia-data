import type { ReactNode } from 'react'

export type ListDrawerColumn<T> = {
	header: string
	render: (item: T) => ReactNode
}

export type ListDrawerProps<T> = {
	title: string
	triggerLabel: string
	columns: ListDrawerColumn<T>[]
	data: T[]
}
