import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
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
					<SheetTitle>Score Sabia</SheetTitle>

					<SheetClose asChild>
						<Button type='button' variant='ghost' size='icon' className='h-8 w-8'>
							<X className='h-4 w-4' />
						</Button>
					</SheetClose>
				</SheetHeader>

				<ScrollArea className='h-[calc(100vh-80px)]'>
					<div className='space-y-6 p-4'>
						<div>
							<h3 className='text-foreground mb-4 text-sm font-semibold'>
								Memória de Cálculo
							</h3>

							{/* Company Age */}
							<div className='mb-4 space-y-2'>
								<div className='text-foreground text-sm font-medium'>
									Tempo de empresa
								</div>
								<div className='text-muted-foreground text-sm'>
									{calculation.breakdown.companyAge.years}
									{calculation.breakdown.companyAge.years === 1
										? ' ano'
										: ' anos'}
								</div>
								<div className='text-foreground text-sm font-semibold'>
									{calculation.breakdown.companyAge.points} pontos
								</div>
							</div>

							<Separator className='my-3' />

							{/* Revenue */}
							<div className='mb-4 space-y-2'>
								<div className='text-foreground text-sm font-medium'>
									Faturamento
								</div>
								<div className='text-muted-foreground text-sm'>
									{calculation.breakdown.revenue.value > 0
										? formatCurrency(calculation.breakdown.revenue.value)
										: 'Não informado'}
								</div>
								<div className='text-foreground text-sm font-semibold'>
									{calculation.breakdown.revenue.points} pontos
								</div>
							</div>

							<Separator className='my-3' />

							{/* Capital Stock */}
							<div className='mb-4 space-y-2'>
								<div className='text-foreground text-sm font-medium'>
									Capital Social
								</div>
								<div className='text-muted-foreground text-sm'>
									{calculation.breakdown.capitalStock.value > 0
										? formatCurrency(calculation.breakdown.capitalStock.value)
										: 'Não informado'}
								</div>
								<div className='text-foreground text-sm font-semibold'>
									{calculation.breakdown.capitalStock.points} pontos
								</div>
							</div>

							<Separator className='my-3' />

							{/* Restrictions */}
							<div className='mb-4 space-y-2'>
								<div className='text-foreground text-sm font-medium'>
									Restritivos
								</div>
								<div className='text-muted-foreground text-sm'>
									{calculation.breakdown.restrictions.totalValue > 0
										? formatCurrency(
												calculation.breakdown.restrictions.totalValue
											)
										: 'Sem restritivos'}
								</div>
								<div className='text-foreground text-sm font-semibold'>
									{calculation.breakdown.restrictions.points} pontos
								</div>
							</div>

							<Separator className='my-3' />

							{/* Society Status */}
							<div className='mb-4 space-y-2'>
								<div className='text-foreground text-sm font-medium'>
									Situação societária
								</div>
								<div className='text-muted-foreground text-sm'>
									{calculation.breakdown.societyStatus.description}
								</div>
								<div className='text-foreground text-sm font-semibold'>
									{calculation.breakdown.societyStatus.points} pontos
								</div>
							</div>

							<Separator className='my-4' />

							{/* Total */}
							<div className='bg-secondary/50 mb-4 space-y-2 rounded p-3'>
								<div className='text-foreground text-sm font-medium'>Total</div>
								<div className='text-foreground text-base font-semibold'>
									{calculation.totalScore} / {calculation.maxScore}
								</div>
								<div className='text-muted-foreground text-xs'>
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
