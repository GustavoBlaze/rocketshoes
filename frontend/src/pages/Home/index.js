import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';
import { formatPrice } from '../../util/format';
import { ProductList, LoadingIcon, Container } from './styles';
import * as CartActions from '../../store/modules/cart/actions';

function Home({ amount, addToCartRequest, updating }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const response = await api.get('/products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    addToCartRequest(id);
  }

  if (loading) {
    return (
      <Container>
        <strong>Carregando</strong>
        <LoadingIcon size={22} color="#FFF" />
      </Container>
    );
  }

  return (
    <ProductList length={products.length}>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />

          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              {updating.id === product.id && updating.status ? (
                <LoadingIcon size={16} color="#FFF" />
              ) : (
                <MdAddShoppingCart size={16} color="#FFF" />
              )}

              {amount[product.id] || 0}
            </div>

            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;

    return amount;
  }, {}),

  updating: state.updating,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

Home.propTypes = {
  addToCartRequest: PropTypes.func.isRequired,
  amount: PropTypes.objectOf(PropTypes.object).isRequired,
  updating: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.bool,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
