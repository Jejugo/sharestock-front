import { fonts, colors, spacings } from '@styles/constants'
import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  position: relative;
  background: ${colors.white};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 50%;
  max-width: 500px;
  z-index: 1001;
`

export const ModalCloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: ${fonts.xlarge}px;
  cursor: pointer;
`

export const ModalTextContent = styled.div`
  margin: ${spacings.large}px 0px 0px 0px;
`
