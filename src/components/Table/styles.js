import styled from 'styled-components';

export const TableHeaderIcons = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
`;

export const TableHeaderIcon = styled.li`
  flex-basis: 30%;
  margin-bottom: 2%;
  margin-right: 50px;
  font-size: 20px;
  ${props => props.clickable && 'cursor: pointer;'}
`;

export const Highlight = styled.span`
  display: inline-block;
  margin-bottom: 8px;
  padding: 4px 8px;
  color: white;
  font-size: 16px;
  line-height: 1;
  font-weight: 700;
  background-color: green;
  border-radius: 15px;
  width: 150px;
  vertical-align: center;
  text-align: center;
`;

export const TableHeaderIconsRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;