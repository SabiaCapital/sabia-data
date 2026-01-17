import { NavLink } from 'react-router'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarFooter,
	SidebarHeader,
} from '@/components/ui/sidebar'
import { Logo } from '@/components/logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { menuItems } from './helpers'

export function Menu() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarHeader className='px-4 py-0'>
					<Logo className='h-16 w-34' />
				</SidebarHeader>

				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map(({ label, path, icon: Icon }) => (
								<NavLink key={label} to={path}>
									{({ isActive }) => (
										<SidebarMenuItem>
											<SidebarMenuButton
												asChild
												isActive={isActive}
												tooltip={label}
											>
												<span>
													<Icon />
													<span>{label}</span>
												</span>
											</SidebarMenuButton>
										</SidebarMenuItem>
									)}
								</NavLink>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className='p-4'>
				<ThemeToggle />
			</SidebarFooter>
		</Sidebar>
	)
}
