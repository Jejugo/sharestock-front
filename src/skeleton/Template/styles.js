import styled from 'styled-components';

export const Content = styled.section`
  margin-left: ${props => (props.isNavbarOpen ? '300px' : '100px')};
  transition: 0.5s ease;
`;

export const Main = styled.main`
  width: auto;
  margin: 0 auto 0 auto;
  height: 100vh;
`;
