import React, { useCallback, useRef } from "react";
import { Image, ScrollView, KeyboardAvoidingView, Platform, TextInput, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import Icon from "react-native-vector-icons/Feather";

import logoImg from "../../assets/logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from "./style";

import getValidationErros from "../../utils/getValidationErrors";

interface ISignDataForm {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback(async (data: ISignDataForm) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail é obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha é obrigatória')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await signIn({
      //   email: data.email,
      //   password: data.password
      // });

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        console.log(error);

        formRef.current?.setErrors(getValidationErros(error as Yup.ValidationError));

        return;
      }

      Alert.alert('Erro na altenticação', 'Occoreu um erro ao fazer login, cheque as credenciais');

    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />

            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form style={{ width: 400 }} ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email" icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountButtonText>
          Criar uma conta
        </CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn;