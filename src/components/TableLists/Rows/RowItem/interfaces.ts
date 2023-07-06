export interface IRowStyle {
  name: string
}

export interface IRowItemStyle {
  status: string | null
}

export interface IRowHeaderStyle {
  fixTableHeader: boolean
}

export interface IRowItemPlusStyle {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => any
}
