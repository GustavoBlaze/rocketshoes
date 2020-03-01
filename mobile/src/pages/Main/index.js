import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
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

export default class Main extends Component {
  state = {
    products: [
      {
        id: 1,
        title: 'Tênis de Caminhada Leve Confortável',
        price: 179.9,
        image:
          'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
      },
      {
        id: 2,
        title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
        price: 139.9,
        image:
          'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
      },
      {
        id: 3,
        title: 'Tênis Adidas Duramo Lite 2.0',
        price: 219.9,
        image:
          'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
      },
      {
        id: 4,
        title: 'Tênis de Caminhada Leve Confortável',
        price: 179.9,
        image:
          'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
      },
      {
        id: 5,
        title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino',
        price: 139.9,
        image:
          'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
      },
      {
        id: 6,
        title: 'Tênis Adidas Duramo Lite 2.0',
        price: 219.9,
        image:
          'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis3.jpg',
      },
    ],
  };

  componentDidMount() {
    const { products } = this.state;
    this.setState({
      products: products.map(item => {
        item.price = formatPrice(item.price).replace(/^(\D+)/, '$1 ');
        return item;
      }),
    });
  }

  render() {
    const { products } = this.state;
    return (
      <Container>
        <PageName>Produtos</PageName>
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
