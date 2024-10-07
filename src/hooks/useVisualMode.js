import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] =  useState([initialMode]);

  const transition = (mode, replace = false) => {
    setHistory(prev => [...prev, mode]);
    
  };
  const back = () => {
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
  };

  return (
    { mode: history[history.length - 1], transition, back }
  );
};