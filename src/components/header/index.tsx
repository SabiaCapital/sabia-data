import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-is-mobile'
import logo from '@/assets/images/logo.png'
import logoSmall from '@/assets/images/logo-small.png'
import { getEmailLocalPart } from '@/utils/text'
import { useUser } from '@/hooks/use-user'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export function Header() {
	const [isLoading, setIsLoading] = useState(false)
	const { user, logout } = useUser()
	const isMobile = useIsMobile()

	const handleLogout = async () => {
		setIsLoading(true)
		const result = await logout()
		setIsLoading(false)

		if (!result.success) {
			toast.error(result.error.message)
			return
		}

		toast.info('A sua sessão foi encerrada.')
	}

	return (
		<header className='relative flex h-16 flex-row-reverse items-center justify-end gap-6 border-b px-10 md:justify-center'>
			<div className='left-10 flex items-center md:absolute'>
				<ThemeToggle />
			</div>

			<img
				className='h-6 invert-90 md:h-8 dark:invert-5'
				src={isMobile ? logoSmall : logo}
				alt=''
			/>

			<div className='absolute right-10 flex items-center gap-4'>
				{!!user?.email && (
					<span className='text-muted-foreground text-sm'>
						{getEmailLocalPart(user.email)}
					</span>
				)}

				<Button
					variant={isMobile ? 'outline' : 'ghost'}
					size={isMobile ? 'icon' : 'default'}
					disabled={isLoading}
					onClick={handleLogout}
				>
					<LogOut />
					{!isMobile && 'Sair'}
				</Button>
			</div>
		</header>
	)
}
