import styled from "styled-components";
import { shade } from 'polished';

import SignUpBackground from '../../assets/sign-up-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a{
      color: #F4EDE8;
      display: block;
      text-decoration: none;
      margin-top: 24px;
      transition: color 0.2s;
      
      &:hover {
        color: ${shade(0.4, '#F4EDE8')};
      }
    }
  }

  > a {
    color: #F4EDE8;
    display: block;
    text-decoration: none;
    margin-top: 24px;
    transition: color 0.2s;

    display: flex;
    align-items: center;
      
    &:hover {
      color: ${shade(0.4, '#F4EDE8')};
    }

    svg{
      margin: 2px 14px 0 0;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignUpBackground}) no-repeat center;
  background-size: cover;
`; 