import React from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, LogoButton, Logo, CartButton, Counter } from './styles';
import navigation from '../../services/navigation';

export default function Header() {
  const cartSize = useSelector(state => state.cart.length);
  return (
    <Container>
      <LogoButton onPress={() => navigation.navigate('Main')}>
        <Logo />
      </LogoButton>

      <CartButton onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-cart" size={24} color="#FFF" />
        <Counter>{cartSize}</Counter>
      </CartButton>
    </Container>
  );
}
