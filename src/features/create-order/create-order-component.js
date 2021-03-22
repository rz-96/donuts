import { PayPalButtons } from '@paypal/react-paypal-js';
import { ErrorMessage } from 'components/form-input/form-input-component-styles';
import { FormInput } from 'components/form-input/form-input-container';
import { Label } from 'components/label/label-component-styles';
import { RadioButtonsContainer } from 'components/radio-buttons/radio-buttons-container';
import { PAYMENTS } from 'data/routes';
import React, { Fragment } from 'react';
import { request } from 'utils/fp';

function CreateOrderComponent({
  t,
  email,
  disabled,
  onChangeEmail,
  onFocusEmail,
  onBlurEmail,
  emailError,
  name,
  onChangeName,
  onFocusName,
  onBlurName,
  nameError,
  phone,
  onChangePhone,
  onFocusPhone,
  onBlurPhone,
  phoneError,
  comment,
  onChangeComment,
  onSubmit,
  setPaymentId,
  paymentType,
  onChangePaymentType,
  onApprove,
  orderTime,
  onChangeOrderTime,
  orderType,
  cartPrice,
  street,
  streetError,
  city,
  cityError,
  onChangeStreet,
  onChangeCity,
  onFocusStreet,
  onFocusCity,
  onBlurStreet,
  onBlurCity,
  isCartEmpty,
  isCreating,

  isMinValueReached, //TODO: add minValue again
}) {
  return (
    <Fragment>
      <FormInput
        className="dark:bg-black"
        data-test="email"
        onFocus={onFocusEmail}
        onBlur={onBlurEmail}
        errorMessage={emailError}
        value={email}
        onChange={onChangeEmail}
        label={t('contact-details:mail')}
      />
      <FormInput
        data-test="name"
        value={name}
        onChange={onChangeName}
        onFocus={onFocusName}
        onBlur={onBlurName}
        errorMessage={nameError}
        label="Name"
      />
      <FormInput
        data-test="phone"
        value={phone}
        errorMessage={phoneError}
        onFocus={onFocusPhone}
        onBlur={onBlurPhone}
        onChange={onChangePhone}
        label={t('contact-details:phone')}
      />
      <FormInput
        label={t('contact-details:delivery-time')}
        value={orderTime}
        onChange={onChangeOrderTime}
        variant="outlined"
        style={{ width: '100%' }}
        id="time"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          className: 'text-white',

          step: 300, // 5 min
        }}
      />
      {orderType === 'delivery' && (
        <>
          <FormInput
            value={street}
            onChange={onChangeStreet}
            onFocus={onFocusStreet}
            onBlur={onBlurStreet}
            errorMessage={streetError}
            data-test="street"
            label="Straße"
          />

          <FormInput
            value={city}
            onChange={onChangeCity}
            onFocus={onFocusCity}
            onBlur={onBlurCity}
            errorMessage={cityError}
            data-test="city"
            label="Stadt"
          />
        </>
      )}
      <FormInput
        data-test="comment"
        value={comment}
        onChange={onChangeComment}
        label={t('contact-details:comment')}
      />
      <div className="mt-1">
        <Label>Bezahlung</Label>
        <RadioButtonsContainer
          value={paymentType}
          options={[
            { value: 'paypal', label: 'PayPal' },
            { value: 'cash', label: t('common:payment-method') },
          ]}
          onChange={onChangePaymentType}
        />
      </div>
      {isCartEmpty && (
        <div className="flex-row">
          <ErrorMessage>{t('cart:cart-empty')}</ErrorMessage>
        </div>
      )}
      {!isMinValueReached && (
        <div>
          <ErrorMessage>{t('cart:cart-min-value-not-reached')}</ErrorMessage>
        </div>
      )}
      {paymentType === 'cash' && (
        <button className="btn" onClick={onSubmit} disabled={disabled}>
          {isCreating && (
            <svg
              className="animate-spin h-5 w-5 mr-3"
              style={{
                border: '0.25rem solid',
                borderTop: '0.25rem solid grey',
                borderRadius: '50%',
              }}
              viewBox="0 0 24 24"
            />
          )}
          {t('common:order-now')}
        </button>
      )}
      {paymentType === 'paypal' && (
        <PayPalButtons
          disabled={disabled}
          createOrder={async () => {
            const { _id, paymentId: id } = await request({
              method: 'POST',
              route: PAYMENTS,
              body: {
                amount: cartPrice,
                method: 'PAYPAL',
              },
            });
            setPaymentId(_id);
            return id;
          }}
          onApprove={onApprove}
        />
      )}
    </Fragment>
  );
}

export { CreateOrderComponent };
