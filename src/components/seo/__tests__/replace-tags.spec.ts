import { seoReplaceTags } from '../replace-tags';
import { SeoTagEnum } from '../tag.enum';

describe('seoReplaceTags', () => {
  it('should replace the number of listing tag', () => {
    expect(
      seoReplaceTags('Apartments for rent - {number of listings} Flats in Bahrain', {
        [SeoTagEnum.numberOfListings]: '5000',
      })
    ).toEqual('Apartments for rent - 5000 Flats in Bahrain');
  });

  it('should work even if there is no tag', () => {
    expect(seoReplaceTags('This is a string')).toEqual('This is a string');
  });

  it('should remove the tag is data is not given', () => {
    expect(seoReplaceTags('Apartments for rent - {number of listings} Flats in Bahrain')).toEqual(
      'Apartments for rent -  Flats in Bahrain'
    );
  });

  it('should return an empty string if invalid str is passed', () => {
    expect(seoReplaceTags(null as unknown as string)).toEqual('');
    expect(seoReplaceTags(undefined as unknown as string)).toEqual('');
  });
});
