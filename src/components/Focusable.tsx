import React, {useState} from "react";
import {useKeyboard} from "../utils/hooks";

interface Props {
  onKeyPress: (event: KeyboardEvent) => void;
  tabIndex: number;
  children: any;
}

export default ({onKeyPress, tabIndex, children}: Props) => {
  const [focus, setFocus] = useState(false);

  useKeyboard(
    event => {
      if (focus) {
        onKeyPress(event);
      }
    });

  return (
    <div
      tabIndex={tabIndex}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {children}
    </div>
  );
};
