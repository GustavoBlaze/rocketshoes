import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PageName } from '../../styles/global';

import {
  Container,
  Card,
  EmptyCartCard,
  EmptyCartText,
  ProductList,
  Product,
  ProductPreview,
  ProductImage,
  ProductInformation,
  ProductName,
  ProductPrice,
  SubtotalContainer,
  AmountContainer,
  QuantityButton,
  Input,
  SubtotalText,
  DeleteButton,
  TotalContainer,
  TotalHint,
  TotalText,
  Button,
  ButtonText,
} from './styles';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

function Cart({ cart, total, removeFromCart, updateAmountRequest, updating }) {
  const increment = product => {
    updateAmountRequest(product.id, product.amount + 1);
  };

  const decrement = product => {
    updateAmountRequest(product.id, product.amount - 1);
  };

  if (cart.length === 0) {
    return (
      <Container>
        <PageName>Carrinho</PageName>
        <EmptyCartCard>
          <Icon color="#cacaca" name="remove-shopping-cart" size={50} />
          <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
        </EmptyCartCard>
      </Container>
    );
  }
  return (
    <Container>
      <PageName>Carrinho</PageName>
      <Card>
        <ProductList
          data={cart}
          keyExtractor={item => String(item.id)}
          renderItem={({ item: product }) => (
            <Product>
              <ProductPreview>
                <ProductImage source={{ uri: product.image }} />
                <ProductInformation>
                  <ProductName>{product.title}</ProductName>
                  <ProductPrice>{product.priceFormatted}</ProductPrice>
                </ProductInformation>
                <DeleteButton onPress={() => removeFromCart(product.id)}>
                  <Icon color="#7159c1" size={25} name="delete-forever" />
                </DeleteButton>
              </ProductPreview>
              <SubtotalContainer>
                <AmountContainer>
                  <QuantityButton onPress={() => decrement(product)}>
                    <Icon
                      color="#7159c1"
                      size={20}
                      name="remove-circle-outline"
                    />
                  </QuantityButton>
                  <Input value={String(product.amount)} />
                  <QuantityButton onPress={() => increment(product)}>
                    <Icon color="#7159c1" size={20} name="add-circle-outline" />
                  </QuantityButton>
                </AmountContainer>

                {updating.id === product.id && updating.status ? (
                  <ActivityIndicator color="#fff" size={20} />
                ) : (
                  <SubtotalText>{product.subtotal}</SubtotalText>
                )}
              </SubtotalContainer>
            </Product>
          )}
        />
        <TotalContainer>
          <TotalHint>Total</TotalHint>
          <TotalText>{total}</TotalText>
        </TotalContainer>
        <Button>
          <ButtonText>finalizar pedido</ButtonText>
        </Button>
      </Card>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce((total, product) => {
      return total + product.price * product.amount;
    }, 0)
  ),
  updating: state.updating,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  total: PropTypes.string.isRequired,
  updating: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
