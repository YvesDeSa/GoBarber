import styled from "styled-components";
import { shade, tint } from 'polished';

import SignInBackground from '../../assets/sign-in-background.png';

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

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;
      color: #F4EDE8;
      transition: background-color 0.4s;
      transition: border 0.4s;

      & + input {
        margin-top: 8px;
      }

      &:focus {
        background: ${tint(0.1, '#232129')};
        border: 2px solid ${tint(0.1, '#232129')};
      }
    }

    button{
      background: #FF9000;
      border-radius: 10px;
      height: 56px;
      border: 0;
      padding: 16px;
      width: 100%;
      font-weight: 500;
      color: #312e38;
      margin-top: 16px;
      transition: background-color 0.2s;

      &:hover{
        background: ${shade(0.2, '#FF9000')};
      }
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
    color: #FF9000;
    display: block;
    text-decoration: none;
    margin-top: 24px;
    transition: color 0.2s;

    display: flex;
    align-items: center;
      
    &:hover {
      color: ${shade(0.4, '#FF9000')};
    }

    svg{
      margin: 1px 14px 0 0;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${SignInBackground}) no-repeat center;
  background-size: cover;
`; 