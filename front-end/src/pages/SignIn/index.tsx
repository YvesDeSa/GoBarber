import React from "react";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Content, Background } from "./style";

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logoImg} width={200} alt="Gobarber" />

        <form>
          <h1>Faça seu login</h1>

          <Input name="e-mail" icon={FiMail} placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit" >Entrar</Button>

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