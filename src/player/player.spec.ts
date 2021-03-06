import { PlayerStore } from "./types";
import { playVideo, togglePlay } from "./actions";
import { createStore } from "redux";
import reducer from "./reducer";

describe("having a store", () => {
  let store: PlayerStore;

  beforeEach(() => {
    store = createStore(reducer);
  });

  it("by default video should not be player", () => {
    expect(store.getState().isPlaying).toEqual(false);
  });

  describe("when trigger play video", () => {
    beforeEach(() => {
      store.dispatch(playVideo("some video"));
    });

    it("it should set video id", () => {
      expect(store.getState().youtubeVideoId).toEqual("some video");
    });

    it("and play it", () => {
      expect(store.getState().isPlaying).toEqual(true);
    });
  });

  it("toggling play should set isPlating when not playing", () => {
    store.dispatch(togglePlay());
    expect(store.getState().isPlaying).toEqual(true);
  });
});
