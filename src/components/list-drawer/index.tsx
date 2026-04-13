import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import type { ListDrawerProps } from './types'

export function ListDrawer<T>({ title, triggerLabel, columns, data }: ListDrawerProps<T>) {
	return (
		<Drawer direction='bottom'>
			<DrawerTrigger asChild>
				<Button type='button' variant='link' className='h-auto p-0 text-sm'>
					{triggerLabel}
				</Button>
			</DrawerTrigger>

			<DrawerContent>
				<DrawerHeader className='flex flex-row items-center justify-between'>
					<DrawerTitle>{title}</DrawerTitle>

					<DrawerClose asChild>
						<Button type='button' variant='ghost' size='icon'>
							<X />
						</Button>
					</DrawerClose>
				</DrawerHeader>

				<ScrollArea data-vaul-no-drag className='h-88 px-4 pb-4' orientation='both'>
					<Table>
						<TableHeader>
							<TableRow>
								{columns.map((col) => (
									<TableHead key={col.header}>{col.header}</TableHead>
								))}
							</TableRow>
						</TableHeader>

						<TableBody>
							{data.map((item, i) => (
								<TableRow key={i}>
									{columns.map((col) => (
										<TableCell
											key={col.header}
											className='max-w-[240px] align-top break-words whitespace-normal'
										>
											{col.render(item)}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}
