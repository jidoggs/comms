"use client";
import Script from "next/script";
import React, { useEffect } from "react";

interface CustomWindow extends Window {
  // eslint-disable-next-line no-unused-vars
  gtag?: (...args: any[]) => void;
  dataLayer?: any[];
}

declare let window: CustomWindow;

interface GoogleAnalyticsProps {
  trackingId: string;
}

const GoogleAnalyticsScript: React.FC<GoogleAnalyticsProps> = ({
  trackingId,
}) => {
  useEffect(() => {
    // Google Analytics script
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer?.push(arguments);
    };
    window.gtag("js", new Date().toString());
    window.gtag("config", trackingId);
  }, [trackingId]);

  if (process.env.NODE_ENV !== "production") {
    return <></>;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
        strategy="lazyOnload"
      />
      <Script id="ga-setup">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() { window.dataLayer.push(arguments); }
          gtag('js', new Date().toString());
          gtag('config', '${trackingId}');
        `}
      </Script>
    </>
  );
};

export default GoogleAnalyticsScript;
