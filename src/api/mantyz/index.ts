import axios from 'axios'
import { MANTYZ_TOKEN_STORAGE_KEY } from '@/constants/storage'
import { dispatchUnauthorized } from '@/lib/events'
import type { GetMantyzResponse } from './types'

export const api = axios.create({
	baseURL: import.meta.env.VITE_MANTYZ_API_URL,
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem(MANTYZ_TOKEN_STORAGE_KEY)

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

export async function getToken() {
	const response = await api.post('portal/api/token', {
		email: import.meta.env.VITE_MANTYZ_API_EMAIL,
		senha: import.meta.env.VITE_MANTYZ_API_PASSWORD,
	})

	return response.data.content.access_token
}

export async function getMantyz(cnpj: string) {
	const response = await api.post<GetMantyzResponse>(
		'bigdata/api/ConsultaCadastral/PesquisaDocumento',
		{
			id_tipo: 2,
			cnpj_cpf: cnpj,
		}
	)

	return response.data.content
}
