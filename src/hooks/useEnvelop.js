import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as envelop from "../ducks/envelop";

const useEnvelop = id => {
  const dispatch = useDispatch();

  let isLoading = useSelector(state => {
    return envelop.selectors.isLoading(state.envelop, id);
  });

  const geo = useSelector(state =>
    envelop.selectors.envelop(state.envelop, id)
  );

  useEffect(() => {
    if (!geo) {
      if (!isLoading) {
        dispatch(envelop.actions.fetch(id));
      }
    }
  }, [geo, isLoading, id]);

  return {
    isLoading,
    geo
  };
};

export default useEnvelop;
