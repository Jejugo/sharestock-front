// Styles
export interface ITableHeaderIcon {
  clickable?: boolean
  name?: string
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void | Promise<void>
}
