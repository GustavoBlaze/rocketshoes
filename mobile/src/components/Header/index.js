import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { RectButton } from 'react-native-gesture-handler';
import { Container, Logo, CartButton, Counter } from './styles';

function Header({ navigation }) {
  return (
    <Container>
      <RectButton onPress={() => navigation.navigate('Main')}>
        <Logo />
      </RectButton>

      <CartButton onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-cart" size={24} color="#FFF" />
        <Counter>3</Counter>
      </CartButton>
    </Container>
  );
}

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Header;
