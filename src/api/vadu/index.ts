import axios from 'axios'
import { VADU_TOKEN_STORAGE_KEY } from '@/constants/storage'
import { UNAUTHORIZED_EVENT } from '@/constants/events'

export const api = axios.create({
	baseURL: import.meta.env.VITE_VADU_API_URL,
})

api.interceptors.request.use((config) => {
	const token = localStorage.getItem(VADU_TOKEN_STORAGE_KEY)

	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT))
		}

		return Promise.reject(error)
	}
)

export async function getToken() {
	const response = await api.get('Autenticacao/JSONPegarToken', {
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_VADU_API_KEY}`,
		},
	})

	console.log(response)
	return response.data.token
}

/* export async function enviarAnaliseCNPJ({
	cnpjEmpresa,
	idGrupoAnalise,
	listaCnpjs,
}: {
	cnpjEmpresa: string
	idGrupoAnalise: number
	listaCnpjs: string[]
}) {
	const response = await vaduApi.post('vadu.dll/MotorCredito/JSONEnviarAnalise', {
		cnpj_empresa: cnpjEmpresa,
		id_grupo_analise: idGrupoAnalise,
		lista_cnpj_cpf: listaCnpjs,
	})

	return response.data
} */
