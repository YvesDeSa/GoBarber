import React, { useCallback } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Form } from "@unform/web";

import logoImg from '../../assets/logo.svg'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Content, Background } from "./style";
import * as Yup from 'yup';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(3, 'No mínimo 3 dígitos')
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      console.log({ error });
    }
  }, []);

  return (
    <Container>

      <Background />

      <Content>
        <img src={logoImg} width={200} alt="Gobarber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit" >Cadastrar</Button>

        </Form>

        <a href="wqwq" >
          <FiArrowLeft />
          Voltar para logon
        </a>
      </Content>
    </Container>
  )
};

export { SignUp };