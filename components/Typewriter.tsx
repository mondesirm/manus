"use client";

import { useEffect, useState } from "react";

const words = ["clarity", "focus", "momentum", "alignment", "progress", "attention", "insight", "direction", "purpose", "impact"];

export function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[wordIndex];

  useEffect(() => {
    const delay = deleting ? 55 : 105;
    const timer = window.setTimeout(() => {
      if (!deleting && visible < word.length) setVisible((value) => value + 1);
      else if (!deleting) setDeleting(true);
      else if (visible > 0) setVisible((value) => value - 1);
      else { setDeleting(false); setWordIndex((value) => (value + 1) % words.length); }
    }, !deleting && visible === word.length ? 1500 : delay);
    return () => window.clearTimeout(timer);
  }, [deleting, visible, word]);

  return <>Make room for&nbsp;<em>{word.slice(0, visible)}<span className="typewriter-cursor">|</span></em>.</>;
}
