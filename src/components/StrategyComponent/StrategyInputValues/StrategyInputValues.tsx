import React, { useState } from 'react'
import * as S from './StrategyInputValues.style'
import { useFormContext } from 'react-hook-form'
import Select, { SingleValue } from 'react-select'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

interface IStrategyList {
  name: Partial<AssetTypes>
}

interface ISelectedWeight {
  value: string
  label: string
}

export default function StrategyInputValues({
  name = 'stocks'
}: IStrategyList) {
  const weights: ISelectedWeight[] = [
    { value: '1', label: 'Pouco Relevante' },
    { value: '2', label: 'Relevante' },
    { value: '3', label: 'Muito Relevante' }
  ]

  const { setValue, getValues, watch } = useFormContext()

  const formState = watch()

  const value = getValues()[name] || {}

  const handleInputStatement = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`${name}.statement`, e.target.value)
  }

  const handleDropdownChange = (
    newValue: SingleValue<ISelectedWeight>
  ): void => {
    if (newValue) {
      setValue(`${name}.weight`, newValue.value)
    }
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`${name}.type`, e.target.value)
  }

  return (
    <S.StrategyInputValues>
      {name === 'international' && (
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Type of Asset
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleRadioChange}
          >
            <FormControlLabel
              value="etf"
              control={<Radio sx={{ color: 'white' }} />}
              label="ETF"
            />
            <FormControlLabel
              value="stock"
              control={<Radio sx={{ color: 'white' }} />}
              label="Stock"
            />
            <FormControlLabel
              value="reit"
              control={<Radio sx={{ color: 'white' }} />}
              label="Reit"
            />
            <FormControlLabel
              value="treasury"
              control={<Radio />}
              label="Treasury"
            />
          </RadioGroup>
        </FormControl>
      )}

      <S.StrategyFormInput
        type="text"
        onChange={handleInputStatement}
        value={value.statement}
        placeholder="Digite sua afirmação"
      ></S.StrategyFormInput>
      <S.DropdownStyle>
        <Select
          options={weights}
          value={weights.find((weight) => weight.value == value.weight)}
          onChange={handleDropdownChange}
        ></Select>
      </S.DropdownStyle>
    </S.StrategyInputValues>
  )
}
