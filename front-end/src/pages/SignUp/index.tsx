import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Link } from "react-router-dom";

import logoImg from '../../assets/logo.svg'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Container, Content, AnimationContainer, Background } from "./style";
import getValidationErros from "../../utils/getValidationErrors";
import * as Yup from 'yup';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(3, 'No mínimo 3 dígitos')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

    } catch (error) {
      console.log(error);

      formRef.current?.setErrors(getValidationErros(error as Yup.ValidationError));
    }
  }, []);

  return (
    <Container>

      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} width={200} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />

            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

            <Button type="submit" >Cadastrar</Button>

          </Form>

          <Link to={"/"} >
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
};

export { SignUp };