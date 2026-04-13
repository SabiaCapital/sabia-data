import { UNAUTHORIZED_EVENT } from '@/constants/events'

let unauthorizedPending = false

export function dispatchUnauthorized() {
	if (unauthorizedPending) return

	unauthorizedPending = true

	window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT))

	setTimeout(() => {
		unauthorizedPending = false
	}, 5000)
}
