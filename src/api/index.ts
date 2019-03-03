import {USE_REAL_API} from "../configuration";

import * as faked from "./faked/youtube";
import * as real from "./youtube";

export const searchVideos = (term: string): Promise<Video[]> =>
  USE_REAL_API ? real.searchVideos(term) : faked.searchVideos(term);


export const fetchSimilarVideos = (videoId: string): Promise<Video[]> => {
  if (USE_REAL_API) {
    throw new Error('Actual API for similar videos is not yet supported');
  }
  return faked.searchVideos(videoId);
};

export interface Video {
  text: string;
  id: string;
}
