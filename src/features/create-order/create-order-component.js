import {
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { ErrorMessage } from 'components/form-input/form-input-component-styles';
import { FormInput } from 'components/form-input/form-input-container';
import { Label } from 'components/label/label-component-styles';
import { PAYMENTS } from 'data/routes';
import React, { Fragment } from 'react';
import { request } from 'utils/fp';

import { StyledButton } from './create-order-styles';

function CreateOrderComponent({
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
  minValue,
  isMinValueReached,
}) {
  return (
    <Fragment>
      <FormInput
        data-test="email"
        onFocus={onFocusEmail}
        onBlur={onBlurEmail}
        errorMessage={emailError}
        value={email}
        onChange={onChangeEmail}
        label="E-Mail"
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
        label="Telefon"
      />
      <Label>Lieferzeitpunkt</Label>
      <TextField
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
        label="Kommentar"
      />
      <div style={{ marginTop: 2 }}>
        <Label>Bezahlung</Label>
        <RadioGroup
          value={paymentType}
          onChange={onChangePaymentType}
          aria-label="gender"
          name="gender1"
        >
          <FormControlLabel
            value="cash"
            control={<Radio />}
            label="Barzahlung"
          />
          <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
        </RadioGroup>
      </div>
      {isCartEmpty && (
        <div className="flex-row">
          <ErrorMessage>Sie haben keine Produkte im Warenkorb.</ErrorMessage>
        </div>
      )}
      {!isMinValueReached && (
        <div>
          <ErrorMessage>
            Sie haben noch nicht den Mindestbestellwert von{' '}
            {minValue.toFixed(2)}€ erreicht.
          </ErrorMessage>
        </div>
      )}
      {paymentType === 'cash' && (
        <StyledButton
          onClick={onSubmit}
          disabled={disabled}
          variant="contained"
          color="primary"
        >
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
          Jetzt bestellen
        </StyledButton>
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
