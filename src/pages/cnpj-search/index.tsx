import { useState, useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
	AlertCircleIcon,
	BracesIcon,
	Search,
	TextSearchIcon,
	TrendingUp,
	WindIcon,
} from 'lucide-react'
import { formatCnpj, isCnpj } from '@/utils/text'
import { formatCurrency } from '@/utils/number'
import { getCreditHub } from '@/api/credit-hub'
import { getMantyz } from '@/api/mantyz'
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getLastSocietaryChange } from '../operation/helpers'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'

export function onlyNumbers(value: string) {
	return value.replace(/\D/g, '')
}

export function cnpjMask(value: string) {
	return onlyNumbers(value)
		.slice(0, 14)
		.replace(/^(\d{2})(\d)/, '$1.$2')
		.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
		.replace(/\.(\d{3})(\d)/, '.$1/$2')
		.replace(/(\d{4})(\d)/, '$1-$2')
}

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

	const creditHubQuery = useQuery({
		queryKey: ['creditHub', searchedCnpj],
		queryFn: ({ signal }) => getCreditHub(searchedCnpj!, signal),
		enabled: !!searchedCnpj,
	})

	const mantyzQuery = useQuery({
		queryKey: ['mantyz', searchedCnpj],
		queryFn: () => getMantyz(searchedCnpj!),
		enabled: !!searchedCnpj,
	})

	const queryClient = useQueryClient()

	const isCnpjInvalid = mantyzQuery.isError && (mantyzQuery.error as any)?.status === 412

	useEffect(() => {
		if (isCnpjInvalid) {
			queryClient.cancelQueries({
				queryKey: ['creditHub'],
			})
		}
	}, [mantyzQuery.isError, mantyzQuery.error, queryClient, isCnpjInvalid])

	const isLoading = creditHubQuery.isFetching || mantyzQuery.isFetching

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
							onClick={() => {
								setSearchedCnpj(null)
								form.reset()
							}}
						>
							Limpar
						</Button>
					)}

					<Button type='submit' disabled={!isCnpj(form.watch('search')) || isLoading}>
						Pesquisar
					</Button>
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
					{!isLoading && (
						<Alert>
							<AlertCircleIcon />

							<AlertDescription>
								Alguns dados podem não aparecer imediatamente. Caso não apareçam na
								primeira consulta, tente novamente em até 10 minutos.
							</AlertDescription>
						</Alert>
					)}

					<div className='grid grid-cols-2 gap-4'>
						<Card className='col-span-2'>
							<CardHeader>
								<CardDescription>Sobre</CardDescription>

								<CardTitle className='text-2xl font-semibold'>Empresa</CardTitle>

								<CardAction>
									{creditHubQuery.isFetching ? (
										<Spinner className='h-6 w-6' />
									) : (
										<Badge className='h-8 w-8' variant='outline'>
											<TrendingUp />
										</Badge>
									)}
								</CardAction>
							</CardHeader>

							<CardContent className='flex flex-col gap-1'>
								{creditHubQuery.isFetching ? (
									<>
										<Skeleton className='h-5 w-1/2' />
										<Skeleton className='h-5 w-1/4' />
										<Skeleton className='h-5 w-1/3' />
										<Skeleton className='h-5 w-1/4' />
									</>
								) : creditHubQuery.isError ? (
									<p>
										Ocorreu um erro ao buscar os dados. Tente novamente mais
										tarde.
									</p>
								) : (
									<>
										<span className='text-sm'>
											Empresa: {creditHubQuery.data?.razaoSocial ?? '-'}
										</span>

										<span className='text-sm'>
											CNPJ: {formatCnpj(creditHubQuery.data?.cnpj) ?? '-'}
										</span>

										<span className='text-sm'>
											Data de fundação:{' '}
											{creditHubQuery.data?.dataAbertura ?? '-'}
										</span>

										<span className='text-sm'>
											Capital social:{' '}
											{formatCurrency(creditHubQuery.data?.capitalSocial) ??
												'-'}
										</span>
									</>
								)}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardDescription>Credit HUB</CardDescription>

								<CardTitle className='text-2xl font-semibold'>Credit HUB</CardTitle>

								<CardAction>
									{creditHubQuery.isFetching ? (
										<Spinner className='h-6 w-6' />
									) : (
										<Badge className='h-8 w-8' variant='outline'>
											<BracesIcon />
										</Badge>
									)}
								</CardAction>
							</CardHeader>

							<CardContent className='flex flex-col gap-1'>
								{creditHubQuery.isFetching ? (
									<>
										<Skeleton className='h-5 w-1/2' />
										<Skeleton className='h-5 w-1/4' />
										<Skeleton className='h-5 w-1/3' />
										<Skeleton className='h-5 w-1/2' />
										<Skeleton className='h-5 w-1/4' />
										<Skeleton className='h-5 w-1/3' />
									</>
								) : creditHubQuery.isError ? (
									<p>
										Ocorreu um erro ao buscar os dados. Tente novamente mais
										tarde.
									</p>
								) : (
									<>
										<span className='text-sm'>
											Quantidade PEFIN:{' '}
											{creditHubQuery.data?.pefin?.informacoes[0]
												.totalPendenciasFinanceiras ?? '-'}
										</span>

										<span className='text-sm'>
											Valor PEFIN:{' '}
											{formatCurrency(
												creditHubQuery.data?.pefin?.informacoes[0]
													.valorTotalPendenciasFinanceiras
											) ?? '-'}
										</span>

										<span className='text-sm'>
											Quantidade REFIN:{' '}
											{creditHubQuery.data?.refin?.spc
												.flat()
												.filter((item) => Object.keys(item).length > 0)
												.length ?? '-'}
										</span>

										<span className='text-sm'>
											Valor REFIN:{' '}
											{formatCurrency(
												creditHubQuery.data?.refin?.spc
													.flat()
													.reduce(
														(acc, item) =>
															acc + parseFloat(item.Valor || '0'),
														0
													)
											) ?? '-'}
										</span>

										<span className='text-sm'>
											Valor total dívidas:{' '}
											{formatCurrency(
												creditHubQuery.data?.valor_total_dividas
											) ?? '-'}
										</span>

										<span className='text-sm'>
											Última alteração societária:{' '}
											{getLastSocietaryChange(
												creditHubQuery.data?.quadroSocietario
											) ?? '-'}
										</span>
									</>
								)}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardDescription>Mantyz</CardDescription>

								<CardTitle className='text-2xl font-semibold'>Mantyz</CardTitle>

								<CardAction>
									{mantyzQuery.isFetching ? (
										<Spinner className='h-6 w-6' />
									) : (
										<Badge className='h-8 w-8' variant='outline'>
											<BracesIcon />
										</Badge>
									)}
								</CardAction>
							</CardHeader>

							<CardContent className='flex flex-col gap-1'>
								{mantyzQuery.isFetching ? (
									<>
										<Skeleton className='h-5 w-1/2' />
										<Skeleton className='h-5 w-1/4' />
										<Skeleton className='h-5 w-1/3' />
										<Skeleton className='h-5 w-1/2' />
										<Skeleton className='h-5 w-1/4' />
										<Skeleton className='h-5 w-1/3' />
									</>
								) : mantyzQuery.isError ? (
									<p>
										Ocorreu um erro ao buscar os dados. Tente novamente mais
										tarde.
									</p>
								) : (
									<>
										<span className='text-sm'>
											Quantidade PEFIN:{' '}
											{mantyzQuery.data?.pessoa_juridica
												?.pendencias_financeiras.restritivo_mercado
												.qtd_pefin ?? '-'}
										</span>

										<span className='text-sm'>
											Valor PEFIN:{' '}
											{formatCurrency(
												mantyzQuery.data?.pessoa_juridica
													?.pendencias_financeiras.restritivo_mercado
													.valor_pefin
											) ?? '-'}
										</span>

										<span className='text-sm'>
											Quantidade REFIN:{' '}
											{mantyzQuery.data?.pessoa_juridica
												?.pendencias_financeiras.restritivo_mercado
												.qtd_refin ?? '-'}
										</span>

										<span className='text-sm'>
											Valor REFIN:{' '}
											{formatCurrency(
												mantyzQuery.data?.pessoa_juridica
													?.pendencias_financeiras.restritivo_mercado
													.valor_refin
											) ?? '-'}
										</span>

										<span className='text-sm'>
											Processos trabalhistas:{' '}
											{mantyzQuery.data?.pessoa_juridica
												?.pendencias_financeiras.acoes.acoes_trabalhistas
												.length ?? '-'}
										</span>

										<span className='text-sm'>
											PGFN:{' '}
											{formatCurrency(
												mantyzQuery.data?.pessoa_juridica
													?.pendencias_financeiras.pgfn_debito_governo
													?.valor_total_debito
											) ?? '-'}
										</span>
									</>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			)}
		</div>
	)
}
