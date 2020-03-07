import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import { ToastAndroid } from 'react-native';
import api from '../../../services/api';
import navigation from '../../../services/navigation';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';
import { updatingItem } from '../updating/actions';

function* addToCart({ id }) {
  yield put(updatingItem(id, true));
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    // console.tron.warn('ERROR');
    ToastAndroid.show(
      'Quantidade solicitada fora de estoque',
      ToastAndroid.SHORT
    );
    yield put(updatingItem(id, false));
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
    yield put(updatingItem(id, false));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
    navigation.navigate('Cart');
  }
  yield put(updatingItem(id, false));
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;
  yield put(updatingItem(id, true));

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    ToastAndroid.show(
      'Quantidade solicitada fora de estoque',
      ToastAndroid.SHORT
    );
    yield put(updatingItem(id, false));
    return;
  }

  yield put(updateAmountSuccess(id, amount));
  yield put(updatingItem(id, false));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
