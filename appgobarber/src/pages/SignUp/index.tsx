import React from "react";
import { Image, ScrollView, KeyboardAvoidingView, Platform, View } from "react-native";

import Icon from "react-native-vector-icons/Feather";

import logoImg from "../../assets/logo.png";
import Button from "../../components/Button";
import Input from "../../components/Input";

import { Container, Title, BackToSignIn, BackToSignInText } from "./style";

const SignUp: React.FC = () => {
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

            <Input name="name" icon="user" placeholder="Nome" />
            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Senha" />

            <Button onPress={() => { }} >Entrar</Button>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>
          Voltar para logon
        </BackToSignInText>
      </BackToSignIn>
    </>
  );
}

export default SignUp;