import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Link } from "react-router-dom";

import logoImg from '../../assets/logo.svg'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from "./style";

import getValidationErros from "../../utils/getValidationErrors";
import { FormHandles } from "@unform/core";

import * as Yup from 'yup';
import { Form } from "@unform/web";
import { useToast } from "../../hooks/toast";

interface IForgotPasswordDataForm {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: IForgotPasswordDataForm) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // recuperação de senha

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);

        formRef.current?.setErrors(getValidationErros(error as Yup.ValidationError));

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description: 'Occoreu um erro ao tentar realizar a recuperação de senha, tente novamente.'
      });
    }
  }, [addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} width={200} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button type="submit" >Recuperar</Button>

          </Form>

          <Link to={"/"} >
            <FiLogIn />
            Voltar ao Login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
};

export { ForgotPassword };