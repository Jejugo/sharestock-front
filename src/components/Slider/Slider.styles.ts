import styled from 'styled-components'

export const SliderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const Arrow = styled.button`
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  font-size: 2rem;
  opacity: 0.5;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`

export const Slide = styled.div`
  transition: opacity 0.3s ease;
  width: 100%;
`
