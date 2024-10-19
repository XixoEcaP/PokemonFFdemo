import styled, { css } from 'styled-components';

const Sprite = styled.div`
  width: 32px;
  height: 48px;
  position: absolute;
  transition: left 0.3s, top 0.3s;

  ${({ $sprite, $frame, $direction }) => css`
    background-image: url(${$sprite});
    background-position: -${$frame * 32}px -${$direction * 48}px;
  `}
`;

export default Sprite;
