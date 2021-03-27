import { object as yupObject, string as yupString } from 'yup';

const createOrder = yupObject().shape({
  email: yupString('')
    .required('contact-details:email-required')
    .email('contact-details:email-invalid'),
  name: yupString().required('contact-details:name-required'),
  phone: yupString().required('contact-details:phone-number-required'),
  comment: yupString(),
  paymentType: yupString(),
  orderType: yupString(),
  street: yupString().when('orderType', (orderType, schema) =>
    orderType === 'delivery'
      ? schema.required('contact-details:street-required')
      : schema,
  ),
  city: yupString().when('orderType', (orderType, schema) =>
    orderType === 'delivery'
      ? schema.required('contact-details:city-required')
      : schema,
  ),
});

export { createOrder };
