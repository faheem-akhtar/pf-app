import { SeoTagEnum } from './tag.enum';

const mapTagsWithDataKey: Record<string, SeoTagEnum> = {
  '{number of listings}': SeoTagEnum.numberOfListings,
};

/**
 * Replace tags with the dynamic data
 * @example {number of listings} Flats in Bahrain => 5000 Flats in Bahrain
 */
export const seoReplaceTags = (str: string, data: Partial<Record<SeoTagEnum, string>> = {}): string =>
  Object.entries(mapTagsWithDataKey).reduce((acc, [key, value]) => acc.replace(key, data[value] || ''), str || '');
