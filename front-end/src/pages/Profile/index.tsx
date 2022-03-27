import React, { ChangeEvent, useCallback, useEffect, useRef } from "react";
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { Link, useNavigate } from "react-router-dom";

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Content, AvatarInput } from "./style";

import api from "../../services/api";
import { useToast } from "../../hooks/toast";

import getValidationErros from "../../utils/getValidationErrors";
import * as Yup from 'yup';
import useAuth from "../../hooks/auth";

interface IProfileFormData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const navigate = useNavigate();

  const { user, updateUser } = useAuth();

  useEffect(() => {
    formRef.current?.setData({
      name: user.name,
      email: user.email
    });
  }, [user.email, user.name]);

  const handleSubmit = useCallback(async (data: IProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),

        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val: string | any[]) => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string()
        }),
        password_confirmation: Yup.string().when('old_password', {
          is: (val: string | any[]) => !!val.length,
          then: Yup.string().required('Campo obrigatório'),
          otherwise: Yup.string()
        }).oneOf([Yup.ref('password'), null], 'Confirmação incorreta')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        name,
        email,
        old_password,
        password,
        password_confirmation
      } = data;

      const formData = Object.assign({
        name,
        email
      }, old_password ? {
        old_password,
        password,
        password_confirmation
      } : {});

      const response = await api.put("/profile", formData);

      updateUser(response.data);

      addToast({
        type: "success",
        title: "Perfil atualizado",
        description:
          "Suas informações do perfil foram atualizados com sucesso",
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
        title: 'Erro na atualização',
        description: 'Occoreu um erro ao atualizar perfil, tente novamente'
      });
    }
  }, [addToast, navigate]);

  const handleAvatarChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {

    if (event.target.files) {
      const data = new FormData();

      data.append('avatar', event.target.files[0]);

      api.patch('/users/avatar', data).then((response) => {
        updateUser(response.data);

        addToast({
          type: 'success',
          title: 'Avatar atualizado!'
        })
      });
    }
  }, [addToast, updateUser]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form ref={formRef}
          onSubmit={handleSubmit}>

          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />

              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>

          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" icon={FiUser} placeholder="Nome" />

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input containerStyle={{ marginTop: 24 }} name="old_password" icon={FiLock} type="password" placeholder="Senha atual" />

          <Input name="password" icon={FiLock} type="password" placeholder="Nova senha" />

          <Input name="password_confirmation" icon={FiLock} type="password" placeholder="Confirmar senha" />

          <Button type="submit">Confirmar mudanças</Button>

        </Form>
      </Content>
    </Container>
  )
};

export { Profile };