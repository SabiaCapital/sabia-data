import type { ReactNode } from 'react'

type Column<T> = {
	key: Extract<keyof T, string | number>
	header?: ReactNode
	render?: (row: T, index: number) => ReactNode
}

export type DataTableProps<T> = {
	tableCellClassName?: string
	data: T[]
	columns: Column<T>[]
	title: ReactNode
	isLoading?: boolean
	isError?: boolean
	pagination?: {
		page: number
		pageSize: number
		totalItems: number
		onPageChange: (page: number) => void
	}
	search?: {
		placeholder: string
		value: string
		onSearch: (value: string) => void
	}
}
