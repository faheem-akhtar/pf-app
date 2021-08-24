import { configAnalyticsGtmId } from 'config/analytics/gtm-id';

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${configAnalyticsGtmId}');`;

export const HeadGtmScriptTemplate = (): JSX.Element => (
  // eslint-disable-next-line react/no-danger
  <script dangerouslySetInnerHTML={{ __html: gtmScript }} />
);
