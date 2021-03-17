import { object as yupObject, string as yupString } from 'yup';

const createOrder = yupObject().shape({
  email: yupString('')
    .required('E-Mail ist erforderlich')
    .email('Muss eine gültige E-Mail sein'),
  name: yupString().required('Name ist erforderlich'),
  phone: yupString().required('Telefonnummer ist erforderlich'),
  comment: yupString(),
  paymentType: yupString(),
  orderType: yupString(),
  street: yupString().when('orderType', (orderType, schema) =>
    orderType === 'delivery'
      ? schema.required('Bitte geben Sie einen Straßennamen an')
      : schema,
  ),
  city: yupString().when('orderType', (orderType, schema) =>
    orderType === 'delivery'
      ? schema.required('Bitte geben Sie eine Stadt an')
      : schema,
  ),
});

export { createOrder };
