import memoize from 'lru-memoize';
import { alphaNumeric, createValidator, required, email, minLength } from 'utils/validation';

const registerValidation = createValidator({
  first: required,
  last: required,
  username: [required, minLength(3), alphaNumeric],
  email: [required, email],
  verification: required,
  type: required
});
export default memoize(10)(registerValidation);
