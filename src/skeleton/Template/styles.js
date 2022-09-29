import styled from 'styled-components';

export const Content = styled.section`
  margin-left: ${props => (props.isNavbarOpen ? '220px' : '100px')};
  width: 85%;
  transition: 0.5s ease;
`;

export const Main = styled.main`
  width: auto;
  margin: 0 auto 0 auto;
  height: 100vh;
`;
