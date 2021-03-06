import { CartContainer } from 'features/cart/cart-container';
import { CreateOrderContainer } from 'features/create-order/create-order-container';
import { Pencil } from 'icons/pencil';
import React from 'react';

import { Item, ItemPrice, ItemTitle, Root } from './sidepanel-component-styles';

function SidePanelComponent({
  orderType,
  place,
  deliveryFee,
  onClickChangeOrderType,
  t,
}) {
  return (
    <Root className="dark:bg-black dark:text-white p-6">
      <p className="dark:text-white text-lg font-bold">
        {t('common:your-order')}
      </p>
      {deliveryFee && (
        <Item>
          <ItemTitle className="dark:text-white">
            {t('common:delivery-fee')}
          </ItemTitle>
          <ItemPrice className="dark:text-white">
            {deliveryFee.toFixed(2)}€
          </ItemPrice>
        </Item>
      )}
      <CartContainer />
      <button
        className="btn w-full flex justify-center items-center"
        onClick={onClickChangeOrderType}
      >
        <Pencil className="w-4 mr-2" />

        {orderType === 'delivery'
          ? t('common:deliver-to', { postcode: place.postcode })
          : t('common:pick-up')}
      </button>
      <CreateOrderContainer />
    </Root>
  );
}

export { SidePanelComponent };
