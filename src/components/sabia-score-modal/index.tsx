import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/utils/number'
import type { SabiaScoreCalculation } from '@/lib/sabia-score'

interface SabiaScoreModalProps {
	calculation: SabiaScoreCalculation | null
}

export function SabiaScoreModal({ calculation }: SabiaScoreModalProps) {
	const [open, setOpen] = useState(false)

	if (!calculation) {
		return null
	}

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<Button
				type='button'
				variant='ghost'
				size='sm'
				className='h-6 w-6 p-0 text-xs'
				onClick={() => setOpen(true)}
				title='Ver memória de cálculo'
			>
				?
			</Button>

			<SheetContent side='right' className='w-full max-w-md overflow-hidden'>
				<SheetHeader className='flex flex-row items-center justify-between'>
					<SheetTitle>Score Sábia</SheetTitle>

					<SheetClose asChild>
						<Button type='button' variant='ghost' size='icon' className='h-8 w-8'>
							<X className='h-4 w-4' />
						</Button>
					</SheetClose>
				</SheetHeader>

				<ScrollArea className='h-[calc(100vh-80px)]'>
					<div className='space-y-6 p-4'>
						<div>
							<h3 className='text-sm font-semibold text-foreground mb-4'>Memória de Cálculo</h3>

							{/* Company Age */}
							<div className='space-y-2 mb-4'>
								<div className='text-sm font-medium text-foreground'>Tempo de empresa</div>
								<div className='text-sm text-muted-foreground'>
									{calculation.breakdown.companyAge.years}
									{calculation.breakdown.companyAge.years === 1 ? ' ano' : ' anos'}
								</div>
								<div className='text-sm font-semibold text-foreground'>
									{calculation.breakdown.companyAge.points} pontos
								</div>
							</div>

							<Separator className='my-3' />

							{/* Revenue */}
							<div className='space-y-2 mb-4'>
								<div className='text-sm font-medium text-foreground'>Faturamento</div>
								<div className='text-sm text-muted-foreground'>
									{calculation.breakdown.revenue.value > 0
										? formatCurrency(calculation.breakdown.revenue.value)
										: 'Não informado'}
								</div>
								<div className='text-sm font-semibold text-foreground'>
									{calculation.breakdown.revenue.points} pontos
								</div>
							</div>

							<Separator className='my-3' />

							{/* Capital Stock */}
							<div className='space-y-2 mb-4'>
								<div className='text-sm font-medium text-foreground'>Capital Social</div>
								<div className='text-sm text-muted-foreground'>
									{calculation.breakdown.capitalStock.value > 0
										? formatCurrency(calculation.breakdown.capitalStock.value)
										: 'Não informado'}
								</div>
								<div className='text-sm font-semibold text-foreground'>
									{calculation.breakdown.capitalStock.points} pontos
								</div>
							</div>

							<Separator className='my-3' />

							{/* Restrictions */}
							<div className='space-y-2 mb-4'>
								<div className='text-sm font-medium text-foreground'>Restritivos</div>
								<div className='text-sm text-muted-foreground'>
									{calculation.breakdown.restrictions.totalValue > 0
										? formatCurrency(calculation.breakdown.restrictions.totalValue)
										: 'Sem restritivos'}
								</div>
								<div className='text-sm font-semibold text-foreground'>
									{calculation.breakdown.restrictions.points} pontos
								</div>
							</div>

							<Separator className='my-3' />

							{/* Society Status */}
							<div className='space-y-2 mb-4'>
								<div className='text-sm font-medium text-foreground'>Situação societária</div>
								<div className='text-sm text-muted-foreground'>
									{calculation.breakdown.societyStatus.description}
								</div>
								<div className='text-sm font-semibold text-foreground'>
									{calculation.breakdown.societyStatus.points} pontos
								</div>
							</div>

							<Separator className='my-4' />

							{/* Total */}
							<div className='space-y-2 mb-4 bg-secondary/50 p-3 rounded'>
								<div className='text-sm font-medium text-foreground'>Total</div>
								<div className='text-base font-semibold text-foreground'>
									{calculation.totalScore} / {calculation.maxScore}
								</div>
								<div className='text-xs text-muted-foreground'>
									Classificação: {calculation.classification}
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}
