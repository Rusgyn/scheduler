import React from "react";
import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [history, setHistory] =  useState([initialMode]);

  const transition = (newMode) => {
    setHistory(prev => [...prev, newMode]);
  };
  const back = () => {
    setHistory(prev => [...prev.slice(0, prev.length - 1)])
  };

  return (
    { mode: history[history.length - 1], transition, back }
  );
};