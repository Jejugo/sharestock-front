import React, { useState, ChangeEvent, useEffect, useRef } from 'react'
import * as S from './Select.styles'
import useWhyDidYouUpdate from 'hooks/whyDidYouUpdate'

type Option = {
  value: string
  label: string
}

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder: string
  isCreatable?: boolean
}

const Select: React.FC<Props> = ({
  options,
  value,
  onChange,
  placeholder,
  isCreatable
}) => {
  const [displayValue, setDisplayValue] = useState<string>(value)
  const [localOptions, setLocalOptions] = useState([] as Option[])

  useEffect(() => {
    setLocalOptions(options)
  }, [options])

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDisplayValue(event.target.value)
    onChange(event.target.value)
  }

  const showPrompt = () => {
    const newOption = prompt('Enter the new option:')
    if (newOption) {
      const newOptionObj = { label: newOption, value: newOption }
      setLocalOptions((prevState) => [...prevState, newOptionObj])
    }
  }

  return (
    <S.SelectWrapper>
      <S.SelectStyled value={displayValue} onChange={handleChange}>
        <S.OptionStyled value="" disabled>
          {placeholder}
        </S.OptionStyled>
        {localOptions.map((option) => (
          <S.OptionStyled key={option.value} value={option.value}>
            {option.label}
          </S.OptionStyled>
        ))}
      </S.SelectStyled>
      {isCreatable && <S.Button onClick={showPrompt}>Add new...</S.Button>}
    </S.SelectWrapper>
  )
}

export default Select
