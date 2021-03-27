import {
  getDeliveryFee,
  getOrderType,
  getSelectedPlace,
} from 'features/delivery/delivery-reducer';
import { DELIVERY_SELECT } from 'features/modal/modal-constants';
import { setModal } from 'features/modal/modal-reducer';
import { compose } from 'ramda';
import { connect } from 'react-redux';

import { withTranslation } from '../../../i18n';
import { SidePanelComponent } from './sidepanel-component';

function SidePanel({ openModal, ...rest }) {
  return (
    <SidePanelComponent onClickChangeOrderType={() => openModal()} {...rest} />
  );
}

const mapStateToProps = state => ({
  orderType: getOrderType(state),
  deliveryFee: getDeliveryFee(state),
  place: getSelectedPlace(state),
});

const SidePanelContainer = compose(
  withTranslation(),
  connect(mapStateToProps, {
    openModal: () => setModal(DELIVERY_SELECT),
  }),
)(SidePanel);

export { SidePanelContainer };
