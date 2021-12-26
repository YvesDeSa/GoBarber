import React from "react";
import { FiLogIn } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Container, Content, Background } from "./style";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} width={200} alt="Gobarber" />

        <form>
          <h1>Faça seu login</h1>

          <input placeholder="E-mail" />

          <input type="passwor" placeholder="Senha" />

          <button type="submit" >Entrar</button>

          <a href="forgot" >Esqueci minha senha</a>
        </form>

        <a href="wqwq" >
          <FiLogIn />
          Criar Conta
        </a>
      </Content>

      <Background />
    </Container>
  )
};

export { SignIn };