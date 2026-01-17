import { Home, TrendingUp, Search } from 'lucide-react'
import { MAIN_PATH, OPERATIONS_PATH, CNPJ_SEARCH_PATH } from '@/constants/paths'

export const menuItems = [
	{
		label: 'Início',
		path: MAIN_PATH,
		icon: Home,
	},
	{
		label: 'Operações',
		path: OPERATIONS_PATH,
		icon: TrendingUp,
	},
	{
		label: 'Pesquisar CNPJ',
		path: CNPJ_SEARCH_PATH,
		icon: Search,
	},
]
