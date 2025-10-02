import axios from 'axios'
import type { GetCreditHubResponse } from './types'

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_CREDIT_HUB_API_URL}/${import.meta.env.VITE_CREDIT_HUB_API_KEY}`,
})

export async function getCreditHub(cnpj: string) {
	const response = await api.get<GetCreditHubResponse>(cnpj, {
		params: {
			refin: true,
			pefin: true,
		},
	})
	return response.data.data
}
