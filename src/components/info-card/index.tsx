import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import { SKELETON_WIDTHS } from './helpers'
import type { InfoCardProps } from './types'

export function InfoCard({
	title,
	description,
	icon,
	items,
	isLoading = false,
	isError = false,
	skeletonCount = 4,
	className,
}: InfoCardProps) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardDescription>{description}</CardDescription>

				<CardTitle className='text-2xl font-semibold'>{title}</CardTitle>

				<CardAction>
					{isLoading ? (
						<Spinner className='h-6 w-6' />
					) : (
						<Badge className='h-8 w-8' variant='outline'>
							{icon}
						</Badge>
					)}
				</CardAction>
			</CardHeader>

			<CardContent className='flex flex-col gap-1'>
				{isLoading ? (
					<>
						{Array.from({ length: skeletonCount }).map((_, i) => (
							<Skeleton
								key={i}
								className={`h-5 ${SKELETON_WIDTHS[i % SKELETON_WIDTHS.length]}`}
							/>
						))}
					</>
				) : isError ? (
					<p>Ocorreu um erro ao buscar os dados. Tente novamente mais tarde.</p>
				) : (
					<>
						{items.map(({ label, value }) => (
							<span key={label} className='text-sm'>
								{label}: {value}
							</span>
						))}
					</>
				)}
			</CardContent>
		</Card>
	)
}
