import styled from 'styled-components'
import Slider from '@mui/material/Slider'

export const MainSection = styled.section``

export const PercentagesTitle = styled.h1`
  font-size: 26px;
  text-align: center;
`

export const InvestTypeTitle = styled.h6`
  font-size: 22px;
  margin: 0;
`

export const PercentagesFeedback = styled.h6`
  font-size: 18px;
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
  margin: 5px 0;
  display: flex;
  width: 60%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const PercentageDropdown = styled.select`
  list-style: none;
  padding: 5px 15px;
  margin: 5px 20px;
  font-size: 16px;
`

export const PercentageValue = styled.span`
  margin-left: 20px;
`

export const PercentageItemRemove = styled.span`
  margin-left: 20px;
  cursor: pointer;
`

export const PercentagesBtn = styled.button`
  padding: 5px 15px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
`

export const PercentageWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export const ChartComponent = styled.div`
  width: 30%;
`

export const Percentages = styled.div`
  width: 70%;
`

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export const SubmitButton = styled.button`
  width: 200px;
  height: 50px;
`

export const PercentageHeader = styled.div`
  display: flex;
  align-items: center;
`

export const PercentageSlider = styled.div`
  width: 100%;
  display: flex;
`

const green500 = '#228b22'
const green900 = '#7FFF00'

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
