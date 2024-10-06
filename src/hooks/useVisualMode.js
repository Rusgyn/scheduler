import React from "react";
import { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] =  useState(initialMode);

  const transition = (newMode) => {
    setMode(newMode);
    setHistory(prevHistory => [...prevHistory, newMode]);
  };
  const back = () => {

  };

  return (
    { mode, transition, back}
  );
};