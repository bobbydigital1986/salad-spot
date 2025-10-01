import _ from 'lodash'
import Bugsnag from '@bugsnag/js';

let translateServerErrors = (errors) => {
  let serializedErrors = {}
  Bugsnag.notify(errors)
  
  Object.keys(errors).forEach((key) => {
    const messages = errors[key].map((error) => {
      const field = _.startCase(key)
      serializedErrors = {
        ...serializedErrors,
        [field]: error.message
      }
    })
  });
  return serializedErrors
};

export default translateServerErrors;
