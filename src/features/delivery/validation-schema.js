import { object as yupObject, string as yupString } from 'yup';

const address = yupObject().shape({
  street: yupString('Bitte geben Sie einen Straßennamen an').required(
    'Bitte geben Sie einen Straßennamen an',
  ),
  city: yupString().required('Bitte geben Sie eine Stadt an'),
});

export { address };
