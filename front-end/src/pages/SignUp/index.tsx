import React from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'

import logoImg from '../../assets/logo.svg'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Content, Background } from "./style";

const SignUp: React.FC = () => {
  return (
    <Container>

      <Background />

      <Content>
        <img src={logoImg} width={200} alt="Gobarber" />

        <form>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="e-mail" icon={FiMail} placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit" >Cadastrar</Button>

        </form>

        <a href="wqwq" >
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  )
};

export { SignUp };