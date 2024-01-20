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
  name: Omit<AssetTypes, 'overview'>
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

  const { setValue, getValues, watch, reset } = useFormContext()

  const formState = watch()
  console.log('formState', formState)

  const value = getValues()[name as AssetTypes] || {}

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
    reset({
      ...getValues(),
      [name.toString()]: {
        statement: '',
        weight: '',
        type: e.target.value,
        statements: []
      }
    })
  }

  return (
    <S.StrategyInputValues>
      {name === 'international' && (
        <FormControl>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ color: 'white' }}
          >
            Type of Asset
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleRadioChange}
            sx={{
              color: 'white',
              '&.Mui-checked': { color: 'white' }
            }}
          >
            <FormControlLabel
              value="etf"
              control={<Radio sx={{ color: 'white' }} />}
              label="ETF"
              checked={formState.international.type === 'etf'}
            />
            <FormControlLabel
              value="stock"
              control={<Radio sx={{ color: 'white' }} />}
              label="Stock"
              checked={formState.international.type === 'stock'}
            />
            <FormControlLabel
              value="reit"
              control={<Radio sx={{ color: 'white' }} />}
              label="Reit"
              checked={formState.international.type === 'reit'}
            />
            <FormControlLabel
              value="treasury"
              control={<Radio sx={{ color: 'white' }} />}
              label="Treasury"
              checked={formState.international.type === 'treasury'}
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
