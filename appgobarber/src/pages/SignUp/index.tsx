import React, { useCallback, useRef } from "react";
import { Image, ScrollView, KeyboardAvoidingView, Platform, View, TextInput, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";

import Icon from "react-native-vector-icons/Feather";

import logoImg from "../../assets/logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { Container, Title, BackToSignIn, BackToSignInText } from "./style";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";

import getValidationErros from "../../utils/getValidationErrors";

interface ISignDataForm {
  email: string;
  password: string;
};

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: ISignDataForm) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório').email('Digite um nome válido'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(3, 'Senha deve ter 3 digitos')
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

      Alert.alert('Erro no cadastro', 'Occoreu um erro ao fazer o cadastro, cheque as credenciais');

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
              <Title>Crie sua conta</Title>
            </View>
            <Form style={{ width: 400 }} ref={formRef} onSubmit={handleSignUp}>

              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
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
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()} >Entrar</Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()} >
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>
          Voltar para logon
        </BackToSignInText>
      </BackToSignIn>
    </>
  );
}

export default SignUp;