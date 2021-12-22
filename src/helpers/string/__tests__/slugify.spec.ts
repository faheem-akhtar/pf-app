import { stringSlugify } from '../slugify';

describe('stringSlugify()', () => {
  it('should conver string into uri slug', () => {
    expect(stringSlugify('Bulk     Sale    Unit')).toEqual('bulk-sale-unit');
    expect(stringSlugify('Hotel & Hotel Apartment')).toEqual('hotel-hotel-apartment');
    expect(stringSlugify('bulk-Sale- Unit')).toEqual('bulk-sale-unit');
  });
});
