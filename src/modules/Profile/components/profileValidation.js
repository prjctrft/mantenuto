import memoize from 'lru-memoize';
import { createValidator, required, email, match } from 'utils/validation';

const profileValidation = createValidator({
  first: required,
  last: required,
  username: required,
  email: [email]
});
export default memoize(10)(profileValidation);
