import { NextApiRequest, NextApiResponse } from 'next';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { backendApiPropertyImagesFetcher } from 'backend/api/property/images/fetcher';
import { imageAllowedTypes } from 'components/image/allowed-types';
import { ImageFormatType } from 'components/image/format-type';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const locale = backendApiGetLocaleFromReq(req);
  const propertyId = req.query.propertyId as string;
  const imageType = req.query.imageType as ImageFormatType;

  if (!imageAllowedTypes.includes(imageType)) {
    res.status(500);
    res.send({ error: 'invalid imageType' });
    return;
  }

  backendApiPropertyImagesFetcher(locale, [propertyId]).then((response) => {
    if (response.ok) {
      res.send(response.data[propertyId].map((image) => image.links[imageType]));
    } else {
      res.status(500);
      // eslint-disable-next-line no-console
      console.error('property search count failed', response.error);
      res.end();
    }
  });
};
