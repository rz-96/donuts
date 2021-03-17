import { getCartPrice, getIsCartEmpty } from 'features/cart/cart-reducer';
import {
  getIsCreating,
  getIsMinValueReached,
  getMinValue,
  getOrderType,
  getPaymentId,
  setPaymentId,
} from 'features/delivery/delivery-reducer';
import { withFormik } from 'formik';
import transformProps from 'hocs/transform-props';
import moment from 'moment';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { CreateOrderComponent } from './create-order-component';
import { capturePayPal, placeOrder } from './order-saga';
import { createOrder } from './validation-schema';
const formikProps = {
  validateOnMount: true,
  mapPropsToValues: ({ orderType }) => ({
    email: '',
    name: '',
    phone: '',
    comment: '',
    street: '',
    city: '',
    paymentType: 'cash',
    orderTime: moment().format('hh:mm'),
    orderType,
  }),
  enableReinitialize: true,
  validationSchema: createOrder,
  handleSubmit: (
    { email, name, phone, comment, street, city, paymentType, orderTime },
    { props: { placeOrder } },
  ) => {
    placeOrder({
      email,
      name,
      phone,
      comment,
      paymentType,
      orderTime,
      street,
      city,
    });
    // setPersonalDetails({ email, name, phone, comment });
    // if (orderType === 'delivery') {
    //   setIsAddressModalOpen(true);
    // }
  },
};

const mapFormikBagToProps = ({
  values: { email, name, phone, comment, paymentType, street, city, orderTime },
  isValid,
  errors,
  touched,
  setFieldValue,
  setFieldTouched,
  handleSubmit,
  capturePayPal,
  orderType,
  isCartEmpty,
  isCreating,
  minValue,
  isMinValueReached,
  ...rest
}) => ({
  disabled: !isValid || isCartEmpty,
  email,
  emailError: touched.email ? errors.email : '',
  name,
  nameError: touched.name ? errors.name : '',
  phone,
  phoneError: touched.phone ? errors.phone : '',
  comment,
  paymentType,
  orderType,
  street,
  streetError: touched.street ? errors.street : '',
  city,
  cityError: touched.city ? errors.city : '',
  orderTime,
  orderTimeError: touched.orderTime ? errors.orderTime : '',
  onChangeOrderTime: e => setFieldValue('orderTime', e.target.value),
  onChangeStreet: e => setFieldValue('street', e.target.value),
  onFocusStreet: () => setFieldTouched('street', false),
  onBlurStreet: () => setFieldTouched('street', true),
  onChangeCity: e => setFieldValue('city', e.target.value),
  onFocusCity: () => setFieldTouched('city', false),
  onBlurCity: () => setFieldTouched('city', true),
  onChangeEmail: e => setFieldValue('email', e.target.value),
  onFocusEmail: () => setFieldTouched('email', false),
  onBlurEmail: () => setFieldTouched('email', true),
  onChangeName: e => setFieldValue('name', e.target.value),
  onFocusName: () => setFieldTouched('name', false),
  onBlurName: () => setFieldTouched('name', true),
  onChangePhone: e => setFieldValue('phone', e.target.value),
  onFocusPhone: () => setFieldTouched('phone', false),
  onBlurPhone: () => setFieldTouched('phone', true),
  onChangeComment: e => setFieldValue('comment', e.target.value),
  onApprove: ({ orderID }) =>
    capturePayPal({
      orderId: orderID,
      email,
      name,
      phone,
      comment,
      paymentType,
      street,
      city,
      orderTime,
    }),
  onChangePaymentType: e => setFieldValue('paymentType', e.target.value),
  onSubmit: handleSubmit,
  isCartEmpty,
  isCreating,
  minValue,
  isMinValueReached,
  ...rest,
});

const mapStateToProps = state => ({
  orderType: getOrderType(state),
  paymentId: getPaymentId(state),
  cartPrice: getCartPrice(state),
  isCartEmpty: getIsCartEmpty(state),
  isCreating: getIsCreating(state),
  minValue: getMinValue(state),
  isMinValueReached: getIsMinValueReached(state),
});

export const CreateOrderContainer = compose(
  connect(mapStateToProps, {
    setPaymentId,
    capturePayPal,
    placeOrder,
  }),
  withFormik(formikProps),
  transformProps(mapFormikBagToProps),
)(CreateOrderComponent);
