import styled from 'styled-components'

export const DashboardComponentWrapper = styled.section`
  width: 80%;
  margin: 0 auto;
`

export const DashboardWrapper = styled.section`
  margin-bottom: 5%;
  width: 70vw;
  display: grid;
  grid-template-columns: 1fr;

  @media (width > 1800px) {
    grid-template-columns: 1fr 1fr;
  }
`

export const PieChartWrapper = styled.div``

export const WalletAssets = styled.div`
  width: 100%;
`
