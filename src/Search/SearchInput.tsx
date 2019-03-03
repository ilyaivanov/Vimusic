import React, {useEffect, useState} from "react";
import {useDebounce} from "../utils/hooks";
import {searchVideos} from "../api";
import {Dispatch, TreeDefinition} from "../Sandbox/types";

interface Props {
  onSearched: (nodes: TreeDefinition[]) => void;
}

export default ({onSearched}: Props) => {
  const [text, setText] = useState("");
  const value = useDebounce(text, 500);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (value) {
      setIsSearching(true);
      searchVideos(value).then(videos => {
        setIsSearching(false);
        const nodes: TreeDefinition[] = videos.map(v => ({
          id: Math.random() + '',
          text: v.text,
          youtubeId: v.id
        }));
        onSearched(nodes);
      });
    }
  }, [value]);

  return (
    <input
      tabIndex={1}
      value={text}
      onChange={e => setText(e.target.value)}
      type="text"
      style={{width: '100%', boxSizing: 'border-box'}}
    />
  );
};
