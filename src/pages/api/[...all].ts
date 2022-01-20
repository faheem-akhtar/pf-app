/* eslint @propertyfinder/rules/export-name-validation: 0 */

import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { configOriginValue } from 'config/origin/value';

const isDevelopment = process.env.NODE_ENV === 'development';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  try {
    if (isDevelopment) {
      httpProxyMiddleware(req, res, {
        target: `${configOriginValue.replace('www.', 'https://staging.')}/${backendApiGetLocaleFromReq(req)}/api`,
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
    res.status(500).send((e as Error).toString());
  }
};
