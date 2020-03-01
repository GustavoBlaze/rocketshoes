import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';
import { Container, Logo, CartContainer, Counter } from './styles';

export default function Header() {
  return (
    <Container>
      <RectButton>
        <Logo />
      </RectButton>

      <CartContainer>
        <Icon name="shopping-cart" size={24} color="#FFF" />
        <Counter>3</Counter>
      </CartContainer>
    </Container>
  );
}
