/* eslint pf-rules/export-name-validation: 0 */

import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { configOriginValue } from 'config/origin/value';
import httpProxyMiddleware from 'next-http-proxy-middleware';

const isDevelopment = process.env.NODE_ENV === 'development';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (isDevelopment) {
      httpProxyMiddleware(req, res, {
        target: `${configOriginValue.replace('https://www.', 'https://staging.')}/${backendApiGetLocaleFromReq(
          req
        )}/api`,
        pathRewrite: {
          '^/api': '',
        },
        followRedirects: true,
      });
    } else {
      res.status(404).send(null);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('Proxy error', e);
    res.status(500).send(e.toString());
  }
};
