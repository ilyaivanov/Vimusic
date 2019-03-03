import React, {useEffect, useState} from "react";
import {useAppStateFromContext} from "../SandboxContext";
import {useDebounce} from "../utils/hooks";
import {searchVideos} from "../api";
import Tree from "../components/Tree";
import {TreeDefinition} from "../Sandbox/types";

export default () => {
  const [app, dispatch] = useAppStateFromContext();
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
        dispatch({type: "SET_NODES", nodes});
      });
    }
  }, [value]);

  return (
    <div>
      <input
        tabIndex={1}
        value={text}
        onChange={e => setText(e.target.value)}
        type="text"
        style={{width: '100%', boxSizing: 'border-box'}}
      />
      {
        isSearching ? "Searching..." : " "
      }

      <Tree app={app}/>
    </div>
  );
};
