import styled from 'styled-components';

export const RowHeader = styled.div`
  flex-basis: 20%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.fixTableHeader &&
    `
    width: inheit;
    position: sticky;
    top: 0;
    background-color: grey;
    opacity: 0.8;
    z-index: 2;
  `}
`;

export const FirstRow = styled.div`
  flex-basis: 20%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
`;
