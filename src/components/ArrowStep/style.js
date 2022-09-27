import styled from 'styled-components';

export const ArrowWrapper = styled.div`
  position: absolute;
  top: 15vh;
  width: 100%;
`;

export const Arrow = styled.div`
  font-size: 50px;
`;

export const ArrowPrev = styled.div`
  padding: 30vh 20px;
  position: absolute;
  cursor: pointer;
  left: 0;

  &:hover {
    background-color: #222;
    background-image: radial-gradient(ellipse at right, #222, transparent),
      radial-gradient(ellipse at left, #000, transparent);
  }
`;

export const ArrowNext = styled.div`
  position: absolute;
  cursor: pointer;
  right: 0;
  padding: 30vh 20px;
  &:hover {
    background-color: #222;
    background-image: radial-gradient(ellipse at left, #222, transparent),
      radial-gradient(ellipse at right, #000, transparent);
  }
`;
