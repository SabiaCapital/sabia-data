export function formatCnpj(cnpj?: string, { unmask = false }: { unmask?: boolean } = {}) {
	if (cnpj === undefined || cnpj === null) return ''

	const digits = cnpj.replace(/[^\d]+/g, '')

	if (unmask) return digits

	return digits.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

export function isCnpj(value?: string) {
	if (!value) return false

	const cnpjRegex = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/
	return cnpjRegex.test(value)
}

export function getEmailLocalPart(email: string) {
	const [localPart] = email.split('@')
	return localPart
}

export function getModalityLabel(modality?: number) {
	if (modality === undefined || modality === null) return 'DESCONHECIDA'

	const modalityMap: Record<number, string> = {
		0: 'COMISSÁRIA',
		1: 'DESCONTO',
		2: 'INTERCOMPANY',
		3: 'CCB',
		4: 'CONTRATO',
		5: 'COBRANÇA SIMPLES',
		6: 'ESCROW',
		7: 'LCC',
		8: 'FINANCIAMENTO',
		9: 'OUTROS',
		10: 'DESCONTO',
		11: 'GARANTIA',
		12: 'ACORDO',
		13: 'CCB PÓS FIXADA',
		14: 'NOTA COMERCIAL',
		15: 'FOMENTO',
		16: 'SEM NOTA',
		99: 'INVÁLIDO',
	}

	return modalityMap[modality] ?? 'DESCONHECIDA'
}

export function getTypeLabel(type: number) {
	const typeMap: Record<number, string> = {
		1: 'DUPLICATA',
		2: 'NOTA PROMISSÓRIA',
		3: 'NOTA DE SEGURO',
		4: 'COBRANÇA SERIADA',
		5: 'RECIBO',
		6: 'NOTA PROMISSÓRIA FÍSICA',
		7: 'NOTA COMERCIAL',
		10: 'LETRAS DE CÂMBIO',
		11: 'NOTA DE DÉBITO',
		12: 'DUPLICATA DE SERVIÇO',
		13: 'PRECATÓRIOS',
		14: 'DUPLICATA DE SERVIÇO FÍSICO',
		15: 'DUPLICATA DE TRANSPORTE DIGITAL',
		16: 'DUPLICATA DE TRANSPORTE FÍSICA',
		21: 'RENEGOCIAÇÃO DA DÍVIDA',
		25: 'NOTA COMERCIAL 3',
		41: 'CCB DIGITAL',
		51: 'CHEQUE 1',
		52: 'CHEQUE MANUAL',
		57: 'CÉDULA PRODUTO RURAL',
		60: 'CONTRATO',
		61: 'CONTRATO FÍSICO',
		62: 'CONFISSÃO DE DÍVIDA',
		64: 'ASSUNÇÃO DE DÍVIDA',
		65: 'OPERAÇÃO DE CARTÃO DE CRÉDITO',
		70: 'CCB PRÉ DIGITAL',
		71: 'CCB PRÉ BALCÃO',
		72: 'CCB PRÉ CETIP',
		73: 'OUTROS',
		74: 'CCB FORMALIZAÇÃO FONADA',
		79: 'NOTA COMERCIAL 2',
		80: 'CRÉDITOS JUDICIAIS',
		81: 'CCB 2',
		83: 'CÉDULA PRODUTO RURAL FINANCEIRA',
		87: 'CHEQUE 2',
		99: 'OUTRO',
	}

	return typeMap[type] ?? 'DESCONHECIDO'
}

export function getStatusLabel(status?: number) {
	if (status === undefined || status === null) return 'DESCONHECIDO'

	const statusMap: Record<number, string> = {
		0: 'ABERTA',
		1: 'FECHADA',
	}

	return statusMap[status] ?? 'DESCONHECIDO'
}
