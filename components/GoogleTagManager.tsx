import Script from "next/script";

/*
 * Google Tag Manager. Set NEXT_PUBLIC_GTM_ID (e.g. GTM-XXXXXXX) in env to
 * enable it; with no ID set these render nothing. Your existing GTM container
 * already fires Meta Pixel + GA4, so this single snippet covers all three.
 *
 *  - <GtmScript/>   goes in the document (loads gtm.js after interactive)
 *  - <GtmNoScript/> goes first thing inside <body> (fallback iframe)
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function GtmScript() {
  if (!GTM_ID) return null;
  return (
    <Script
      id="gtm-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`
      }}
    />
  );
}

export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
