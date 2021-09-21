import { configAnalyticsGtmId } from 'config/analytics/gtm-id';
import { helpersIsDevelopment } from 'helpers/is-development';

const __html = `
function urlQueryGetParameterByName(name, url = window.location.href) {
  name = name.replace(/[[]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\\+/g, ' '));
}

window.dataLayer = [];

if (!urlQueryGetParameterByName('no-gtm')) {
  // GTM
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer', '${configAnalyticsGtmId}');
}

if (!urlQueryGetParameterByName('no-analytics')) {
  // TODO-FE[CX-186] remove false
  if (false && !urlQueryGetParameterByName('no-tealium')) {
    // TODO-FE[CX-186] setup tealium variables from env
    // Default Tealium event data
    window.tealium = {
      "page_country"        : "ae",                           //Required
      "page_currency_code"  : "AED",             //Required
      "page_lang"           : "en",                        //Required
      "page_category"       : "Ancillary Page",  //Required
      "page_type"           : "other",                //Required
      "tealium_event"       : "view",      //Required
    };

    // Tealium
    (function(a,b,c,d){
    a='https://tags.tiqcdn.com/utag/propertyfinder/uae/prod/utag.js';
    b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
    a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
    })();
  }

  // Snowplow
  if (!urlQueryGetParameterByName('no-snowplow')) {
    if (window.localStorage) {
      ;(function(p,l,o,w,i,n,g){if(!p[i]){p.GlobalSnowplowNamespace=p.GlobalSnowplowNamespace||[];
          p.GlobalSnowplowNamespace.push(i);p[i]=function(){(p[i].q=p[i].q||[]).push(arguments)
          };p[i].q=p[i].q||[];n=l.createElement(o);g=l.getElementsByTagName(o)[0];n.async=1;
          n.src=w;g.parentNode.insertBefore(n,g)}}(window,document,"script","/static/sp.js","snowplow"));

      window.snowplow(
        'newTracker',
        'pf-website',
        '${process.env.NEXT_PUBLIC_SNOWPLOW_HOST}',
        {
          appId: 'pf-mobilesite',
          platform: 'web',
          discoverRootDomain: true,
          bufferSize: ${helpersIsDevelopment ? 1 : 5},
          respectDoNotTrack: false,
          forceSecureTracker: true,
          post: true,
          contexts: {
              webPage: true,
              performanceTiming: true,
              gaCookies: true,
              geolocation: false
          }
        }
      );

      window.snowplow('enableActivityTracking', 30, 10);

      window.snowplow('enableLinkClickTracking');

      window.snowplow('crossDomainLinker', function(linkElement) {
        return /^https:\\/\\/www\\.mortgagefinder\\.ae/.test(linkElement.href);
      });
    }
  }
}
`;

export const HeadTrackersTemplate = (): JSX.Element => (
  // eslint-disable-next-line react/no-danger
  <script dangerouslySetInnerHTML={{ __html }} />
);