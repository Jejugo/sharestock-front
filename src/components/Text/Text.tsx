import React, { FC } from 'react'
import * as S from './Text.styles'
import { CSSObject, CSSProperties } from 'styled-components'

interface TextProps {
  children: React.ReactNode
  color?: string
  size?: string
  weight?: string
  style?: CSSObject
}

/**
 * A reusable component for rendering text.
 *
 * @param {string} [color] - the color of the text (default is black)
 * @param {string} [size] - the size of the text (default is 16px)
 * @param {string} [weight] - the weight of the text (default is normal)
 * @param {string} [style] - any additional styles to be applied to the text
 * @return {JSX.Element} - a React component for rendering text
 */
const Text: FC<TextProps> = ({
  children,
  color = 'black',
  size = '16px',
  weight = 'normal',
  style
}) => (
  <S.StyledText
    color={color}
    size={size}
    weight={weight}
    style={style as CSSObject}
  >
    {children}
  </S.StyledText>
)

export default Text
