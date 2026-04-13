import dayjs from 'dayjs'
import type { GetCreditHubResponse } from '@/api/credit-hub/types'

export function getLastSocietaryChange(
	shareholders?: GetCreditHubResponse['data']['quadroSocietario']
): string | null {
	if (!shareholders?.length) return '-'

	const mergedDates = shareholders.flatMap((shareholder) =>
		[shareholder.dataEntrada, shareholder.dataSaida].filter(Boolean)
	)

	const parsedDates = mergedDates.map((date) => dayjs(date, 'DD/MM/YYYY'))

	if (!parsedDates.length) return null

	const lastDate = parsedDates.reduce((a, b) => (b.isAfter(a) ? b : a))

	return lastDate.format('DD/MM/YYYY')
}
