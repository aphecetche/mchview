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
        id: action.payload.request.id
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
            id: action.payload.request.id,
            response: response.data
          }
        };
        console.log(
          "fetchMiddleware for " + action.payload.request.url,
          "is:",
          nextAction.payload
        );
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
  }, 10 /*3000*/);
};

export default fetchMiddleware;
