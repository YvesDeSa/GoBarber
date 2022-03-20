import React from "react";

import { Container, Header, HeaderContainer, Profile } from "./style";

import logoImg from '../../assets/logo.svg';
import { FiPower } from "react-icons/fi";
import useAuth from "../../hooks/auth";

export const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem vindo</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContainer>
      </Header>


    </Container>
  );
}