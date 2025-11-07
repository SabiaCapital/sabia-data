export function formatCurrency(value?: number | string | null) {
	if (value === null || value === undefined) {
		return value
	}

	const parsedValue = typeof value === 'string' ? parseFloat(value) : value

	return parsedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatPercentage(
	value?: number | string | null,
	fractionDigits = 1,
	scale: 'percent' | 'fraction' = 'percent'
) {
	if (value === null || value === undefined) {
		return value
	}

	const parsedValue = typeof value === 'string' ? parseFloat(value) : value

	const normalizedValue = scale === 'fraction' ? parsedValue : parsedValue / 100

	return normalizedValue.toLocaleString('pt-BR', {
		style: 'percent',
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	})
}
