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
  overflow-y: scroll;

  @media (max-width: 1700px) {
    flex-direction: column;
  }
`

export const WalletAssets = styled.div`
  width: 100%;
`

export const SliderItem = styled.div`
  width: 100%;
`

export const BarChartComponents = styled.div`
  width: 100%;
  display: flex;
  height: 300px;
`
