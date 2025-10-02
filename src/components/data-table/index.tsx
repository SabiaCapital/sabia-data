import { type ReactNode, useState, useEffect } from 'react'
import { FileQuestion, CircleX, Search } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableHeader,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
} from '@/components/ui/table'
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationButton,
	PaginationPrevious,
	PaginationNext,
	PaginationEllipsis,
} from '@/components/ui/pagination'
import type { DataTableProps } from './types'
import { DEFAULT_PAGE_SIZE, SEARCH_DEBOUNCE_DELAY } from './helpers'

export function DataTable<T>({
	tableCellClassName,
	title,
	data,
	columns,
	isLoading,
	isError,
	pagination,
	search,
}: DataTableProps<T>) {
	const [localSearch, setLocalSearch] = useState(search?.value || '')
	const debouncedLocalSearch = useDebounce(localSearch, SEARCH_DEBOUNCE_DELAY)

	useEffect(() => {
		if (!search || debouncedLocalSearch === search.value) return

		search.onSearch(debouncedLocalSearch.trim())
		pagination?.onPageChange(1)
	}, [debouncedLocalSearch, search, pagination])

	const totalPages = pagination ? Math.ceil(pagination.totalItems / pagination.pageSize) : 1

	const renderTitle = () => {
		if (typeof title === 'string') {
			return <h2 className='text-2xl font-semibold'>{title}</h2>
		}

		return title
	}

	const renderContent = () => {
		if (isLoading) {
			return [...Array(pagination?.pageSize || DEFAULT_PAGE_SIZE)].map((_, i) => (
				<TableRow key={i}>
					{columns.map((col) => (
						<TableCell key={col.key}>
							<Skeleton className='h-5 w-32' />
						</TableCell>
					))}
				</TableRow>
			))
		}

		if (isError) {
			return (
				<TableRow>
					<TableCell colSpan={columns.length}>
						<div className='text-muted-foreground flex flex-col items-center gap-2 py-20 text-center'>
							<CircleX className='text-muted' size={48} />

							<h3 className='text-lg font-semibold'>Ocorreu um erro inesperado</h3>

							<p className='text-sm'>
								Caso persista, entre em contato com o administrador da plataforma.
							</p>
						</div>
					</TableCell>
				</TableRow>
			)
		}

		if (!data.length) {
			return (
				<TableRow>
					<TableCell colSpan={columns.length}>
						<div className='text-muted-foreground flex flex-col items-center gap-2 py-20 text-center'>
							<FileQuestion className='text-muted' size={48} />

							<h3 className='text-lg font-semibold'>Ops, nada por aqui</h3>

							<p className='text-sm'>
								{search?.value
									? 'A pesquisa não retornou nenhum resultado.'
									: 'Nenhum dado encontrado.'}
							</p>
						</div>
					</TableCell>
				</TableRow>
			)
		}

		return data.map((row, i) => (
			<TableRow key={i}>
				{columns.map((col) => (
					<TableCell key={col.key} className={tableCellClassName}>
						{col.render ? col.render(row, i) : (row[col.key] as ReactNode)}
					</TableCell>
				))}
			</TableRow>
		))
	}

	const renderPagination = () => {
		if (!pagination || totalPages <= 1) return null

		return (
			<Pagination className='ml-auto'>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							disabled={pagination.page === 1}
							onClick={() => pagination.onPageChange(pagination.page - 1)}
						/>
					</PaginationItem>

					{[...Array(totalPages)].map((_, i) => {
						const inPage = i + 1
						const isNear = Math.abs(pagination.page - inPage) <= 1
						const isEdge = inPage === 1 || inPage === totalPages
						const showEllipsis =
							pagination.page === inPage - 2 || pagination.page === inPage + 2

						if (isNear || isEdge) {
							return (
								<PaginationItem key={inPage}>
									<PaginationButton
										isActive={pagination.page === inPage}
										onClick={() => pagination.onPageChange(inPage)}
									>
										{inPage}
									</PaginationButton>
								</PaginationItem>
							)
						} else if (showEllipsis) {
							return (
								<PaginationItem key={`ellipsis${inPage}`}>
									<PaginationEllipsis />
								</PaginationItem>
							)
						}
						return null
					})}

					<PaginationItem>
						<PaginationNext
							disabled={pagination.page === totalPages}
							onClick={() => pagination.onPageChange(pagination.page + 1)}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		)
	}

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex items-center gap-10'>
				<div className='flex w-full max-w-168 items-center gap-14'>
					{renderTitle()}

					{search && (
						<div className='flex w-full items-center gap-3'>
							<Search size={20} />

							<Input
								placeholder={search.placeholder}
								inputMode='search'
								value={localSearch}
								onChange={(e) => setLocalSearch(e.target.value)}
							/>
						</div>
					)}
				</div>

				{renderPagination()}
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						{columns.map((col) => (
							<TableHead key={col.key}>{col.header}</TableHead>
						))}
					</TableRow>
				</TableHeader>

				<TableBody>{renderContent()}</TableBody>
			</Table>

			{renderPagination()}
		</div>
	)
}
