import { useState, useEffect, useCallback } from 'react'
import Modal from '@components/Modal/Modal'
import React from 'react'
import Title from '@components/Title/Title'
import Input from '@components/Input/Input'
import Button from '@components/Button/Button'

import * as S from '../styles'

type AssetTypeModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onAddNewDropdownItem: (item: string) => Promise<void>
}

export default function AssetTypeModal({
  isOpen,
  setIsOpen,
  onAddNewDropdownItem
}: AssetTypeModalProps) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | KeyboardEvent) => {
      e.preventDefault()
      onAddNewDropdownItem(inputValue)
    },
    [onAddNewDropdownItem, inputValue]
  )

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  useEffect(() => {
    return () => {
      setInputValue('')
    }
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <S.AssetTypeModalWrapper>
        <Title text="Nova categoria" color="black" />

        <Input
          placeholder="Adicione sua nova categoria"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button text="Salvar" width="100" height="30" onClick={handleSubmit} />
      </S.AssetTypeModalWrapper>
    </Modal>
  )
}
