import React, { FC } from 'react'
import * as S from './Text.styles'
import { CSSObject } from 'styled-components'
import useOverflowTooltip from './hooks/useOverflowTooltip'

interface TextProps {
  children: React.ReactNode
  color?: string
  size?: string
  weight?: string
  style?: CSSObject
  noMargin?: boolean
  noWrap?: boolean
}

const Text: FC<TextProps> = ({
  children,
  color = 'black',
  size = '16px',
  weight = 'normal',
  noMargin = false,
  noWrap = false,
  style
}) => {
  const [textRef, isOverflowing] = useOverflowTooltip()

  return (
    <S.TextContainer>
      <S.StyledText
        ref={textRef as never}
        color={color}
        size={size}
        weight={weight}
        noMargin={noMargin}
        noWrap={noWrap}
        style={style as CSSObject}
      >
        {children}
      </S.StyledText>
      {isOverflowing && <S.Tooltip>{children}</S.Tooltip>}
    </S.TextContainer>
  )
}

export default Text
