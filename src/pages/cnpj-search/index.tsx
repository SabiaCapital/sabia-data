import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
	Landmark,
	Search,
	ShieldCheck,
	TextSearchIcon,
	TrendingUp,
	WindIcon,
	AlertCircleIcon,
	AlertTriangle,
	Users,
	Clock,
	BarChart3,
	FileText,
} from 'lucide-react'
import { isCnpj, cnpjMask, onlyNumbers } from '@/utils/text'
import { getMantyz, getMantyzGeral } from '@/api/mantyz'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { InfoCard } from '@/components/info-card'
import { SabiaScoreModal } from '@/components/sabia-score-modal'
import { getCompanyItems, getScoreItems, getMarketRestrictionsItems, getRestitivosFiscaisItems, getSocietyStructureItems, getPaymentHistoryItems, getEvolutionHistoryItems, getConsultationsItems, getSabiaScore } from './helpers'

export function CnpjSearchPage() {
	const [searchedCnpj, setSearchedCnpj] = useState<string | null>(null)

	const form = useForm({
		defaultValues: {
			search: '',
		},
	})

	const onSubmit = ({ search }: { search: string }) => {
		setSearchedCnpj(search)
	}

	const mantyzQuery = useQuery({
		queryKey: ['mantyz', searchedCnpj],
		queryFn: () => getMantyz(searchedCnpj!),
		enabled: !!searchedCnpj,
	})

	const geralQuery = useQuery({
		queryKey: ['mantyzGeral', searchedCnpj],
		queryFn: () => getMantyzGeral(searchedCnpj!),
		enabled: !!searchedCnpj,
	})

	// Calculate Sabia Score
	const sabiaScore = useMemo(() => {
		return getSabiaScore(mantyzQuery.data, geralQuery.data)
	}, [mantyzQuery.data, geralQuery.data])

	const isCnpjInvalid =
		mantyzQuery.isError && (mantyzQuery.error as any)?.response?.status === 412

	const isLoading = mantyzQuery.isFetching || geralQuery.isFetching

	return (
		<div className='flex flex-col gap-6'>
			<h1 className='text-2xl font-semibold'>Pesquisar por CNPJ</h1>

			<Form {...form}>
				<form
					className='flex w-full items-center gap-3'
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<Search className='shrink-0' size={20} />

					<FormField
						control={form.control}
						name='search'
						render={({ field }) => {
							const numericValue = onlyNumbers(field.value ?? '')
							const maskedValue = cnpjMask(numericValue)

							return (
								<FormItem className='w-full'>
									<FormControl>
										<Input
											ref={field.ref}
											placeholder='99.999.999/9999-99'
											inputMode='numeric'
											value={maskedValue}
											onChange={(e) =>
												field.onChange(
													onlyNumbers(e.target.value).slice(0, 14)
												)
											}
										/>
									</FormControl>
								</FormItem>
							)
						}}
					/>

					{searchedCnpj && !isLoading && (
						<Button
							type='button'
							onClick={() => {
								setSearchedCnpj(null)
								form.reset()
							}}
						>
							Limpar
						</Button>
					)}

					<Button disabled={!isCnpj(form.watch('search')) || isLoading}>Pesquisar</Button>
				</form>
			</Form>

			<Separator className='my-4' />

			{isCnpjInvalid && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia>
							<WindIcon />
						</EmptyMedia>

						<EmptyTitle>Nada por aqui...</EmptyTitle>

						<EmptyDescription>
							Não existem empresas registradas com esse CNPJ.
						</EmptyDescription>
					</EmptyHeader>

					<EmptyContent>
						<Button
							type='button'
							disabled={isLoading}
							onClick={() => {
								form.reset()
								setSearchedCnpj(null)
							}}
						>
							Limpar pesquisa
						</Button>
					</EmptyContent>
				</Empty>
			)}

			{!searchedCnpj && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='default'>
							<TextSearchIcon />
						</EmptyMedia>

						<EmptyDescription>
							Informe um CNPJ acima para visualizar os dados da empresa.
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}

			{searchedCnpj && !isCnpjInvalid && (
				<div className='flex flex-col gap-4'>
					<Alert>
						<AlertCircleIcon />

						<AlertDescription>
							Alguns dados podem não aparecer imediatamente. Caso não apareçam na
							primeira consulta, tente novamente em até 10 minutos.
						</AlertDescription>
					</Alert>

					{!geralQuery.isFetching && !geralQuery.data && mantyzQuery.data && (
						<Alert variant='default'>
							<AlertCircleIcon />

							<AlertDescription>
								✅ Análise de crédito foi disparada! A Mantyz está processando os dados
								deste CNPJ. Tente novamente em alguns minutos.
							</AlertDescription>
						</Alert>
					)}

					<div className='grid grid-cols-3 gap-4'>
						<InfoCard
							className='col-span-2'
							description='Sobre'
							title='Empresa'
							icon={<TrendingUp />}
							items={getCompanyItems(mantyzQuery.data, geralQuery.data)}
							isLoading={mantyzQuery.isFetching || geralQuery.isFetching}
							isError={mantyzQuery.isError}
							skeletonCount={15}
						/>

						<div className='col-span-1 flex flex-col gap-4'>
							<InfoCard
								description='Score Mantyz'
								title='Score Mantyz'
								icon={<ShieldCheck />}
								items={getScoreItems(geralQuery.data)}
								isLoading={geralQuery.isFetching}
								isError={geralQuery.isError}
								skeletonCount={9}
							/>

							<div className='bg-card rounded-lg border border-border p-4'>
								<div className='flex items-center justify-between mb-4'>
									<div className='text-sm font-semibold text-foreground'>Score Sabia</div>
									<SabiaScoreModal calculation={sabiaScore} />
								</div>

								<div className='space-y-3'>
									<div>
										<div className='text-xs text-muted-foreground mb-1'>Score obtido</div>
										<div className='text-lg font-semibold text-foreground'>
											{sabiaScore.totalScore} / {sabiaScore.maxScore}
										</div>
									</div>

									<Separator className='my-2' />

									<div>
										<div className='text-xs text-muted-foreground mb-1'>Classificação</div>
										<div className={`text-sm font-semibold ${
											sabiaScore.classification === 'Risco Baixo'
												? 'text-green-600'
												: sabiaScore.classification === 'Risco Médio'
													? 'text-yellow-600'
													: 'text-red-600'
										}`}>
											{sabiaScore.classification}
										</div>
									</div>
								</div>
							</div>
						</div>

						<InfoCard
							className='col-span-1'
							description='Restrições'
							title='Restrições de Mercado'
							icon={<AlertTriangle />}
							items={getMarketRestrictionsItems(mantyzQuery.data)}
							isLoading={mantyzQuery.isFetching}
							isError={mantyzQuery.isError}
							skeletonCount={7}
						/>

						<InfoCard
							className='col-span-1'
							description='PGFN, CNDT e FGTS'
							title='Restrições Fiscais'
							icon={<Landmark />}
							items={getRestitivosFiscaisItems(geralQuery.data)}
							isLoading={geralQuery.isFetching}
							isError={geralQuery.isError}
							skeletonCount={3}
						/>

						<InfoCard
							className='col-span-1'
							description='Sócios e Administradores'
							title='Estrutura Societária'
							icon={<Users />}
							items={getSocietyStructureItems(mantyzQuery.data)}
							isLoading={mantyzQuery.isFetching}
							isError={mantyzQuery.isError}
							skeletonCount={3}
						/>

						<InfoCard
							className='col-span-1'
							description='Mercado, Cedente, Sacado e Factoring'
							title='Histórico de Pagamentos'
							icon={<Clock />}
							items={getPaymentHistoryItems(mantyzQuery.data)}
							isLoading={mantyzQuery.isFetching}
							isError={mantyzQuery.isError}
							skeletonCount={4}
						/>

						<InfoCard
							className='col-span-1'
							description='Evolução e Alterações'
							title='Histórico / Evolução'
							icon={<BarChart3 />}
							items={getEvolutionHistoryItems(mantyzQuery.data)}
							isLoading={mantyzQuery.isFetching}
							isError={mantyzQuery.isError}
							skeletonCount={9}
						/>

						<InfoCard
							className='col-span-1'
							description='Histórico de consultas'
							title='Consultas'
							icon={<FileText />}
							items={getConsultationsItems(mantyzQuery.data)}
							isLoading={mantyzQuery.isFetching}
							isError={mantyzQuery.isError}
							skeletonCount={1}
						/>
					</div>
				</div>
			)}
		</div>
	)
}
