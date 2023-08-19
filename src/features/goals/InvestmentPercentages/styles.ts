import styled from 'styled-components'
import Slider from '@mui/material/Slider'

import { colors, fonts, spacings } from 'styles/constants'

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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const PercentageListItem = styled.li`
  margin: ${spacings.xsmall}px 0;
  display: flex;
  width: 60%;
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

export const PercentageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column;
  }
`
export const ChartComponent = styled.div`
  height: 400px;
  width: 30vw;
`

export const Percentages = styled.div`
  width: 40vw;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  font-size: 30px;
  width: 60%;
  height: 50px;
  background-color: ${colors.darkGrey};
  cursor: pointer;
  &:hover {
    background-color: ${colors.grey};
  }
`
