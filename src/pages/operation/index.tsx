import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import { Info } from 'lucide-react'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import { TrendingUp, User } from 'lucide-react'
import { useQueries, useQuery } from '@tanstack/react-query'
import { MAIN_PATH } from '@/constants/paths'
import { formatCurrency, formatPercentage } from '@/utils/number'
import { formatCnpj, getStatusLabel, getModalityLabel } from '@/utils/text'
import { getOperation, getOperationDebtors, getOperationExtra, getClient } from '@/api/black'
import { getCreditHub } from '@/api/credit-hub'
import { getMantyz } from '@/api/mantyz'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardAction,
} from '@/components/ui/card'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'
import { DataTable } from '@/components/data-table'
import { DEBTORS_PAGE_SIZE, getLastSocietaryChange } from './helpers'

export function isCnpj(value?: string) {
	if (!value) return false

	const cnpjRegex = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/
	return cnpjRegex.test(value)
}

export function OperationPage() {
	const [page, setPage] = useState(1)
	const { operationId } = useParams()
	const navigate = useNavigate()

	const {
		data: operation,
		isFetching: isFetchingOperation,
		isError: operationHasError,
	} = useQuery({
		queryKey: ['operation', operationId],
		queryFn: () => getOperation(operationId!),
		enabled: !!operationId,
	})

	const {
		data: operationExtra,
		isFetching: isFetchingOperationExtra,
		isError: operationExtraHasError,
	} = useQuery({
		queryKey: ['operationExtra', operationId],
		queryFn: () => getOperationExtra(operationId!),
		enabled: !!operationId,
	})

	const {
		data: client,
		isFetching: isFetchingClient,
		isError: clientHasError,
	} = useQuery({
		queryKey: ['client', operation],
		queryFn: () => getClient(operation!.cedenteId),
		enabled: !!operation,
	})

	const {
		data: debtors,
		isFetching: isFetchingDebtors,
		isError: debtorsHasError,
	} = useQuery({
		queryKey: ['debtors', operationId, page],
		queryFn: () =>
			getOperationDebtors({
				operationId: operationId!,
				page,
				pageSize: DEBTORS_PAGE_SIZE,
			}),
		enabled: !!operationId,
	})

	const debtorsCnpjs = debtors?.items.map((d) => formatCnpj(d.sacadoCnpj, { unmask: true })) || []

	const creditHubQueries = useQueries({
		queries: debtorsCnpjs.map((cnpj) => ({
			queryKey: ['creditHub', cnpj],
			queryFn: () => getCreditHub(cnpj),
			enabled: !!cnpj,
		})),
	})
	const isFetchingCreditHub = creditHubQueries.some((q) => q.isFetching)
	const creditHubHasError = creditHubQueries.some((q) => q.isError)

	const mantyzQueries = useQueries({
		queries: debtorsCnpjs.map((cnpj) => ({
			queryKey: ['mantyz', cnpj],
			queryFn: () => getMantyz(cnpj),
			enabled: !!cnpj,
		})),
	})
	const isFetchingMantyz = mantyzQueries.some((q) => q.isFetching)
	const mantyzHasError = mantyzQueries.some((q) => q.isError)

	const isLoading =
		isFetchingOperation ||
		isFetchingOperationExtra ||
		isFetchingClient ||
		isFetchingDebtors ||
		isFetchingCreditHub ||
		isFetchingMantyz

	const hasPartialError =
		operationExtraHasError ||
		clientHasError ||
		debtorsHasError ||
		creditHubHasError ||
		mantyzHasError

	useEffect(() => {
		if (isLoading) return

		if (operationHasError) {
			toast.error('Ocorreu um erro ao carregar os dados da operação.')
			navigate(MAIN_PATH, { replace: true })
			return
		}

		if (!operation || operation.id !== operationId) {
			toast.warning('Operação não encontrada.')
			navigate(MAIN_PATH, { replace: true })
			return
		}

		if (hasPartialError) {
			toast.warning('Alguns dados da operação não foram carregados.')
		}
	}, [operationId, operation, isLoading, operationHasError, hasPartialError, navigate])

	return (
		<div className='flex flex-col gap-10'>
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link to={MAIN_PATH}>Início</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem>
						<BreadcrumbEllipsis />
					</BreadcrumbItem>

					<BreadcrumbSeparator />

					<BreadcrumbItem className='min-w-0 flex-1'>
						{isFetchingOperation ? (
							<Skeleton className='h-5 w-full max-w-28' />
						) : (
							<BreadcrumbPage className='truncate'>
								Operação {operation?.numeroAditivo}
							</BreadcrumbPage>
						)}
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className='text-3xl font-semibold'>Dados da operação</h1>

			<div className='flex gap-6'>
				<Card className='w-full'>
					<CardHeader>
						<CardDescription>Operação</CardDescription>

						<CardTitle className='text-2xl font-semibold'>
							{isFetchingOperation ? (
								<Skeleton className='h-8 w-22' />
							) : (
								operation?.numeroAditivo
							)}
						</CardTitle>

						<CardAction>
							<Badge className='h-8 w-8' variant='outline'>
								<TrendingUp />
							</Badge>
						</CardAction>
					</CardHeader>

					<CardContent className='flex flex-col gap-1'>
						<div className='flex items-center gap-2'>
							<span className='font-medium'>Data:</span>

							{isFetchingOperation ? (
								<Skeleton className='h-5 w-38' />
							) : (
								<span>
									{dayjs(operation?.aditivoImportacao.dateCreated).format(
										'DD/MM/YYYY HH:mm:ss'
									)}
								</span>
							)}
						</div>

						<div className='flex items-center gap-2'>
							<span className='font-medium'>Status:</span>

							{isFetchingOperation ? (
								<Skeleton className='h-5 w-16' />
							) : (
								<span>{getStatusLabel(operation?.status)}</span>
							)}
						</div>

						<div className='flex items-center gap-2'>
							<span className='font-medium'>Modalidade:</span>

							{isFetchingOperation ? (
								<Skeleton className='h-5 w-24' />
							) : (
								<span>{getModalityLabel(operation?.modalidade)}</span>
							)}
						</div>

						<div className='flex items-center gap-2'>
							<span className='font-medium'>Taxa da operação:</span>

							{isFetchingOperationExtra ? (
								<Skeleton className='h-5 w-12' />
							) : (
								<span>
									{formatPercentage(operationExtra?.dadosOperacao.fator, 2) ??
										'Não encontrada'}
								</span>
							)}
						</div>

						<div className='flex items-center gap-2'>
							<span className='font-medium'>Valor da operação:</span>

							{isFetchingOperationExtra ? (
								<Skeleton className='h-5 w-24' />
							) : (
								<span>
									{formatCurrency(operationExtra?.dadosOperacao.valorAPagar) ??
										'Não encontrado'}
								</span>
							)}
						</div>

						<div className='flex items-center gap-2'>
							<span className='font-medium'>Tranche:</span>

							{isFetchingOperationExtra ? (
								<Skeleton className='h-5 w-20' />
							) : (
								<span>
									{formatCurrency(operationExtra?.dadosCedente.tranche) ??
										'Não encontrado'}
								</span>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className='w-full'>
					<CardHeader>
						<CardDescription>Cedente da operação</CardDescription>

						<CardTitle className='text-2xl font-semibold'>
							{isFetchingOperation ? (
								<Skeleton className='h-8 w-full' />
							) : (
								operation?.cedente.pessoa.nome
							)}
						</CardTitle>

						<CardAction>
							<Badge className='h-8 w-8' variant='outline'>
								<User />
							</Badge>
						</CardAction>
					</CardHeader>

					<CardContent className='flex flex-col gap-1'>
						<div className='flex items-center gap-2'>
							<span className='font-medium'>CNPJ/CPF:</span>

							{isFetchingOperation ? (
								<Skeleton className='h-5 w-36' />
							) : (
								<span>{operation?.cedente.pessoa.cnpjCpf}</span>
							)}
						</div>

						<div className='flex items-center gap-2'>
							<span className='font-medium'>Limite:</span>

							{isFetchingClient ? (
								<Skeleton className='h-5 w-28' />
							) : (
								<span>
									{formatCurrency(
										client?.cedenteComplemento.limiteTotalModalidades
									) ?? 'Não encontrado'}
								</span>
							)}
						</div>

						<div className='flex items-center gap-2'>
							<span className='font-medium'>Taxa de cadastro:</span>

							{isFetchingOperationExtra ? (
								<Skeleton className='h-5 w-12' />
							) : (
								<span>
									{formatPercentage(operationExtra?.dadosCedente.fator, 2) ??
										'Não encontrada'}
								</span>
							)}
						</div>
					</CardContent>
				</Card>
			</div>

			<DataTable
				tableCellClassName='align-top'
				title={
					<div className='flex items-center gap-3'>
						<h2 className='text-2xl font-semibold'>Sacados</h2>

						{isFetchingDebtors ? (
							<Skeleton className='h-8 w-8' />
						) : (
							<Badge className='h-8 min-w-8' variant='outline'>
								{debtors?.totalItems || 0}
							</Badge>
						)}
					</div>
				}
				data={debtors?.items || []}
				columns={[
					{
						key: 'sacadoNome',
						header: 'Identificação',
						render: (row) => (
							<div className='flex flex-col gap-1'>
								<span className='max-w-64 truncate'>{row.sacadoNome}</span>
								<span>{row.sacadoCnpj}</span>
							</div>
						),
					},
					{
						key: 'operacao',
						header: 'Valores',
						render: (row) => (
							<div className='flex flex-col gap-1'>
								<span>
									Porcentagem: {formatPercentage(row.porcentagemOperacao)}
								</span>

								<span>Face: {formatCurrency(row.operacao)}</span>

								<span>Aberto: {formatCurrency(row.valoresAberto)}</span>

								<span>A pagar: {formatCurrency(row.valorAPagar)}</span>

								<span>A vencer: {formatCurrency(row.vencimentoVencer)}</span>

								<span>Vencidos: {formatCurrency(row.vencimentoVencidos)}</span>

								<span>VOP: {formatCurrency(row.valoresTotal)}</span>
							</div>
						),
					},
					{
						key: 'ultimaOperacao',
						header: 'Última operação',
						render: (row) => (
							<div className='flex flex-col gap-1'>
								<span>
									Número:{' '}
									{!row.ultimaOperacao || row.ultimaOperacao === '0'
										? '-'
										: row.ultimaOperacao}
								</span>

								<span>Data: {row.ultimaOperacaoData || '-'}</span>

								<span>Valor: {formatCurrency(row.ultimaOperacaoValor) || '-'}</span>
							</div>
						),
					},
					{
						key: 'documentosNotas',
						header: 'Documentos',
						render: (row) => (
							<div className='flex flex-col gap-1'>
								<span>Total de documentos: {row.documentosNotas}</span>
								<span>Total de recebíveis: {row.documentosQtd}</span>
							</div>
						),
					},
					{
						key: 'analise',
						header: (
							<Tooltip>
								<TooltipTrigger asChild className='w-max'>
									<div className='flex items-center gap-2'>
										<span>Credit HUB</span>
										<Info size={16} />
									</div>
								</TooltipTrigger>

								<TooltipContent className='w-52'>
									<p>
										As informações da Credit HUB levam em torno de 5 minutos
										para ficarem disponíveis na primeira vez que um sacado é
										consultado.
									</p>
								</TooltipContent>
							</Tooltip>
						),
						render: (_, rowIndex) => {
							const { data: creditHub } = creditHubQueries[rowIndex]

							const isEnterprise = isCnpj(
								creditHub?.refin?.dadosCadastrais[0].CpfCnpj
							)

							return (
								<div className='flex flex-col gap-1'>
									<span>
										{isEnterprise ? 'Data de fundação:' : 'Data de nascimento:'}{' '}
										{creditHub?.refin?.dadosCadastrais[0].NascimentoFundacao ??
											'Consultando...'}
									</span>

									<span>
										Quantidade PEFIN:{' '}
										{creditHub?.pefin?.informacoes[0]
											.totalPendenciasFinanceiras ?? 'Consultando...'}
									</span>

									<span>
										Valor PEFIN:{' '}
										{formatCurrency(
											creditHub?.pefin?.informacoes[0]
												.valorTotalPendenciasFinanceiras
										) ?? 'Consultando...'}
									</span>

									<span>
										Quantidade REFIN:{' '}
										{creditHub?.refin?.spc
											.flat()
											.filter((item) => Object.keys(item).length > 0)
											.length ?? 'Consultando...'}
									</span>

									<span>
										Valor REFIN:{' '}
										{formatCurrency(
											creditHub?.refin?.spc
												.flat()
												.reduce(
													(acc, item) =>
														acc + parseFloat(item.Valor || '0'),
													0
												)
										) ?? 'Consultando...'}
									</span>

									{isEnterprise && (
										<span>
											Capital social:{' '}
											{formatCurrency(creditHub?.capitalSocial) ??
												'Consultando...'}
										</span>
									)}

									<span>
										Valor total dívidas:{' '}
										{formatCurrency(creditHub?.valor_total_dividas) ??
											'Consultando...'}
									</span>

									{isEnterprise && (
										<span>
											Última alteração societária:{' '}
											{getLastSocietaryChange(creditHub?.quadroSocietario) ??
												'Consultando...'}
										</span>
									)}
								</div>
							)
						},
					},
					{
						key: 'porcentagemOperacao',
						header: 'Mantyz',
						render: (_, rowIndex) => {
							const { data: mantyz } = mantyzQueries[rowIndex]

							/* const isEnterprise = mantyz?.pessoa_juridica */

							return (
								<div className='flex flex-col gap-1'>
									<span>
										Quantidade PEFIN:{' '}
										{mantyz?.pessoa_juridica?.pendencias_financeiras
											.restritivo_mercado.qtd_pefin ?? 0}
									</span>

									<span>
										Valor PEFIN:{' '}
										{formatCurrency(
											mantyz?.pessoa_juridica?.pendencias_financeiras
												.restritivo_mercado.valor_pefin ?? 0
										)}
									</span>

									<span>
										Quantidade REFIN:{' '}
										{mantyz?.pessoa_juridica?.pendencias_financeiras
											.restritivo_mercado.qtd_refin ?? 0}
									</span>

									<span>
										Valor REFIN:{' '}
										{formatCurrency(
											mantyz?.pessoa_juridica?.pendencias_financeiras
												.restritivo_mercado.valor_refin ?? 0
										)}
									</span>

									<span>
										Processos trabalhistas:{' '}
										{mantyz?.pessoa_juridica?.pendencias_financeiras.acoes
											.acoes_trabalhistas.length ?? 0}
									</span>

									<span>
										PGFN:{' '}
										{formatCurrency(
											mantyz?.pessoa_juridica?.pendencias_financeiras
												.pgfn_debito_governo?.valor_total_debito ?? 0
										)}
									</span>
								</div>
							)
						},
					},
				]}
				isLoading={isFetchingDebtors || isFetchingCreditHub || isFetchingMantyz}
				isError={debtorsHasError}
				pagination={{
					page,
					pageSize: DEBTORS_PAGE_SIZE,
					totalItems: debtors?.totalItems || 0,
					onPageChange: setPage,
				}}
			/>
		</div>
	)
}
