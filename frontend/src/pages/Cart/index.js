import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
  MdRemoveShoppingCart,
} from 'react-icons/md';

import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import {
  Container,
  ProductTable,
  EmptyCartContainer,
  Total,
  LoadingIcon,
} from './styles';

function Cart({ cart, total, removeFromCart, updateAmountRequest, updating }) {
  function increment(product) {
    updateAmountRequest(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmountRequest(product.id, product.amount - 1);
  }

  return (
    <Container>
      {cart.length ? (
        <ProductTable>
          <thead>
            <tr>
              <th />
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Subtotal</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cart.map(product => (
              <tr>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button type="button" onClick={() => decrement(product)}>
                      <MdRemoveCircleOutline size={20} color="#7159c1" />
                    </button>
                    <input type="number" readOnly value={product.amount} />
                    <button type="button" onClick={() => increment(product)}>
                      <MdAddCircleOutline size={20} color="#7159c1" />
                    </button>
                  </div>
                </td>
                <td>
                  {updating.id === product.id && updating.status ? (
                    <LoadingIcon color="#333" size={14} />
                  ) : (
                    <strong>{product.subtotal}</strong>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <MdDelete size={20} color="#7159c1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      ) : (
        <EmptyCartContainer>
          <MdRemoveShoppingCart color="#999" size={50} />
          <strong>Carrinho Vazio</strong>
        </EmptyCartContainer>
      )}

      <footer>
        <button type="button" disabled={!(cart.length > 0)}>
          Finalizar Pedido
        </button>

        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
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
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  total: PropTypes.string.isRequired,
  updating: PropTypes.objectOf(PropTypes.objectOf).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  updateAmountRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
