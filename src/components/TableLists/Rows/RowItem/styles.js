import styled from 'styled-components';

export const Row = styled.div`
  display: flex;

  &:hover {
    background-color: grey;
    cursor: pointer;
    z-index: 2;
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
