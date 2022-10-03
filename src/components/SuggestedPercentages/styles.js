import styled from 'styled-components';

export const ScoreView = styled.div`=
  background-color: green;
  width: 80%;
  margin: 0 auto;
  height: 60px;
  display: flex;
`;

export const Points = styled.div`
  background-color: ${props => props.color};
  height: 100%;
  width: 100%;
  z-index: 2;
`;

export const SuggestedPercentages = styled.section`
  height: 80vh;
  margin: 10% 0;
`;

export const BigTitle = styled.h1`
  margin: 15px 0;
  font-size: 26px;
  text-align: center;
  color: white;
`;

export const Title = styled.h1`
  margin: 15px 0;
  font-size: 18px;
  text-align: center;
  color: white;
`;

export const SuggestedListWrapper = styled.table`
  width: 50%;
  margin: 0 auto;
`;

export const SuggestedList = styled.td`
  display: flex;
  justify-content: space-between;
  color: white;
`;

export const SuggestedListItem = styled.tr`
  width: 50px;
`;