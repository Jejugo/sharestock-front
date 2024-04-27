import styled from 'styled-components'
import Slider from '@mui/material/Slider'

import { colors, fonts, spacings, radius } from '@styles/constants'

export const MainSection = styled.section``

export const PercentagesTitle = styled.h1`
  font-size: ${fonts.xlarge}px;
  text-align: center;
`

export const InvestTypeTitle = styled.h6`
  font-size: ${fonts.medium}px;
  margin: ${spacings.medium}px 0;
  text-align: center;
`

export const PercentagesFeedback = styled.h6`
  font-size: ${fonts.medium}px;
  color: ${(props) => props.color};
`

export const PercentageList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  overflow: auto;
  margin: 0;
`

export const PercentageListItem = styled.li`
  margin: ${spacings.xsmall}px 0;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PercentageDropdown = styled.select`
  list-style: none;
  width: 100%;
  padding: ${spacings.xsmall}px;
  margin: ${spacings.xsmall}px 0;
  font-size: 16px;
`

export const PercentageValue = styled.span`
  margin-left: ${spacings.xlarge}px;
`

export const PercentageItemRemove = styled.span`
  margin-left: ${spacings.xlarge}px;
  cursor: pointer;
`

export const PercentageWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 70vh;
`
export const ChartComponent = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;
`

export const Percentages = styled.div`
  width: 50%;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  margin: ${spacings.xxlarge}px 0;
`

export const PercentageHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const PercentageSlider = styled.div`
  width: 100%;
  display: flex;
`

interface ISlider {
  customColor: string
}

export const CustomSlider = styled(Slider)((props: ISlider) => ({
  '& .MuiSlider-thumb': {
    backgroundColor: props.customColor //color of thumbs
  },
  '& .MuiSlider-rail': {
    color: props.customColor ////color of the slider outside  teh area between thumbs
  },
  '& .MuiSlider-track': {
    color: props.customColor ////color of the slider outside  teh area between thumbs
  }
}))

export const AddItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${fonts.xxlarge}px;
  padding: ${spacings.small}px ${spacings.large}px;
  border-radius: ${radius.medium}px;
  height: 30px;
  background-color: ${colors.darkGrey};
  cursor: pointer;
  &:hover {
    background-color: ${colors.grey};
  }
`

export const AssetTypeModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacings.large}px;
  height: 200px;
  margin: 0 ${spacings.xxlarge};
`
