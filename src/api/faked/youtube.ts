import {Video} from "../index";

export const searchVideos = (term: string): Promise<Video[]> =>
  new Promise(resolve => {
    const videos: Video[] = [
      {id: 'Result 1' + term, text: 'Result 1' + term},
      {id: 'Result 2' + term, text: 'Result 2' + term},
      {id: 'Result 3' + term, text: 'Result 3' + term},
    ];
    setTimeout(() => resolve(videos), 2000);
  });

