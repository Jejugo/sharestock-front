import styled from 'styled-components'

export const Tab = styled.div<{ active: boolean }>`
  padding: 10px;
  cursor: pointer;
  color: ${({ active }) => (active ? '#FFF' : 'grey')};
  border-bottom: ${({ active }) => (active ? '2px solid #FFBB28' : 'none')};
  transition: 0.2s ease;
  cursor: pointer;

  ${({ active }) => active && 'font-size: 26px'};
`
