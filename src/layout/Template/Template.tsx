import React, { useState, ReactNode } from 'react'
import Head from 'next/head'
import Navbar from '@components/Navbar/Navbar'
import * as S from './styles'

interface TemplateProps {
  tabTitle: string
  children: ReactNode
}

function Template({ tabTitle, children }: TemplateProps) {
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(true)

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
          <S.Container>{children}</S.Container>
        </S.Main>
      </S.Content>
    </section>
  )
}

export default Template
