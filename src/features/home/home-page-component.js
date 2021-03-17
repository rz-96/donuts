import { SidePanelContainer } from 'components/sidepanel/sidepanel-container';
import { OrderConfirmation } from 'features/create-order/order-confirmation-container';
import { MenuContainer } from 'features/menu/menu-container';
import { ModalContainer } from 'features/modal/modal-container';
import { ShopClosed } from 'features/opening-times/shop-closed-container';
import Head from 'next/head.js';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import {
  Description,
  Divider,
  Product,
  ProductContainer,
  ProductTitle,
} from './home-page-styles';

const noop = () => {};

const HomePageComponent = ({
  onClickProduct,
  products,
  categories,
  t = noop,
}) => (
  <Fragment>
    <Head>
      <title>{t('common:ra-software')}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="grid grid-cols-4 gap-4">
      <ShopClosed />
      <OrderConfirmation />
      <MenuContainer />
      <ModalContainer />
      <div className="shadow p-6 col-span-4 md:col-span-3 m-6">
        <p className="text-3xl font-medium">Speisekarte</p>

        {categories.map((category, index) => (
          <div key={index}>
            <Divider />
            <p className="text-2xl font-normal">{category}</p>
            {products
              .filter(e => e.category === category)
              .map((e, i) => (
                <>
                  <Product key={i} onClick={() => onClickProduct(e)}>
                    <ProductContainer>
                      <ProductTitle>{e.title}</ProductTitle>
                      <Description>{e.description}</Description>
                    </ProductContainer>
                    <p className="font-medium">{e.price.toFixed(2)}€</p>
                  </Product>
                </>
              ))}
          </div>
        ))}
      </div>
      <div className="col-span-4 md:col-span-1 shadow m-6">
        <SidePanelContainer />
      </div>
    </div>
    <style jsx>{`
      .root {
        align-items: center;
        background: #fff;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
      }
    `}</style>
  </Fragment>
);

HomePageComponent.propTypes = {
  count: PropTypes.number,
  onIncrementClick: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export { HomePageComponent };
