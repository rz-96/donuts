import compose from 'ramda/src/compose';
import { connect } from 'react-redux';

import { withTranslation } from '../../../i18n';
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

export const CartContainer = compose(
  connect(mapStateToProps, {
    onClickRemove: removeFromCart,
  }),
  withTranslation(),
)(CartComponent);
