import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import dayjs from 'dayjs'
import { toast } from 'sonner'
import { TrendingUp } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { MAIN_PATH } from '@/constants/paths'
import { getModalityLabel, getTypeLabel } from '@/utils/text'
import { formatCurrency } from '@/utils/number'
import { getReceivable } from '@/api/black-old'
import { getClient, getOperations } from '@/api/black'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
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
import { OPERATIONS_PAGE_SIZE } from './helpers'

export function ClientPage() {
	const [page, setPage] = useState(1)
	const { clientId } = useParams()
	const navigate = useNavigate()

	const { data: client, isFetching: isFetchingClient } = useQuery({
		queryKey: ['client', clientId],
		queryFn: () => getClient(clientId!),
	})

	const { data: receivable, isFetching: isFetchingReceivable } = useQuery({
		queryKey: ['receivable', clientId],
		queryFn: () => getReceivable(clientId!),
	})

	const {
		data: operations,
		isFetching: isFetchingOperations,
		isError: operationsHasError,
	} = useQuery({
		queryKey: ['operations', page],
		queryFn: () =>
			getOperations({
				page,
				pageSize: OPERATIONS_PAGE_SIZE,
			}),
	})

	const isLoading = isFetchingClient || isFetchingReceivable || isFetchingOperations

	useEffect(() => {
		toast.info('Em breve!')
		navigate(MAIN_PATH, { replace: true })
		return

		/* if (isLoading) return

		if (!client || client.id !== clientId) {
			toast.warning('Cedente não encontrado.')
			navigate(MAIN_PATH, { replace: true })
		} */

		/* if (!receivable || !operations?.data.length) {
			toast.warning('O cedente não possui operações.')
			navigate(MAIN_PATH, { replace: true })
			return
		} */
	}, [clientId, client, isLoading, navigate])

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
						{isLoading ? (
							<Skeleton className='h-5 w-full max-w-80' />
						) : (
							<BreadcrumbPage className='truncate'>
								Cedente {client?.pessoa.nome}
							</BreadcrumbPage>
						)}
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>

			<h1 className='text-3xl font-semibold'>Dados do cedente</h1>

			<div className='flex gap-6'>
				<Card className='w-full'>
					<CardHeader>
						<CardDescription>Cedente</CardDescription>

						<CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
							{client?.pessoa.nome}
						</CardTitle>

						<CardAction>
							<Badge variant='outline'>
								<TrendingUp />
								+12.5%
							</Badge>
						</CardAction>
					</CardHeader>

					<CardContent>
						<p>CNPJ: {client?.pessoa.cnpjCpf}</p>
						<p>
							Limite:{' '}
							{formatCurrency(client?.cedenteComplemento.limiteTotalModalidades || 0)}
						</p>
					</CardContent>

					<CardFooter className='justify-between'>
						<div className='line-clamp-1 flex gap-2 font-medium'>
							Trending up this month <TrendingUp className='size-4' />
						</div>

						<div className='text-muted-foreground'>Teste</div>
					</CardFooter>
				</Card>

				<Card className='w-full'>
					<CardHeader>
						<CardDescription>Teste</CardDescription>

						<CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
							Recebíveis
						</CardTitle>

						<CardAction>
							<Badge variant='outline'>
								<TrendingUp />
								+12.5%
							</Badge>
						</CardAction>
					</CardHeader>

					<CardContent>
						<p>VOP: {receivable?.VALORFACE}</p>
						<p>Risco: {receivable?.VALORABERTO}</p>
						<p>Vencidos: {receivable?.ABERTOVENCIDO}</p>
						<p>Taxa de operação: -</p>
					</CardContent>

					<CardFooter className='justify-between'>
						<div className='line-clamp-1 flex gap-2 font-medium'>
							Trending up this month <TrendingUp className='size-4' />
						</div>

						<div className='text-muted-foreground'>Teste</div>
					</CardFooter>
				</Card>

				<Card className='w-full'>
					<CardHeader>
						<CardDescription>Teste</CardDescription>

						<CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
							Teste
						</CardTitle>

						<CardAction>
							<Badge variant='outline'>
								<TrendingUp />
								+12.5%
							</Badge>
						</CardAction>
					</CardHeader>

					<CardContent>
						<p>Teste: teste</p>
						<p>Teste: teste</p>
					</CardContent>

					<CardFooter>
						<div className='line-clamp-1 flex gap-2 font-medium'>
							Trending up this month <TrendingUp className='size-4' />
						</div>
					</CardFooter>
				</Card>
			</div>

			<DataTable
				title={
					<div className='flex items-center gap-3'>
						<h2 className='text-2xl font-semibold'>Operações</h2>

						{isLoading ? (
							<Skeleton className='h-8 w-8' />
						) : (
							<Badge className='h-8 min-w-8' variant='outline'>
								{operations?.totalItems}
							</Badge>
						)}
					</div>
				}
				columns={[
					{
						key: 'operacao',
						header: 'Operação',
						render: (row) => row.operacao,
					},
					{
						key: 'dataOperacao',
						header: 'Data da operação',
						render: (row) => dayjs(row.dataOperacao).format('DD/MM/YYYY HH:mm:ss'),
					},
					{
						key: 'modalidade',
						header: 'Modalidade',
						render: (row) => getModalityLabel(row.modalidade),
					},
					{
						key: 'status',
						header: 'Status',
						render: (row) => (
							<Badge variant={row.status === 'ABERTA' ? 'default' : 'outline'}>
								{row.status}
							</Badge>
						),
					},
					{
						key: 'tiposRecebiveis',
						header: 'Tipo',
						render: (row) => getTypeLabel(row.tiposRecebiveis[0]),
					},
				]}
				data={operations?.items || []}
				isLoading={isLoading}
				isError={operationsHasError}
				pagination={{
					page,
					pageSize: OPERATIONS_PAGE_SIZE,
					totalItems: operations?.totalItems || 0,
					onPageChange: setPage,
				}}
			/>
		</div>
	)
}
