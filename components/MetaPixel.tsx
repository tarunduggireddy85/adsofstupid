import Script from "next/script";

/*
 * Meta (Facebook) Pixel. Set NEXT_PUBLIC_FB_PIXEL_ID to enable; renders nothing
 * without it. Fires a base PageView on load; client-side route changes are
 * tracked by <PixelRouteTracker/>, and a "Lead" conversion is fired from the
 * form/popup submit handlers via lib/fbq.ts.
 *
 * NOTE: this installs the Pixel directly. Do NOT also add it as a GTM tag, or
 * every event double-counts.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

export function MetaPixelScript() {
  if (!PIXEL_ID) return null;
  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
