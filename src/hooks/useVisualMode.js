import React from "react";
import { useState } from "react";

const useVisualMode = (initialMode) => {

  const [mode, setMode] = useState(initialMode);

  const transition = (newMode) => {
    setMode(newMode);
  }

  return (
    { mode, transition }
  );
}

export default useVisualMode;