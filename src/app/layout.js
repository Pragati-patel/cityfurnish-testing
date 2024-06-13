import React from "react";
import "./globals.css";
import PropTypes from "prop-types";
import ReduxProvider from "@/store/provider";
import QueryProvider from "@/components/QueryProvider/QueryProvider";
import localFont from "@next/font/local";
import Script from "next/script";

export const metadata = {
  title: "Rent Premium Furniture & Home Appliances Online - Cityfurnish",
  description:
    "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad.",
  icons: {
    icon: "https://d3juy0zp6vqec8.cloudfront.net/images/favicon.png",
  },
  alternates: {
    canonical: `https://cityfurnish.com`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Rent Premium Furniture & Home Appliances Online - Cityfurnish",
    description:
      "Rent furniture and home appliances online from India's leading furniture rental company Cityfurnish. We offer furniture rental in Bangalore Mumbai, Pune, Delhi, Gurgaon, Noida and Hyderabad",
    siteName: "Cityfurnish",
    images: {
      url: "https://d3juy0zp6vqec8.cloudfront.net/images/cityfurnish-og-image.webp",
      width: 800,
      height: 600,
    },
  },
};

const poppins = localFont({
  src: [
    {
      path: "./font/Poppins-Bold.ttf",
      weight: "700",
    },
    {
      path: "./font/Poppins-Medium.ttf",
      weight: "500",
    },
    {
      path: "./font/Poppins-Regular.ttf",
      weight: "400",
    },
    {
      path: "./font/Poppins-SemiBold.ttf",
      weight: "600",
    },
  ],
  variable: "--font-poppins",
});
const inter = localFont({
  src: [
    {
      path: "./font/Inter-VariableFont_slnt,wght.ttf",
    },
  ],
  variable: "--font-inter",
});

export default function RootLayout({children}) {
  // const AMPLITUDE_ID = "";

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} font-sans`}>
      <head>
        <meta
          property="article:publisher"
          content="https://www.facebook.com/cityFurnishRental"
        />
        <meta
          name="facebook-domain-verification"
          content="5qetjkn16z0nh00u71i0iw25oljz0h"
        />
        <meta
          name="google-site-verification"
          content="-7HYCsHFSLsnVIKsDD6-2sAPS280EgG3x8SB6Imvk34"
        />

        <meta
          property="article:publisher"
          content="https://www.facebook.com/cityFurnishRental/"
        />
        <meta httpEquiv="Content-Encoding" content="gzip" />
        {/* <!-- clear cache --> */}
        <meta httpEquiv="Expires" content="Mon, 26 Jul 1997 05:00:00 GMT" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta
          name="google-signin-client_id"
          content="1065795218106-s2m2k3s28ch432hn8gp669pjjn7esr7d.apps.googleusercontent.com"></meta>

        <Script
          type="text/javascript"
          id="fcWidget-chatboat"
          dangerouslySetInnerHTML={{
            __html: `
            const userId = localStorage.getItem("_ga");
            fetch("https://cityfurnish.com/ajxapi/getDecryptedUserId", {
              method: "POST",
              body: JSON.stringify({
                userId: JSON.parse(userId)
              }),
              headers: {

              }
            })
            .then(res => res.json())
            .then(res => {
              window.fcWidgetMessengerConfig = {
                meta: {
                  cf_userid: res.data.userId,
                },
              }
            })
            .catch(e => console.log('e',e))
            `,
          }}></Script>

        <Script
          src="//in.fw-cdn.com/30445413/247408.js"
          chat="true"
          strategy="worker"></Script>

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <Script
            id="facebook"
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `
                   !function (f, b, e, v, n, t, s)
                      {
                        if (f.fbq)
                         return;
                       n = f.fbq = function () {
                         n.callMethod ?
                                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                       };
                       if (!f._fbq)
                        f._fbq = n;
                       n.push = n;
                       n.loaded = !0;
                       n.version = '2.0';
                       n.queue = [];
                       t = b.createElement(e);
                       t.async = !0;
                       t.src = v;
                       s = b.getElementsByTagName(e)[0];
                       s.parentNode.insertBefore(t, s)
                       }(window, document, 'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                       fbq('init', '713012115962029');
                       fbq('track', 'PageView');
                       `,
            }}
          />
        )}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{display: "none"}}
              src="https://www.facebook.com/tr?id=713012115962029&ev=PageView&noscript=1"
              alt="Facebook Pixel"
            />
          </noscript>
        )}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <Script
            defer
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-05PLBRM6KD"
            strategy="worker"
          />
        )}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <Script
            id="gtag"
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
        gtag('config', 'G-05PLBRM6KD');
            `,
            }}
          />
        )}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <Script
            id="linkedin"
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `
                _linkedin_partner_id = "4895321";
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(_linkedin_partner_id);
  `,
            }}
          />
        )}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <Script
            id="lms-analytics"
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `
    (function (l) {
      if (!l) {
        window.lintrk = function (a, b) {
          window.lintrk.q.push([a, b])
        };
        window.lintrk.q = []
      }
      var s = document.getElementsByTagName("script")[0];
      var b = document.createElement("script");
      b.type = "text/javascript";
      b.async = true;
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b, s);
    })(window.lintrk);
  `,
            }}
          />
        )}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <noscript>
            <img
              height="1"
              width="1"
              style={{display: "none"}}
              alt=""
              src="https://px.ads.linkedin.com/collect/?pid=4895321&fmt=gif"
            />
          </noscript>
        )}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <Script
            id="googletagmanager"
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `(function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-PF4G2HJ')`,
            }}
          />
        )}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-PF4G2HJ"
              height="0"
              width="0"
              style={{display: "none", visibility: "hidden"}}></iframe>
          </noscript>
        )}

        {/* {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <script
            defer
            async
            dangerouslySetInnerHTML={{
              __html: `
  !function(){"use strict";!function(e,t){var n=e.amplitude||{_q:[],_iq:{}};if(n.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var r=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,n){return function(r){e._q.push({name:t,args:Array.prototype.slice.call(n,0),resolve:r})}},o=function(e,t,n){e[t]=function(){if(n)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var n=0;n<g.length;n++)o(e,g[n],!0)};n.invoked=!0;var u=t.createElement("script");u.type="text/javascript",u.integrity="sha384-x0ik2D45ZDEEEpYpEuDpmj05fY91P7EOZkgdKmq4dKL/ZAVcufJ+nULFtGn0HIZE",u.crossOrigin="anonymous",u.async=!0,u.src="https://cdn.amplitude.com/libs/analytics-browser-2.0.0-min.js.gz",u.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(u,a);for(var c=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<p.length;l++)r(c,p[l]);n.Identify=c;for(var d=function(){return this._q=[],this},f=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],v=0;v<f.length;v++)r(d,f[v]);n.Revenue=d;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset","extendSession"],g=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(n),n.createInstance=function(e){return n._iq[e]={_q:[]},i(n._iq[e]),n._iq[e]},e.amplitude=n}}(window,document)}();

  amplitude.init("${AMPLITUDE_ID}");`,
            }}
          />
        )} */}

        {process.env.NEXT_PUBLIC_PROD_ENV === "PRODUCTION" && (
          <Script
            id="ads-twitter"
            defer
            async
            dangerouslySetInnerHTML={{
              __html: ` !function(e,t,n,s,u,a)
            {e.twq ||
              ((s = e.twq =
                function () {
                  s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
                }),
              (s.version = "1.1"),
              (s.queue = []),
              (u = t.createElement(n)),
              (u.async = !0),
              (u.src = "https://static.ads-twitter.com/uwt.js"),
              (a = t.getElementsByTagName(n)[0]),
              a.parentNode.insertBefore(u, a))}
            (window,document,'script'); twq('config','ofz28');`,
            }}></Script>
        )}
      </head>
      <body>
        <ReduxProvider>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
RootLayout.propTypes = {
  children: PropTypes.element,
};
