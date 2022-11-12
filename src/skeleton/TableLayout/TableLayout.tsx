import React from 'react'
import * as S from './styles'

interface TableLayoutProps {
  children: React.ReactNode
}

const TableLayout = ({ children }: TableLayoutProps) => (
  <S.TableLayoutContainer>{children}</S.TableLayoutContainer>
)

export default TableLayout
