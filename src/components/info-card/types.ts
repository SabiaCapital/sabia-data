import type { ReactNode } from 'react'

export type InfoCardItem = {
	label: string
	value: ReactNode
}

export type InfoCardProps = {
	title: string
	description?: string
	icon: ReactNode
	items: InfoCardItem[]
	isLoading?: boolean
	isError?: boolean
	skeletonCount?: number
	className?: string
}
