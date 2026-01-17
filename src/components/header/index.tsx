import { useState } from 'react'
import { LogOut } from 'lucide-react'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-is-mobile'
import { getEmailLocalPart } from '@/utils/text'
import { useUser } from '@/hooks/use-user'
import { Button } from '@/components/ui/button'
import { SidebarTrigger, useSidebar } from '@/components/ui/sidebar'

export function Header() {
	const [isLoading, setIsLoading] = useState(false)
	const { user, logout } = useUser()
	const { open } = useSidebar()
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
		<header
			className={`bg-background fixed top-0 right-0 shadow-xs ${open && !isMobile ? 'left-(--sidebar-width)' : 'left-0'} z-10 flex h-16 items-center justify-between border-b px-6 transition-[left] duration-200 ease-linear md:px-8`}
		>
			<SidebarTrigger />

			<div className='flex items-center gap-4'>
				{!!user?.email && (
					<span className='text-muted-foreground text-sm'>
						{isMobile ? getEmailLocalPart(user.email) : user.email}
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
