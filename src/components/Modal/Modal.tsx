import React, { useEffect } from 'react'
import * as S from './Modal.styles'

const Modal = ({ isOpen, children, onClose }: any) => {
  if (!isOpen) return null

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.ModalCloseButton onClick={onClose}>X</S.ModalCloseButton>
        <S.ModalTextContent>{children}</S.ModalTextContent>
      </S.ModalContent>
    </S.ModalOverlay>
  )
}

export default Modal
