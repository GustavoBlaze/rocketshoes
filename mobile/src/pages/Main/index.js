import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Loading,
  Container,
  ProductList,
  ProductContainer,
  Product,
  ProductImage,
  ProductInformations,
  ProductName,
  ProductPrice,
  Button,
  ButtonText,
  ButtonIconContainer,
  ProductCount,
} from './styles';

import { PageName } from '../../styles/global';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

export default function Main() {
  const [products, setProducts] = useState([]);

  const amount = useSelector(state =>
    state.cart.reduce((cartAmount = {}, product) => {
      cartAmount[product.id] = product.amount;

      return cartAmount;
    }, {})
  );

  const updating = useSelector(state => state.updating);

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');
      setProducts(
        data.map(item => {
          item.priceFormatted = formatPrice(item.price).replace(
            /^(\D+)/,
            '$1 '
          );
          return item;
        })
      );
    }

    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  if (products.length === 0) {
    return <Loading />;
  }

  return (
    <Container>
      <PageName>Tênis &gt; Masculino</PageName>
      <ProductList
        data={products}
        keyExtractor={product => String(product.id)}
        renderItem={({ item: product }) => (
          <ProductContainer>
            <Product>
              <ProductImage source={{ uri: product.image }} />
              <ProductInformations>
                <ProductName>{product.title}</ProductName>
                <ProductPrice>{product.priceFormatted}</ProductPrice>

                <Button onPress={() => handleAddProduct(product.id)}>
                  <ButtonIconContainer>
                    {updating.id === product.id && updating.status ? (
                      <ActivityIndicator size={17} color="#fff" />
                    ) : (
                      <>
                        <Icon name="add-shopping-cart" size={16} color="#FFF" />
                        <ProductCount>{amount[product.id] || 0}</ProductCount>
                      </>
                    )}
                  </ButtonIconContainer>
                  <ButtonText>Adicionar</ButtonText>
                </Button>
              </ProductInformations>
            </Product>
          </ProductContainer>
        )}
      />
    </Container>
  );
}
