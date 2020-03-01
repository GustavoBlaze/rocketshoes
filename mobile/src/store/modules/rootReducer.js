import { combineReducers } from 'redux';
import cart from './cart/reducer';
import updating from './updating/reducer';

export default combineReducers({
  cart,
  updating,
});
