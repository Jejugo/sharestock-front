import Modal from '@components/Modal/Modal'
import React from 'react'
import * as S from './ConfirmationModal.styles'
import Button from '@components/Button/Button'
import styled from 'styled-components'

export const StyledButton = styled(Button)`
  padding: 10px;
`

export default function ConfirmationModal({
  children,
  isOpen,
  onConfirm,
  onCancel
}: {
  children?: React.ReactNode
  isOpen: boolean
  onConfirm: any
  onCancel: any
  text?: string
}) {
  return (
    <Modal onClose={onCancel} isOpen={isOpen}>
      {children}
      <S.ModalFooter>
        <StyledButton text="Cancelar" onClick={onCancel} variant="secondary" />
        <StyledButton text="Confirmar" onClick={onConfirm} variant="error" />
      </S.ModalFooter>
    </Modal>
  )
}
