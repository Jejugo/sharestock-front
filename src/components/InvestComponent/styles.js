import styled from 'styled-components';

export const InvestComponent = styled.section`
  width: 70%;
  padding: 50px;
  margin: 0 auto;
`;

export const InvestComponentLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
`;

export const StockListAdd = styled.div`
  flex-basis: 50%;
`;

export const StockListQuantityInput = styled.input`
  display: block;
  padding: 10px;
  margin: 10px 0px;
  width: 280px;
  border: none;
  border-radius: 2px;
`;

export const DropdownStyle = styled.div`
  color: black;
  width: 300px;
`;

export const InputWrapper = styled.div`
  width: 100%;
`;

export const StockCheckAddBtn = styled.button`
  width: 200px;
  padding: 20px 0px;
  background-color: #ffcd00;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &:nth-of-type(2) {
    margin-left: 20px;
  }
  &:nth-of-type(3) {
    margin-left: 20px;
  }
`;

export const StockCheckBtnWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  position: sticky;
  bottom: 0;
`;

export const ScoreView = styled.div`
  height: 50px;
  background-color: red;
  width: 100%;
  display: flex;
  border-radius: 5px;
  margin: 50px 0px;
`;

export const Points = styled.div`
  background-color: ${props => props.color};
  height: 100%;
  width: 100%;
  padding: 10px 0px;

  &:nth-child(1) {
    border-radius: 2px 0px 0px 2px;
  }

  &:nth-child(3) {
    border-radius: 0px 2px 2px 0px;
  }
`;

export const PointsText = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  margin: 0;
`;
