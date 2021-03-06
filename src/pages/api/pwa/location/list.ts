import { NextApiRequest, NextApiResponse } from 'next';
import locations from 'public/static/locations';

import { backendApiGetLocaleFromReq } from 'backend/api/get-locale-from-req';
import { LocationCompactInterface } from 'types/location/compact.interface';

export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.send((locations as Record<string, LocationCompactInterface[]>)[backendApiGetLocaleFromReq(req)]);
};
