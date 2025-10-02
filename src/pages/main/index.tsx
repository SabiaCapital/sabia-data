import { useState } from 'react'
import { Link } from 'react-router'
import dayjs from 'dayjs'
import { PlusCircle, ChevronsRight } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getOperations } from '@/api/black'
import { getOperationPath, getClientPath } from '@/utils/paths'
import { getModalityLabel, getTypeLabel } from '@/utils/text'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/data-table'
import { OPERATIONS_PAGE_SIZE } from './helpers'

export function MainPage() {
	const [page, setPage] = useState(1)
	const [search, setSearch] = useState('')

	const {
		data: operations,
		isFetching: isOperationsFetching,
		isError: operationsHasError,
	} = useQuery({
		queryKey: ['operations', page, search],
		queryFn: () =>
			getOperations({
				page,
				pageSize: OPERATIONS_PAGE_SIZE,
				keyword: search,
			}),
	})

	return (
		<DataTable
			title='Operações'
			data={operations?.items || []}
			columns={[
				{
					key: 'operacao',
					header: (
						<div className='flex items-center gap-2'>
							<span>Operação</span>
							<PlusCircle size={16} />
						</div>
					),
					render: (row) => (
						<Link className='group' to={getOperationPath(row.id)}>
							<div className='flex items-center gap-2 transition-transform ease-out group-hover:translate-x-2 group-hover:font-bold'>
								<span>{row.operacao}</span>
								<ChevronsRight size={20} />
							</div>
						</Link>
					),
				},
				{
					key: 'dataOperacao',
					header: 'Data de criação',
					render: (row) => dayjs(row.dataOperacao).format('DD/MM/YYYY HH:mm:ss'),
				},
				{
					key: 'modalidade',
					header: 'Modalidade',
					render: (row) => getModalityLabel(row.modalidade),
				},
				{
					key: 'cedenteNome',
					header: (
						<div className='flex items-center gap-2'>
							<span>Cedente</span>
							<PlusCircle size={16} />
						</div>
					),
					render: (row) => (
						<Link className='group' to={getClientPath(row.cedenteId)}>
							<div className='flex flex-col gap-1 transition-transform ease-out group-hover:translate-x-2'>
								<div className='flex items-center gap-2 group-hover:font-bold'>
									<span className='max-w-80 truncate'>{row.cedenteNome}</span>
									<ChevronsRight size={20} />
								</div>

								<span className='text-xs'>{row.cedenteCnpjCpf}</span>
							</div>
						</Link>
					),
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
			isLoading={isOperationsFetching}
			isError={operationsHasError}
			pagination={{
				page,
				pageSize: OPERATIONS_PAGE_SIZE,
				totalItems: operations?.totalItems || 0,
				onPageChange: setPage,
			}}
			search={{
				placeholder: 'Pesquisar por operação ou nome do cedente...',
				value: search,
				onSearch: setSearch,
			}}
		/>
	)
}
