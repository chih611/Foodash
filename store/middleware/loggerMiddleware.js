const loggerMiddleware = (storeAPI) => (next) => (action) => {
  if (typeof action === "function") {
    // It's an async thunk action; don't log directly
    const result = next(action);
    if (result instanceof Promise) {
      return result.then((resolvedValue) => {
        // console.log("Async Action Result:", resolvedValue);
        return resolvedValue;
      });
    }
    return result;
  } else {
    // It's a regular action; log it
    // console.log("Dispatching action:", action);
    let result = next(action);
    // console.log("Next state:", storeAPI.getState());
    return result;
  }
};

export default loggerMiddleware;
