import { dismissModal } from 'features/modal/modal-reducer';
import { useState } from 'react';
import { connect } from 'react-redux';

import {
  getPlaces,
  getSelectedPlace,
  setDelivery,
  setSelectedPlace,
} from './delivery-reducer';
import { PostcodeInput as PostcodeComponent } from './postcode-input-component';

function Postcode({
  setDelivery,
  initialSelectedPlace,
  setSelectedPlace,
  dismissModal,
  places,
  ...rest
}) {
  const [postcode, setPostcode] = useState(initialSelectedPlace);
  const handleOnClick = () => {
    setDelivery();
    setSelectedPlace(postcode);
    dismissModal();
  };
  return (
    <PostcodeComponent
      places={places}
      postcode={postcode}
      onChangePostcode={setPostcode}
      onClick={handleOnClick}
      {...rest}
    />
  );
}

const mapStateToProps = state => ({
  places: getPlaces(state),
  initialSelectedPlace: getSelectedPlace(state),
});

export const PostcodeInput = connect(mapStateToProps, {
  dismissModal,
  setDelivery,
  setSelectedPlace,
})(Postcode);
