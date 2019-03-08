import React, { useEffect, useState } from "react";
import { useDebounce } from "../utils/hooks";
import { searchVideos } from "../api";
import { TreeDefinition } from "../types";
import { connect } from "react-redux";
import { select } from "../userSettings/actions";

interface Props {
  onSearched: (nodes: TreeDefinition[]) => void;
  tabIndex: number;
  select: typeof select;
}

const Search = ({ onSearched, tabIndex, select }: Props) => {
  const [text, setText] = useState("");
  const value = useDebounce(text, 500);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (value) {
      setIsSearching(true);
      searchVideos(value).then(videos => {
        setIsSearching(false);
        const nodes: TreeDefinition[] = videos.map(v => ({
          id: Math.random() + "",
          text: v.text,
          youtubeId: v.id,
          image: v.imagePreview
        }));
        onSearched(nodes);
      });
    }
  }, [value]);

  return (
    <input
      tabIndex={tabIndex}
      value={text}
      onChange={e => setText(e.target.value)}
      onFocus={() => select("searchInput")}
      type="text"
      style={{ width: "100%", boxSizing: "border-box" }}
    />
  );
};

export default connect(null, { select })(Search);
