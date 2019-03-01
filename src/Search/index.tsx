import React, {useEffect, useState} from "react";
import {useAppStateFromContext} from "../SandboxContext";
import {useDebounce} from "../utils/hooks";
import {searchVideos} from "../api";
import Tree from "../components/Tree";
import Focusable from "../components/Focusable";

export default ({onTreeKeyPress}:any) => {
  const [app, dispatch] = useAppStateFromContext();
  const [text, setText] = useState("");
  const value = useDebounce(text, 500);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (value) {
      setIsSearching(true);
      searchVideos(value).then(videos => {
        setIsSearching(false);
        dispatch({type: "SET_NODES", videos});
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
        style={{width: 300}}
      />
      {
        isSearching ? "Searching..." : " "
      }

      <Focusable tabIndex={2} onKeyPress={onTreeKeyPress}>
        <Tree app={app}/>
      </Focusable>
    </div>
  );
};
