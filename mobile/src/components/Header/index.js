import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { Container, LogoButton, Logo, CartButton, Counter } from './styles';

function Header({ navigation, cartSize }) {
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

Header.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  cartSize: PropTypes.number.isRequired,
};

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
