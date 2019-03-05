import { createStore } from "redux";
import { reducer } from "./reducer";
import { setRoots } from "./keyHandlers/actions";

it("having a store", () => {
  const store = createStore(reducer);
  store.dispatch(setRoots(["1"]));
  expect(store.getState().rootNodes).toEqual(["1"]);
});
