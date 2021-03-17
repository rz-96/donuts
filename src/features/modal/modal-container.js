import { OrderConfirmationComponent } from 'features/create-order/order-confirmation-component';
import { DeliverySelectContainer } from 'features/delivery/delivery-select-container';
import { PostcodeInput } from 'features/delivery/postcode-input-container';
import { ShopClosed } from 'features/opening-times/shop-closed-container';
import { connect } from 'react-redux';

import {
  DELIVERY_SELECT,
  ORDER_CONFIRM,
  POSTCODE_INPUT,
  SHOP_CLOSED,
} from './modal-constants';
import { dismissModal, getIsModalOpen, getModalName } from './modal-reducer';

const modal = {
  [ORDER_CONFIRM]: OrderConfirmationComponent,
  [DELIVERY_SELECT]: DeliverySelectContainer,
  [SHOP_CLOSED]: ShopClosed,
  [POSTCODE_INPUT]: PostcodeInput,
};

function Modal({ name, open, dismissModal }) {
  const Component = modal[name];

  return open && Component ? (
    <Component open={open} onClickClose={() => dismissModal()} />
  ) : null;
}

const mapStateToProps = state => ({
  name: getModalName(state),
  open: getIsModalOpen(state),
});

const ModalContainer = connect(mapStateToProps, { dismissModal })(Modal);

export { ModalContainer };
