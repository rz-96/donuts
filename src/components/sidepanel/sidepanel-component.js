import { CartContainer } from 'features/cart/cart-container';
import { CreateOrderContainer } from 'features/create-order/create-order-container';
import { Pencil } from 'icons/pencil';
import React from 'react';

import { Item, ItemPrice, ItemTitle, Root } from './sidepanel-component-styles';

function SidePanelComponent({ orderType, onClickChangeOrderType, t }) {
  return (
    <Root className="dark:bg-black dark:text-white p-6">
      <p className="dark:text-white text-lg font-bold">
        {t('common:your-order')}
      </p>
      <Item>
        <ItemTitle className="dark:text-white">
          {t('common:delivery-fee')}
        </ItemTitle>
        <ItemPrice className="dark:text-white">UPDATEN</ItemPrice>
      </Item>
      <CartContainer />
      <button
        className="btn w-full flex justify-center items-center"
        onClick={onClickChangeOrderType}
      >
        <Pencil className="w-4" />
        {orderType === 'delivery' ? 'Liefern' : 'Abholen'}
      </button>
      <CreateOrderContainer />
    </Root>
  );
}

export { SidePanelComponent };
