import Script from "next/script";
import React from "react";

function AdSense() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7051738005620134"
      crossorigin="anonymous"
      strategy="afterInteractive"
    />
  );
}

export default AdSense;
