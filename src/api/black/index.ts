import axios from 'axios'
import { BLACK_TOKEN_STORAGE_KEY } from '@/constants/storage'
import { dispatchUnauthorized } from '@/lib/events'
import type {
	GetOperationsParams,
	GetOperationDebtorsParams,
	GetReceivablesParams,
	GetOperationsResponse,
	GetOperationResponse,
	GetOperationExtraResponse,
	GetClientResponse,
	GetOperationDebtorsResponse,
	GetReceivablesResponse,
} from './types'

export const api = axios.create({
	baseURL: import.meta.env.VITE_BLACK_API_URL,
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem(BLACK_TOKEN_STORAGE_KEY)

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

api.interceptors.response.use(
	(response) => response,
	(error) => {
		const isCancelled = error.code === 'ERR_CANCELED'
		const isUnauthorized = error.response?.status === 401
		const isNetworkOrCors = !error.response && !isCancelled

		if (isUnauthorized || isNetworkOrCors) {
			dispatchUnauthorized()
		}

		return Promise.reject(error)
	}
)

async function getTempToken() {
	const response = await api.post('Auth/login', {
		email: import.meta.env.VITE_BLACK_API_EMAIL,
		password: import.meta.env.VITE_BLACK_API_PASSWORD,
	})

	return response.data.model
}

export async function getToken() {
	const tempToken = await getTempToken()

	const response = await api.post(
		'Auth/GetToken',
		{},
		{
			headers: {
				Authorization: `Bearer ${tempToken}`,
			},
		}
	)

	return response.data.model
}

export async function getOperations({
	id,
	ids,
	associacao,
	page,
	pageSize,
	keyword,
	sort,
	start,
	end,
	orderby,
	status,
	bloqueado,
	situacaoCedente,
	fidcIds,
	fidcId,
}: GetOperationsParams) {
	const response = await api.get<GetOperationsResponse>('Operacoes/get/list', {
		params: {
			id,
			ids,
			associacao,
			page,
			pageSize,
			keyword,
			sort,
			start,
			end,
			orderby,
			status,
			bloqueado,
			situacaoCedente,
			fidcIds,
			fidcId,
		},
	})

	return response.data.model
}

export async function getOperation(operationId: string) {
	const response = await api.get<GetOperationResponse>(`operacoes/get/unique/${operationId}`)
	return response.data.model
}

export async function getOperationExtra(operationId: string) {
	const response = await api.get<GetOperationExtraResponse>(
		`operacoes/get/dadosoperacao/${operationId}`
	)
	return response.data.model
}

export async function getClientOperations(clientId: string) {
	const response = await api.get(`Operacoes/get/list/by-cedente/${clientId}`)
	return response.data.model
}

export async function getClient(clientId: string) {
	const response = await api.get<GetClientResponse>(`cedente/get/unique/${clientId}`)
	return response.data.model
}

export async function getReceivables({
	id,
	ids,
	associacao,
	page,
	pageSize,
	keyword,
	sort,
	start,
	end,
	orderby,
	status,
	bloqueado,
	situacaoCedente,
	fidcIds,
	fidcId,
}: GetReceivablesParams) {
	const response = await api.get<GetReceivablesResponse>('Recebiveis/get/list', {
		params: {
			id,
			ids,
			associacao,
			page,
			pageSize,
			keyword,
			sort,
			start,
			end,
			orderby,
			status,
			bloqueado,
			situacaoCedente,
			fidcIds,
			fidcId,
		},
	})

	return response.data.model
}

export async function getOperationDebtors({
	operationId,
	page,
	pageSize,
}: GetOperationDebtorsParams) {
	const response = await api.get<GetOperationDebtorsResponse>(
		'operacoes/get/list/aditivoSacado',
		{
			params: {
				id: operationId,
				page,
				pageSize,
			},
		}
	)

	return response.data.model
}
