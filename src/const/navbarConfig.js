import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SubjectIcon from '@mui/icons-material/Subject';
import TableChartIcon from '@mui/icons-material/TableChart';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import PaidIcon from '@mui/icons-material/Paid';

export default [
	{
		icon: DashboardOutlinedIcon,
		text: 'Dashboard',
		href: '/dashboard'
	},
	{
		icon: ManageSearchOutlinedIcon,
		text: 'Estratégia',
		href: '/strategy'
	},
	{
		icon: PaidIcon,
		text: 'Aportar',
		href: '/invest'
	},
	{
		icon: TableChartIcon,
		text: 'Indicadores',
		href: '/indicators'
	},
	{
		icon: FactCheckIcon,
		text: 'Meus Ativos',
		href: '/my-assets'
	},
	{
		icon: TipsAndUpdatesIcon,
		text: 'Dicas',
		href: '/'
	},
	{
		icon: SubjectIcon,
		text: 'Definições',
		href: '/definitions'
	},
];