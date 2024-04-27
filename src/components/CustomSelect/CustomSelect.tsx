import React, { useEffect, useRef, useState } from 'react'
import Flex from '@components/container/Flex/Flex'
import * as S from './CustomSelect.styles'
import Button from '@components/Button/Button'
import { Delete } from '@material-ui/icons'

interface Option {
  id: string
  name: string
  showDeleteIcon: boolean
}

interface Props {
  options: Option[]
  placeholder?: string
  value: string
  onSelectItem: (option: Option) => void
  onRemoveItem: (itemId: string) => Promise<void>
}

const CustomSelect: React.FC<Props> = ({
  value,
  options,
  placeholder,
  onSelectItem,
  onRemoveItem
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleRemoveItem = async (id: string) => {
    setIsLoading(true)
    await onRemoveItem(id)
    setIsLoading(false)
  }

  const handleSelectItem = (item: Option) => {
    onSelectItem(item)
    setIsOpen(false)
  }

  const handleClickedOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', handleClickedOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <S.DropdownContainer>
      <S.DropdownButton onClick={() => setIsOpen(!isOpen)} type="button">
        {value || placeholder}
      </S.DropdownButton>
      {isOpen && (
        <S.DropdownContent ref={dropdownRef}>
          {isLoading ? (
            <S.LoadingIcon>Loading...</S.LoadingIcon>
          ) : (
            <>
              <S.InputWrapper>
                <S.Input
                  type="text"
                  value={searchText}
                  onChange={(e: any) => setSearchText(e.target.value)}
                  maxLength={50}
                  placeholder="Pesquisar"
                />
              </S.InputWrapper>
              {filteredOptions.map((option: Option, index: number) => (
                <Flex
                  key={option.id}
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <S.OptionDiv
                    key={index}
                    onClick={() => handleSelectItem(option)}
                  >
                    {option.name}
                  </S.OptionDiv>
                  {option.showDeleteIcon && (
                    <Delete
                      onClick={() => handleRemoveItem(option.id)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </Flex>
              ))}
            </>
          )}
        </S.DropdownContent>
      )}
    </S.DropdownContainer>
  )
}

export default CustomSelect
