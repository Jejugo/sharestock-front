import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'
import SubjectIcon from '@mui/icons-material/Subject'
import TableChartIcon from '@mui/icons-material/TableChart'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined'
import PaidIcon from '@mui/icons-material/Paid'
import { OverridableComponent } from '@material-ui/core/OverridableComponent'
import { SvgIconTypeMap } from '@material-ui/core'

export interface INavbarItem {
  icon: OverridableComponent<SvgIconTypeMap<any, 'svg'>> & {
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
    icon: DashboardOutlinedIcon,
    text: 'Objetivos',
    href: '/goals'
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
    href: '/how-to-start'
  },
  {
    icon: SubjectIcon,
    text: 'Definições',
    href: '/definitions'
  }
]
