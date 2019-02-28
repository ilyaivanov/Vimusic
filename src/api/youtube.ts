import { Video } from "./index";

export const searchVideos = (term: string): Promise<Video[]> =>
  fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&shart=mostPopular&maxResults=10&key=AIzaSyBsCL-zrXWd9S2FKRSDVfz7dOo783LQkLk&q=" +
      term
  )
    .then(response => response.json())
    .then((data: RootObject) =>
      data.items
        .filter(v => v.id.videoId)
        .map(s => {
          return { text: s.snippet.title, id: s.id.videoId };
        })
    );

//GENERATED CODE FROM SAMPLE RESPONSE
interface RootObject {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: ItemsItem[];
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

interface ItemsItem {
  kind: string;
  etag: string;
  id: Id;
  snippet: Snippet;
}

interface Id {
  kind: string;
  videoId: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
}

interface Thumbnails {
  default: {
    url: string;
    width: number;
    height: number;
  };
  medium: Medium;
  high: High;
}

interface Medium {
  url: string;
  width: number;
  height: number;
}

interface High {
  url: string;
  width: number;
  height: number;
}
