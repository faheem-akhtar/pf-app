import { PageTypeEnum } from 'enums/page-type/enum';

import { PropertyTracker } from './tracker';

let propertyTracker: PropertyTracker;

export function PropertyTrackerFactory(pageType?: PageTypeEnum): PropertyTracker {
  if (!propertyTracker) {
    propertyTracker = new PropertyTracker(pageType || ('' as PageTypeEnum));
  }
  return propertyTracker;
}
