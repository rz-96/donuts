import { addToCart } from 'features/cart/cart-reducer';
import compose from 'ramda/src/compose';
import { connect } from 'react-redux';

import { withTranslation } from '../../../i18n';
import { MenuComponent } from './menu-component';
import {
  getIsMenuOpen,
  getMenuProduct,
  getMenuSelections,
  getSelectedOption,
  setIsMenuOpen,
  setSelectedOption,
} from './menu-reducer';

function Menu({
  selections,
  setSelectedOption,
  addToCart,
  product,
  setIsMenuOpen,
  ...rest
}) {
  const handleClickAdd = () => {
    console.log(product);
    addToCart({ ...product, selections });
    setIsMenuOpen(false);
  };

  const handleClickAbort = () => {
    setIsMenuOpen(false);
  };

  const handleChangeOption = ({ optionId, extraId }) => {
    setSelectedOption({ optionId, extraId });
  };

  return (
    <MenuComponent
      product={product}
      onChangeOption={handleChangeOption}
      onClickAdd={handleClickAdd}
      onClickAbort={handleClickAbort}
      {...rest}
    />
  );
}

const mapStateToProps = state => ({
  isOpen: getIsMenuOpen(state),
  product: getMenuProduct(state),
  getOption: getSelectedOption(state),
  selections: getMenuSelections(state),
});

const MenuContainer = compose(
  withTranslation(),
  connect(mapStateToProps, {
    setIsMenuOpen,
    addToCart,
    setSelectedOption,
  }),
)(Menu);

export { MenuContainer };
