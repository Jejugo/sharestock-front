import React from 'react'
import * as S from './styles'

interface TextLayoutProps {
  children: React.ReactNode
}

const TextLayout = ({ children }: TextLayoutProps) => (
  <S.TextLayourWrapper>
    <S.TextLayourContainer>{children}</S.TextLayourContainer>
  </S.TextLayourWrapper>
)

export default TextLayout
