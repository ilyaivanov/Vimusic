import {USE_REAL_API} from "../configuration";

import * as faked from './faked/youtube';
import * as real from './youtube';

export const searchVideos = (term: string): Promise<Video[]> =>
  USE_REAL_API ? real.searchVideos(term) : faked.searchVideos(term);

export interface Video {
  text: string;
  id: string;
}
