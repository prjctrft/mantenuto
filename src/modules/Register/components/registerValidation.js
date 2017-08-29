import memoize from 'lru-memoize';
import { createValidator, required, email, match } from 'utils/validation';

const registerValidation = createValidator({
  first: required,
  last: required,
  username: required,
  email: [required, email],
  credential: required
});
export default memoize(10)(registerValidation);
