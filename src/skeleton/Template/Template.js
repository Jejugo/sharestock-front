import { useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar/Navbar';
import * as S from './styles';

function Template({ tabTitle, children }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);

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
        <S.Main className="main">{children}</S.Main>
      </S.Content>
    </section>
  );
}

export default Template;
