import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Loading,
  Container,
  PageName,
  ProductList,
  ProductContainer,
  Product,
  Favorite,
  ProductImage,
  ProductInformations,
  ProductName,
  ProductPrice,
  Button,
  ButtonText,
  ButtonIconContainer,
  ProductCount,
} from './styles';

import { formatPrice } from '../../util/format';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const { data: products } = await api.get('/products');

    this.setState({
      products: products.map(item => {
        item.price = formatPrice(item.price).replace(/^(\D+)/, '$1 ');
        return item;
      }),
    });
  }

  render() {
    const { products } = this.state;

    if (products.length === 0) {
      return <Loading />;
    }

    return (
      <Container>
        <PageName>Tênis</PageName>
        <ProductList
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ProductContainer>
              <Product>
                <Favorite isFavorite />
                <ProductImage source={{ uri: item.image }} />
                <ProductInformations>
                  <ProductName>{item.title}</ProductName>
                  <ProductPrice>{item.price}</ProductPrice>

                  <Button>
                    <ButtonIconContainer>
                      <Icon name="add-shopping-cart" size={16} color="#FFF" />
                      <ProductCount>0</ProductCount>
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
}
