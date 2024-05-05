import { spacings } from '@styles/constants'
import styled from 'styled-components'

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacings.medium}px;
  align-items: center;
  width: 100%;
  margin-top: ${spacings.xlarge}px;
`
