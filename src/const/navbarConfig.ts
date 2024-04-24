import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import SubjectIcon from '@mui/icons-material/Subject'
import TableChartIcon from '@mui/icons-material/TableChart'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import FlagIcon from '@mui/icons-material/Flag'
import PaidIcon from '@mui/icons-material/Paid'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core'

export interface INavbarItem {
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & {
    muiName: string
  }
  text: string
  href: string
}

export default [
  {
    icon: DashboardOutlinedIcon,
    text: 'Dashboard',
    href: '/'
  },
  {
    icon: FlagIcon,
    text: 'Objetivos',
    href: '/goals'
  },
  {
    icon: ManageSearchOutlinedIcon,
    text: 'Estratégia',
    href: '/strategy'
  },
  // {
  //   icon: BalanceIcon,
  //   text: 'Balancear',
  //   href: '/balance'
  // },
  {
    icon: TableChartIcon,
    text: 'Indicadores',
    href: '/indicators/stocks'
  },
  {
    icon: PaidIcon,
    text: 'Aportar',
    href: '/invest'
  },
  {
    icon: TipsAndUpdatesIcon,
    text: 'Dicas',
    href: '/how-to-start'
  },
  {
    icon: SubjectIcon,
    text: 'Definições',
    href: '/definitions'
  }
] as INavbarItem[]
