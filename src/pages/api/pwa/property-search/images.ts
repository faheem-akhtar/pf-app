import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyImagesFetcher } from 'backend/api/property/images/fetcher';
import { IMAGE_ALLOWED_TYPES } from 'components/image/allowed-types.constant';
import { ImageFormatType } from 'components/image/format-type';
import { configCacheStrategy } from 'config/cache/strategy';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const propertyId = req.query.propertyId as string;
  const imageType = req.query.imageType as ImageFormatType;

  if (!IMAGE_ALLOWED_TYPES.includes(imageType)) {
    res.status(500);
    res.send({ error: 'invalid imageType' });
    return;
  }

  backendApiPropertyImagesFetcher(locale, [propertyId]).then((response) => {
    if (response.ok) {
      const images = (response.data?.[propertyId] || []).map((image) => image.links[imageType]);
      if (images.length) {
        // No images indicates either some api failure or some delay
        res.setHeader('cache-control', `max-age=${configCacheStrategy.shortTerm}`);
      }
      res.send(images);
    } else {
      res.status(response.error.status);
      // eslint-disable-next-line no-console
      console.error(`API_FAILED:PROPERTY_SEARCH_IMAGES:${response.error?.body || response.error}`);
      res.end();
    }
  });
};
