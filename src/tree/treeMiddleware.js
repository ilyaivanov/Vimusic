const treeMiddleware = store => next => action => {
  const actionWithSelection = {
    ...action,
    selection: store.getState().userSettings.selection
  };
  return next(actionWithSelection);
};

export default treeMiddleware;
