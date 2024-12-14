'use client'
import { useEffect } from "react";

const InstagramWidget = () => {
  useEffect(() => {
    // Adaugă script-ul doar o dată
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Curăță script-ul dacă este necesar
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="elfsight-app-f21305b2-a3fe-4667-8642-78bd065b28a9"
      data-elfsight-app-lazy
    ></div>
  );
};

export default InstagramWidget;
