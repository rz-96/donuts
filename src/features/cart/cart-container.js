import { connect } from 'react-redux';

import { CartComponent } from './cart-component';
import {
  getCartPrice,
  getProductsFromCart,
  removeFromCart,
} from './cart-reducer';

const mapStateToProps = state => ({
  cart: getProductsFromCart(state),
  totalPrice: getCartPrice(state),
});

export const CartContainer = connect(mapStateToProps, {
  onClickRemove: removeFromCart,
})(CartComponent);
