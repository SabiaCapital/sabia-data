import axios from 'axios'
import type {
	QueryParams,
	GetClientsResponse,
	GetOperationsResponse,
	GetReceivablesResponse,
} from './types'

const api = axios.create({
	baseURL: import.meta.env.VITE_BLACK_OLD_API_URL,
	headers: { 'X-API-Key': import.meta.env.VITE_BLACK_OLD_API_KEY },
})

export async function getClients({
	filter,
	filterValue,
	page,
	pageSize,
	sortField,
	sortDirection,
}: QueryParams = {}) {
	const response = await api.get<GetClientsResponse>('bidata', {
		params: {
			t: 'DATA_CEDENTES',
			f: 'EMPRESANOME',
			f2: filter,
			v: 'FUNDO DE INVESTIMENTO EM DIREITOS CREDITORIOS SABIA CAPITAL',
			v2: filterValue,
			page,
			pageSize,
			sortField,
			sortDirection,
		},
	})

	return response.data
}

export async function getClient(clientId: string) {
	const response = await api.get<GetClientsResponse>('bidata', {
		params: {
			t: 'DATA_CEDENTES',
			f: 'EMPRESANOME',
			f2: 'CEDENTEID',
			v: 'FUNDO DE INVESTIMENTO EM DIREITOS CREDITORIOS SABIA CAPITAL',
			v2: clientId,
			page: 1,
			pageSize: 1,
		},
	})

	return response.data.data[0] || null
}

export async function getOperations({
	filter,
	filterValue,
	page,
	pageSize,
	sortField,
	sortDirection,
}: QueryParams = {}) {
	const response = await api.get<GetOperationsResponse>('bidata', {
		params: {
			t: 'DATA_OPERACOES',
			f: filter,
			v: filterValue,
			page,
			pageSize,
			sortField,
			sortDirection,
		},
	})

	return response.data
}

export async function getOperation(operationId: string) {
	const response = await api.get<GetOperationsResponse>('bidata', {
		params: {
			t: 'DATA_OPERACOES',
			f: 'NUMEROADITIVO',
			v: operationId,
			page: 1,
			pageSize: 1,
		},
	})

	return response.data.data[0] || null
}

export async function getReceivables({
	filter,
	filterValue,
	page,
	pageSize,
	sortField,
	sortDirection,
}: QueryParams = {}) {
	const response = await api.get<GetReceivablesResponse>('bidata', {
		params: {
			t: 'DATA_RECEBIVEIS',
			f: filter,
			v: filterValue,
			page,
			pageSize,
			sortField,
			sortDirection,
		},
	})

	return response.data
}

export async function getReceivable(clientId: string) {
	const response = await api.get<GetReceivablesResponse>('bidata', {
		params: {
			t: 'DATA_RECEBIVEIS',
			f: 'CEDENTEID',
			v: clientId,
			page: 1,
			pageSize: 1,
		},
	})

	return response.data.data[0] || null
}
