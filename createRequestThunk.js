import { startLoading, endLoading } from 'modules/loading';
import { addError } from 'modules/error';


/**
 *  return api request Thunk Function
 * @param type: action type
 * @param request: api request function
 * @return {function(*=): function(...[*]=)}
 */
export default function createRequestThunk (type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  return params => async (dispatch, getState) => {
    try {
      dispatch(startLoading(type));
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
      dispatch(endLoading(type));
    } catch (e) {
      console.error(e);
      dispatch(addError(type, e));
      dispatch(endLoading(type));
      throw e;
    }
  }
}
