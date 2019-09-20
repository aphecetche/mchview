import axios from "axios";

// Middleware to intercept actions which have a request key in their payload
//
// the request itself generate a [type]_REQUEST action
// if the fetching is successfull then [type]_SUCCESS  action is dispatched
// otherwise [type]_FAILURE is dispatched
//

const fetchMiddleware = store => next => action => {
  if (!action.payload.request) {
    return next(action);
  }

  const makeFetchAction = action => {
    return {
      type: "FETCH_" + action.type,
      payload: {
        url: action.payload.request.url,
        deid: action.payload.request.deid,
        bending: action.payload.request.bending
      }
    };
  };
  next(makeFetchAction(action));

  setTimeout(() => {
    axios
      .get(action.payload.request.url)
      .then(response => {
        const nextAction = {
          type: "RECEIVE_" + action.type,
          payload: {
            response: {
              ...response.data,
              id: {
                deid: response.data.id,
                bending: action.payload.request.bending
              }
            }
          }
        };
        console.log(nextAction.payload.response);
        next(nextAction);
      })
      .catch(error => {
        const nextAction = {
          type: "ERROR_FETCH_" + action.type,
          payload: {
            message: error
          }
        };
        next(nextAction);
      });
  }, 5000);
};

export default fetchMiddleware;
