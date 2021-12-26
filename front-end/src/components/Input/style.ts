import styled, { css } from "styled-components";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;
  transition: border 0.4s;
  
  display: flex;
  align-items: center;

  ${props => props.isFocused && css`
    border: 2px solid #FF9000;
    color: #FF9000;
  ` }
  ${props => props.isFilled && css`
    color: #FF9000;
  ` }

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #F4EDE8;
  }
  svg{
    margin-right: 16px
  }
  
`;