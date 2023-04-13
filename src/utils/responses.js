const serverResponseStatus = require('../constants/serverResponseStatus');

const buildResponse = (response) => {
  return {
    ...response,
    status: serverResponseStatus.RESPONSE_STATUS_SUCCESS,
    statusCode: serverResponseStatus.OK,
  };
};

const buildFailedResponse = (response) => {
  return {
    ...response,
    status: serverResponseStatus.RESPONSE_STATUS_FAILURE,
    statusCode: serverResponseStatus.FAILED,
  };
};

module.exports = Object.freeze({
  buildResponse,
  buildFailedResponse,
});
