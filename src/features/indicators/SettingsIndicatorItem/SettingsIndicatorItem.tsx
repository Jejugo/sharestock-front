import React, { useEffect, useMemo } from 'react'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { makeStyles } from '@material-ui/core/styles'

import * as S from './styles'
import { Controller } from 'react-hook-form'

interface IIndicatorConfiguration {
  lowerLimit?: string
  upperLimit?: string
}

const useStyles = makeStyles((theme) => ({
  selectStyle: {
    maxHeight: 100
  }
}))

function SettingsIndicatorItem({ title, name, formData }: any) {
  const classes = useStyles()
  const generateOptions = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        label: (i + 1).toString(),
        value: i + 1
      })),
    []
  )

  return (
    <section>
      <h3>{title}</h3>
      <S.ModalItem>
        <FormControl
          sx={{
            m: 1,
            minWidth: 100
          }}
        >
          <InputLabel id="pl-input-lowerlimit-label">From</InputLabel>
          <Controller
            name={`${name}_lowerLimit`}
            defaultValue={''}
            control={formData.control}
            render={({ field }: any) => (
              <Select
                {...field}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid darkgrey',
                  outline: 'none'
                }}
                labelId="pl-input-lowerlimit-label"
                id="pl-input-lowerlimit"
                label="From"
                MenuProps={{
                  classes: {
                    paper: classes.selectStyle
                  }
                }}
              >
                {generateOptions.length
                  ? generateOptions.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            )}
          />
        </FormControl>
        <FormControl
          sx={{
            m: 1,
            minWidth: 100
          }}
        >
          <InputLabel id="pl-input-upperlimit-label">To</InputLabel>
          <Controller
            name={`${name}_upperLimit`}
            defaultValue={''}
            control={formData.control}
            render={({ field }: any) => (
              <Select
                {...field}
                sx={{
                  backgroundColor: 'white',
                  border: '1px solid darkgrey',
                  outline: 'none',
                  '&:focus': {
                    outline: 'none'
                  }
                }}
                labelId="pl-input-upperlimit-label"
                id="pl-input-upperlimit"
                label="From"
                MenuProps={{
                  classes: {
                    paper: classes.selectStyle
                  }
                }}
              >
                {generateOptions.length
                  ? generateOptions.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            )}
          />
        </FormControl>
      </S.ModalItem>
    </section>
  )
}

export default SettingsIndicatorItem
