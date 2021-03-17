import { POSTCODE_INPUT } from 'features/modal/modal-constants';
import { dismissModal, setModal } from 'features/modal/modal-reducer';
import transformProps from 'hocs/transform-props';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { setPickup } from './delivery-reducer';
import { DeliverySelectComponent } from './delivery-select-component';

const transform = ({ setModal, dismissModal, setPickup, ...rest }) => ({
  onClickDelivery: () => {
    dismissModal();
    setModal(POSTCODE_INPUT);
  },
  onClickPickup: () => {
    setPickup();
    dismissModal();
  },
  ...rest,
});

export const DeliverySelectContainer = compose(
  connect(undefined, { dismissModal, setPickup, setModal }),
  transformProps(transform),
)(DeliverySelectComponent);
