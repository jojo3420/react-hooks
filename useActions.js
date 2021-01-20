import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from 'redux';

/**
 * return bindActions
 * @param actions
 * @param deps
 * @return {unknown}
 * https://react-redux.js.org/next/api/hooks
 */
function useActions(actions, deps) {
  const dispatch = useDispatch();

  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((action) => bindActionCreators(action, dispatch));
      } else {
        return bindActionCreators(actions, dispatch);
      }
    },
    deps ? [dispatch, ...deps] : [dispatch],
  );
}

export default useActions;
