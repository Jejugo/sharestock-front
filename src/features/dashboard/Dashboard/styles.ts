import styled from 'styled-components'

export const DashboardComponentWrapper = styled.section`
  width: 100%;
  margin: 10px 0;
`

export const PieDashboardWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 300px;
  max-height: 350px;

  @media (max-width: 1700px) {
    flex-direction: column;
  }
`

export const WalletAssets = styled.div`
  margin: 100px 0;
  width: 100%;
`

export const SliderItem = styled.div`
  width: 100%;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 500px 400px;
  gap: 20px;
`

export const GoalsPieChart = styled.div`
  grid-column: 1 / 2;
  grid-row: 1;
  border-radius: 15px;
  background-color: #222;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const SliderWrapper = styled.div`
  grid-column: 1 / 3;
  grid-row: 2;
  width: 100%;
  border-radius: 15px;
  background-color: #222;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const DataSummary = styled.div`
  grid-column: 2 / 3;
  grid-row: 1;
  border-radius: 15px;
  padding: 20px;
  background-color: #222;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
