import dayjs from 'dayjs'
import type { GetMantyzResponse, GetMantyzCreditResponse } from '@/api/mantyz/types'

export interface SabiaScoreCalculation {
	totalScore: number
	maxScore: number
	classification: 'Risco Baixo' | 'Risco Médio' | 'Risco Alto'
	breakdown: {
		companyAge: {
			years: number
			points: number
			description: string
		}
		revenue: {
			value: number
			points: number
			description: string
		}
		capitalStock: {
			value: number
			points: number
			description: string
		}
		restrictions: {
			totalValue: number
			points: number
			description: string
		}
		societyStatus: {
			points: number
			description: string
		}
	}
}

export function calculateSabiaScore(
	mantyzData?: GetMantyzResponse['content'],
	geralData?: GetMantyzCreditResponse['content']
): SabiaScoreCalculation {
	const geralDg = geralData?.identificacao?.dados_gerais
	const mantyzDg = mantyzData?.pessoa_juridica?.identificacao.dados_gerais
	const dadosGerais = geralDg ?? mantyzDg

	let totalScore = 0
	const maxScore = 130

	// 1. Company Age (Tempo de Empresa)
	const { years: companyYears, points: agePoints, description: ageDescription } = calculateCompanyAge(dadosGerais?.fundacao)
	totalScore += agePoints

	// 2. Revenue (Faturamento)
	const { value: revenueValue, points: revenuePoints, description: revenueDescription } = calculateRevenue(geralDg?.faturamento_presumido)
	totalScore += revenuePoints

	// 3. Capital Stock (Capital Social)
	const { value: capitalValue, points: capitalPoints, description: capitalDescription } = calculateCapitalStock(dadosGerais?.capital_social)
	totalScore += capitalPoints

	// 4. Restrictions (Restritivos)
	const { totalValue: restrictionsValue, points: restrictionsPoints, description: restrictionsDescription } = calculateRestrictions(
		mantyzData?.pessoa_juridica?.pendencias_financeiras
	)
	totalScore += restrictionsPoints

	// 5. Society Status (Situação Societária)
	const { points: societyPoints, description: societyDescription } = calculateSocietyStatus(mantyzData?.pessoa_juridica?.identificacao)
	totalScore += societyPoints

	// Ensure score doesn't exceed max
	totalScore = Math.min(totalScore, maxScore)

	// Classify the score
	let classification: 'Risco Baixo' | 'Risco Médio' | 'Risco Alto'
	if (totalScore >= 110) {
		classification = 'Risco Baixo'
	} else if (totalScore >= 80) {
		classification = 'Risco Médio'
	} else {
		classification = 'Risco Alto'
	}

	return {
		totalScore,
		maxScore,
		classification,
		breakdown: {
			companyAge: {
				years: companyYears,
				points: agePoints,
				description: ageDescription,
			},
			revenue: {
				value: revenueValue,
				points: revenuePoints,
				description: revenueDescription,
			},
			capitalStock: {
				value: capitalValue,
				points: capitalPoints,
				description: capitalDescription,
			},
			restrictions: {
				totalValue: restrictionsValue,
				points: restrictionsPoints,
				description: restrictionsDescription,
			},
			societyStatus: {
				points: societyPoints,
				description: societyDescription,
			},
		},
	}
}

function calculateCompanyAge(fundacao?: string | null): { years: number; points: number; description: string } {
	if (!fundacao) {
		return { years: 0, points: 0, description: 'Data de fundação não informada' }
	}

	const foundationDate = dayjs(fundacao)
	if (!foundationDate.isValid()) {
		return { years: 0, points: 0, description: 'Data de fundação inválida' }
	}

	const today = dayjs()
	const years = today.diff(foundationDate, 'year')

	let points = 0
	if (years <= 5) {
		points = 10
	} else if (years <= 10) {
		points = 20
	} else if (years <= 20) {
		points = 30
	} else {
		points = 40
	}

	return {
		years,
		points,
		description: `${years} anos`,
	}
}

function calculateRevenue(faturamento?: number | null): { value: number; points: number; description: string } {
	if (!faturamento) {
		return { value: 0, points: 0, description: 'Faturamento não informado' }
	}

	let points = 0
	if (faturamento <= 10_000_000) {
		points = 10
	} else if (faturamento <= 50_000_000) {
		points = 20
	} else if (faturamento <= 100_000_000) {
		points = 30
	} else {
		points = 40
	}

	return {
		value: faturamento,
		points,
		description: `R$ ${(faturamento / 1_000_000).toFixed(2).replace('.', ',')} milhões`,
	}
}

function calculateCapitalStock(capitalSocial?: number | null): { value: number; points: number; description: string } {
	if (!capitalSocial) {
		return { value: 0, points: 0, description: 'Capital social não informado' }
	}

	let points = 0
	if (capitalSocial <= 1_000_000) {
		points = 5
	} else if (capitalSocial <= 10_000_000) {
		points = 10
	} else if (capitalSocial <= 30_000_000) {
		points = 20
	} else {
		points = 30
	}

	return {
		value: capitalSocial,
		points,
		description: `R$ ${(capitalSocial / 1_000_000).toFixed(2).replace('.', ',')} milhões`,
	}
}

function calculateRestrictions(pendencias: any): { totalValue: number; points: number; description: string } {
	if (!pendencias) {
		return { totalValue: 0, points: 40, description: 'Sem restritivos' }
	}

	let totalValue = 0

	// Add all restriction values
	const mr = pendencias.restritivo_mercado
	if (mr) {
		totalValue += mr.valor_pefin || 0
		totalValue += mr.valor_refin || 0
		totalValue += mr.valor_protestos || 0
		totalValue += mr.valor_dividas_venciadas || 0
	}

	// Add cheques sem fundo
	const cheques = pendencias.cheques_sem_fundo || []
	cheques.forEach((c: any) => {
		totalValue += c.valor || 0
	})

	// Add legal actions
	const acoes = pendencias.acoes
	if (acoes) {
		const judicial = acoes.acoes_judiciais || []
		judicial.forEach((a: any) => {
			totalValue += a.valor || 0
		})

		const trabalhistas = acoes.acoes_trabalhistas || []
		trabalhistas.forEach((a: any) => {
			totalValue += a.valor || 0
		})
	}

	let points = 0
	if (totalValue === 0) {
		points = 40
	} else if (totalValue <= 1_000_000) {
		points = 20
	} else if (totalValue <= 10_000_000) {
		points = 10
	} else {
		points = 0
	}

	return {
		totalValue,
		points,
		description: totalValue === 0 ? 'Sem restritivos' : `Acima de R$ ${(totalValue / 1_000_000).toFixed(2).replace('.', ',')} milhões`,
	}
}

function calculateSocietyStatus(identification: any): { points: number; description: string } {
	if (!identification) {
		return { points: 0, description: 'Dados societários não informados' }
	}

	let hasGraveRestrictions = false
	let hasLightRestrictions = false

	// Check shareholders
	const socios = identification.dados_socios || []
	socios.forEach((s: any) => {
		if (s.possui_apontamento) {
			hasLightRestrictions = true
		}
	})

	// Check linked companies for Recuperação Judicial
	const empresasLigadas = identification.participacoes_empresa || []
	empresasLigadas.forEach((e: any) => {
		if (e.situacao_cadastral?.includes('Recuperação Judicial')) {
			hasGraveRestrictions = true
		}
	})

	if (hasGraveRestrictions) {
		return { points: 0, description: 'Empresas ligadas em Recuperação Judicial' }
	} else if (hasLightRestrictions) {
		return { points: 10, description: 'Sócios com restrições leves' }
	} else {
		return { points: 20, description: 'Sócios sem restrições' }
	}
}
