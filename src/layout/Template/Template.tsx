import React, { useState, ReactNode } from 'react'
import Head from 'next/head'
import Navbar from '@components/Navbar/Navbar'
import * as S from './styles'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Title from '@components/Title/Title'
import Flex from '@components/container/Flex/Flex'
import { useUserDataContext } from '@context/UserDataContext'
import useChartData from '../../hooks/useChartData'

interface TemplateProps {
  tabTitle: string
  children: ReactNode
}

function Template({ tabTitle, children }: TemplateProps) {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(true)
  const { userData, setShowMoneyInvested } = useUserDataContext()
  const { totalValue } = useChartData()

  return (
    <section>
      <Navbar
        isNavbarOpen={isNavbarOpen}
        setIsNavbarOpen={setIsNavbarOpen}
      ></Navbar>
      <S.Content isNavbarOpen={isNavbarOpen}>
        <Head>
          <title>{tabTitle}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <S.Main className="main">
          <S.Container>
            {!['objetivos', 'estratégia', 'all-shares', 'all-reits'].includes(
              tabTitle
            ) && (
              <Flex justifyContent="space-between">
                <Title text="Olá, Jeff" />
                <Flex justifyContent="space-between" alignItems="center">
                  {userData.showMoneyInvested ? (
                    <VisibilityOffIcon
                      sx={{
                        marginRight: 2,
                        cursor: 'pointer'
                      }}
                      onClick={() => setShowMoneyInvested(false)}
                    />
                  ) : (
                    <VisibilityIcon
                      sx={{
                        marginRight: 2,
                        cursor: 'pointer'
                      }}
                      onClick={() => setShowMoneyInvested(true)}
                    />
                  )}

                  <Title
                    text={
                      userData.showMoneyInvested
                        ? totalValue.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                          })
                        : `R$ 0,00`
                    }
                    color="#82ca9d"
                  />
                </Flex>
              </Flex>
            )}
            <div>{children}</div>
          </S.Container>
        </S.Main>
      </S.Content>
    </section>
  )
}

export default Template
