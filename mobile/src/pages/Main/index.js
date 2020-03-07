import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

class Main extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const { data: products } = await api.get('/products');

    this.setState({
      products: products.map(item => {
        item.priceFormatted = formatPrice(item.price).replace(/^(\D+)/, '$1 ');
        return item;
      }),
    });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount, updating } = this.props;

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

                  <Button onPress={() => this.handleAddProduct(product.id)}>
                    <ButtonIconContainer>
                      {updating.id === product.id && updating.status ? (
                        <ActivityIndicator size={17} color="#fff" />
                      ) : (
                        <>
                          <Icon
                            name="add-shopping-cart"
                            size={16}
                            color="#FFF"
                          />
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
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount = {}, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),

  updating: state.updating,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

Main.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
  amount: PropTypes.object.isRequired,
  updating: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
