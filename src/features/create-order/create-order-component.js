import { PayPalButtons } from '@paypal/react-paypal-js';
import { ErrorMessage } from 'components/form-input/form-input-component-styles';
import { FormInput } from 'components/form-input/form-input-container';
import { Label } from 'components/label/label-component-styles';
import { RadioButtonsContainer } from 'components/radio-buttons/radio-buttons-container';
import { PAYMENTS } from 'data/routes';
import React, { Fragment } from 'react';
import { request } from 'utils/fp';

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
        className="dark:bg-black"
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
      <FormInput
        label="Lieferzeitpunkt"
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
        label="Kommentar"
      />
      <div className="mt-1">
        <Label>Bezahlung</Label>

        <RadioButtonsContainer
          value={paymentType}
          options={[
            { value: 'paypal', label: 'PayPal' },
            { value: 'cash', label: 'Barzahlung' },
          ]}
          onChange={onChangePaymentType}
        />
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
        <button
          onClick={onSubmit}
          disabled={disabled}
          className="disabled:cursor-not-allowed disabled:opacity-50 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500  sm:w-auto sm:text-sm"
          variant="contained"
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
