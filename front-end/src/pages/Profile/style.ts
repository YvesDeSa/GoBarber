import styled from "styled-components";
import { shade } from 'polished';

export const Container = styled.div`
  header{
    height: 144px;
    background: #28262e;

    display:flex;
    align-items: center;

    div{
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg{
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  margin: -175px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display:flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
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

    input[name='old_password']{
      margin-top: 20px;
    }
  }
`;


export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 186px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label{ 
    position:absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color: 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg{
      width:20px;
      height:20px;
      color: #312e38;
    }

    &:hover{
      background: ${shade(0.2, '#ff9000')}
    }
  }

`;
