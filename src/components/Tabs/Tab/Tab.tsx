import React from 'react'
import * as S from './Tab.style'

// Define the type for the TabProps
interface TabProps {
  name: string
  activeTab: string
  onClick: () => void
}

// Create a Tab component
const Tab: React.FC<TabProps> = ({ name, activeTab, onClick }) => {
  return (
    <S.Tab active={activeTab === name} onClick={onClick}>
      {name}
    </S.Tab>
  )
}

export default Tab
