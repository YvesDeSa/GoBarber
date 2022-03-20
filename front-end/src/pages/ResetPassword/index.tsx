import React, { useCallback, useRef } from "react";
import { FiLogIn, FiLock } from 'react-icons/fi'
import { Link, useLocation, useNavigate } from "react-router-dom";

import logoImg from '../../assets/logo.svg'

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Content, AnimationContainer, Background } from "./style";

import getValidationErros from "../../utils/getValidationErrors";
import { FormHandles } from "@unform/core";

import * as Yup from 'yup';
import { Form } from "@unform/web";
import { useToast } from "../../hooks/toast";
import api from "../../services/api";

interface IResetPasswordDataForm {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (data: IResetPasswordDataForm) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        password: Yup.string().required('Senha é obrigatória'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { password, password_confirmation } = data;

      const token = location.search.replace('?token=', '');

      if (!token) {
        throw new Error()
      }

      await api.post('/password/reset', {
        password,
        password_confirmation,
        token
      });

      addToast({
        type: 'success',
        title: 'Senha resetada com sucesso',
        description: 'Você já pode fazer seu login'
      });

      navigate('/');

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);

        formRef.current?.setErrors(getValidationErros(error as Yup.ValidationError));

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Occoreu um erro ao resetar sua senha, tente novamente'
      });
    }
  }, [addToast, navigate, location.search]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} width={200} alt="Gobarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>

            <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />

            <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmação da senha" />

            <Button type="submit" >Alterar senha</Button>
          </Form>

          <Link to={"/"} >
            <FiLogIn />
            ir para o logon
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  )
};

export { ResetPassword };