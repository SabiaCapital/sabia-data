import LogoIcon from '@/assets/svgs/logo.svg?react'
import LogoSmallIcon from '@/assets/svgs/logo-small.svg?react'
import type { LogoProps } from './types'

export function Logo({ className, isSmall, ...props }: LogoProps) {
	const Icon = isSmall ? LogoSmallIcon : LogoIcon

	return <Icon className={className} {...props} />
}
