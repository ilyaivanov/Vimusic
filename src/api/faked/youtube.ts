import { Video } from "../index";

export const searchVideos = (term: string): Promise<Video[]> =>
  new Promise(resolve => {
    setTimeout(() => resolve(dummyVideos), 200);
  });


export const dummyVideos: Video[] = [
  {
    id: "iIO-xrZ6IE0",
    text: "Sample 1 Deep house",
    imagePreview: "https://i.ytimg.com/vi/waXbmu5VhME/default_live.jpg"
  },
  {
    id: "dUh1eGf57DY",
    text: "Sample 2 Brian Regan for term ",
    imagePreview: "https://i.ytimg.com/vi/f713tLbdlu4/default.jpg"
  },
  {
    id: "00CbHeQ1k5I",
    text: "Sample 3 Carbon Based Lifeforms - Hydroponic Garden",
    imagePreview: "https://i.ytimg.com/vi/-9pgIVcB3rk/default.jpg/"
  }
];
