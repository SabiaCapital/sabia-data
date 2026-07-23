import axios from 'axios'
import { MANTYZ_TOKEN_STORAGE_KEY } from '@/constants/storage'
import { dispatchUnauthorized } from '@/lib/events'
import type { GetMantyzResponse, GetMantyzCreditResponse } from './types'

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

export async function requestAnalysis(
	cnpj: string,
	idPoliticaCredito: number = 1,
	limitesSolicitado: number = 0
): Promise<{ protocolo: string; mensagem_alerta: string | null }> {
	const cleanCnpj = cnpj.replace(/\D/g, '')
	
	const resp = await api.post<{
		content: { protocolo: string; mensagem_alerta: string | null }
		success: boolean
		error_message: string | null
	}>(
		'motoranalise/api/consultar/analise',
		{
			dados: {
				documento: cleanCnpj,
				id_politica_credito_padrao: idPoliticaCredito,
				dados_motor: null,
				limite_solicitado: limitesSolicitado,
			},
		}
	)

	if (!resp.data.success) {
		throw new Error(resp.data.error_message || 'Erro ao disparar análise')
	}

	return resp.data.content
}

export async function getMantyzGeral(cnpj: string): Promise<GetMantyzCreditResponse['content']> {
	const now = new Date()
	const months: { ano: number; mes: number }[] = []

	for (let i = 0; i < 12; i++) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
		months.push({ ano: d.getFullYear(), mes: d.getMonth() + 1 })
	}

	let analysisId: number | null = null

	for (const { ano, mes } of months) {
		const resp = await api.post<{ content: { dados: { id_analise_credito: number }[] } | null }>(
			'portal/api/ConsultaCredito/ConsultaCredito',
			{ pagina: 1, num_paginas: 1, ano, mes, filtro: cnpj }
		)
		const dados = resp.data?.content?.dados
		if (dados?.length) {
			analysisId = dados[0].id_analise_credito
			break
		}
	}

	// Se não encontrou análise anterior, dispara uma nova
	if (!analysisId) {
		try {
			await requestAnalysis(cnpj)
			// Retorna null indicando que foi disparada uma análise e está processando
			return null
		} catch (error) {
			console.error('Erro ao disparar análise:', error)
			return null
		}
	}

	const resp = await api.post<GetMantyzCreditResponse>(
		'integracaomotor/portal/api/consulta/geral',
		{ id_analise_credito: analysisId }
	)

	return resp.data?.content ?? null
}
