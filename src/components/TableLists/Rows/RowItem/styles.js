import styled from 'styled-components';

export const Row = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: grey;
    cursor: pointer;
    z-index: 1;
  }
`;

export const RowItem = styled.div`
  flex-basis: 20%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  ${props => {
    switch (props.status) {
      case 'good':
        return 'background-color: rgb(94, 194, 94);';
      case 'alert':
        return 'background-color: rgba(255, 255, 92, 0.742);';
      case 'bad':
        return 'background-color: rgb(167, 60, 60);';
    }
  }}
`;

export const RowItemPlus = styled.div`
  position: absolute;
  left: 0;
  padding: 0px 15px;
`;
