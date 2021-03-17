import { initializeApp } from 'features/app-loading/app-loading-saga';
import { setIsMenuOpen, setMenuProduct } from 'features/menu/menu-reducer';
import { SHOP_CLOSED } from 'features/modal/modal-constants';
import { setModal } from 'features/modal/modal-reducer';
import { isOpenToday } from 'features/opening-times/opening-times-reducer';
import {
  getCategories,
  getProductsArray,
} from 'features/products/products-reducer';
import { compose } from 'ramda';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import { withTranslation } from '../../../i18n';
import { HomePageComponent } from './home-page-component.js';
import { getCount, increment } from './home-reducer.js';

function HomePage({
  isOpen,
  setIsMenuOpen,
  setMenuProduct,
  initializeApp,
  setModal,
  ...props
}) {
  useEffect(() => {
    initializeApp();
  }, [initializeApp]);
  const handleClickProduct = product => {
    if (!isOpen) {
      setModal(SHOP_CLOSED);
      return;
    }
    setMenuProduct(product);
    setIsMenuOpen(true);
  };

  return <HomePageComponent onClickProduct={handleClickProduct} {...props} />;
}

const mapStateToProps = state => ({
  count: getCount(state),
  products: getProductsArray(state),
  categories: getCategories(state),
  isOpen: isOpenToday(state),
});

const HomePageContainer = compose(
  withTranslation(),
  connect(mapStateToProps, {
    onIncrementClick: increment,
    initializeApp,
    setIsMenuOpen,
    setMenuProduct,
    setModal,
  }),
)(HomePage);

export { HomePageContainer };
