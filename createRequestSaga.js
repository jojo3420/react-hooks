import { call, put } from 'redux-saga/effects';
import { startLoading, endLoading } from 'modules/loading';
import { addError } from 'modules/error';

/**
 * Create api request redux-saga
 * @param type: actionType
 * @param request: api request function
 * @return saga func
 */
export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  // const FAILURE = `${type}_FAILURE`;
  return function* (action) {
    try {
      if (!request || typeof request !== 'function') {
        throw new Error('request function is not working!');
      }
      yield put(startLoading(type));
      const response = yield call(request, action.payload);
      yield put({
        type: SUCCESS,
        payload: response.data,
      })
      yield put(endLoading(type));
    } catch (e) {
      console.error({ e });
      yield put(addError(type, e));
      yield put(endLoading(type));
      throw e;
    }
  }
}
