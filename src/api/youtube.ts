import {Video} from "./index";
import {SearchResponse} from "./generated/searchResponse";
import {SimilarResponse} from "./generated/similarResponse";

export const searchVideos = (term: string): Promise<Video[]> =>
  fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&shart=mostPopular&maxResults=10&key=AIzaSyBsCL-zrXWd9S2FKRSDVfz7dOo783LQkLk&q=" +
    term
  )
    .then(response => response.json())
    .then((data: SearchResponse) =>
      data.items
        .filter(v => v.id.videoId)
        .map(s => {
          return {text: s.snippet.title, id: s.id.videoId};
        })
    );

export const searchSimilar = (videoId: string): Promise<Video[]> =>
  fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyBsCL-zrXWd9S2FKRSDVfz7dOo783LQkLk&relatedToVideoId=" +
    videoId
  )
    .then(response => response.json())
    .then((data: SimilarResponse) =>
      data.items
        .filter(v => v.id.videoId)
        .map(s => {
          return {text: s.snippet.title, id: s.id.videoId};
        })
    );
