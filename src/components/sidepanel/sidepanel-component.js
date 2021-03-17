import { Button } from '@material-ui/core';
import { EditOutlined } from '@material-ui/icons';
import { CartContainer } from 'features/cart/cart-container';
import { CreateOrderContainer } from 'features/create-order/create-order-container';
import React from 'react';

import {
  Item,
  ItemPrice,
  ItemTitle,
  Root,
  Title,
} from './sidepanel-component-styles';

function SidePanelComponent({ orderType, onClickChangeOrderType, t }) {
  return (
    <Root>
      <Title>{t('common:your-order')}</Title>
      <Item>
        <ItemTitle>{t('common:delivery-fee')}</ItemTitle>
        <ItemPrice>UPDATEN</ItemPrice>
      </Item>
      <CartContainer />
      <Button
        onClick={onClickChangeOrderType}
        startIcon={<EditOutlined />}
        variant="contained"
        color="primary"
        style={{ width: '100%' }}
      >
        {orderType === 'delivery' ? 'Liefern' : 'Abholen'}
      </Button>
      <CreateOrderContainer />
    </Root>
  );
}

export { SidePanelComponent };
