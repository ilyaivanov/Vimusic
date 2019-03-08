const treeMiddleware = store => next => action => {
  const nextAction = action.selection ? action :
    {
      ...action,
      selection: store.getState().userSettings.selection
    };
  return next(nextAction);
};

export default treeMiddleware;
