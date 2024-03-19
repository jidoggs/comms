"use client";
import Script from "next/script";
import React, { useEffect } from "react";

interface TawkProps {
  id: string;
  widgetUrl: string;
}

// Extend Window interface to declare Tawk_API globally
interface CustomWindow extends Window {
  Tawk_API?: any;
}

declare let window: CustomWindow;

const TawkScript: React.FC<TawkProps> = ({ widgetUrl }) => {
  useEffect(() => {
    // Tawk.to script to load the chat widget
    window.Tawk_API = window.Tawk_API || {};
    (function () {
      var s1 = document.createElement("script");
      var s0 = document.getElementsByTagName("script")[0];
      if (s0 && s0.parentNode) {
        s1.async = true;
        // s1.src = "https://embed.tawk.to/656f47adff45ca7d47871424/1hgtb00hm";
        s1.src = widgetUrl;
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        s0.parentNode.insertBefore(s1, s0);
      }
    })();
  }, [widgetUrl]); // The empty dependency array ensures that the effect runs only once after the initial render

  return (
    <>
      <Script src="https://embed.tawk.to/656f47adff45ca7d47871424/1hgtb00hm" />
    </>
  );
};

export default TawkScript;
