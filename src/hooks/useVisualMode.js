// const { result } = renderHook(() => useVisualMode(FIRST));

// expect(result.current.mode).toBe(FIRST);

import React from "react";
import { useState } from "react";

const useVisualMode = (element) => {

  const [mode, setMode] = useState(element);

  return (
    { mode }
  );
}

export default useVisualMode;