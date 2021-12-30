import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Link } from "react-router-dom";

import logoImg from '../../assets/logo.svg'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import useAuth from "../../hooks/auth";
import { Container, Content, AnimationContainer, Background } from "./style";

import getValidationErros from "../../utils/getValidationErrors";
import { FormHandles } from "@unform/core";

import * as Yup from 'yup';
import { Form } from "@unform/web";
import { useToast } from "../../hooks/toast";

interface ISignDataForm {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ISignDataForm) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha é obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password
      });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);

        formRef.current?.setErrors(getValidationErros(error as Yup.ValidationError));

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na altenticação',
        description: 'Occoreu um erro ao fazer login, cheque as credenciais'
      });
    }
  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} width={200} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit" >Entrar</Button>

            <a href="forgot" >Esqueci minha senha</a>
          </Form>

          <Link to={"/signup"} >
            <FiLogIn />
            Criar Conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
};

export { SignIn };