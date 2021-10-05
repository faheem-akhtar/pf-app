import { headersAddCookie } from '../add-cookie';

describe('headersAddCookie', () => {
  it('should handle empty cookie initial state', () => {
    const headers = {};
    headersAddCookie('website_ab_tests', 'test87%3DvariantA', headers);
    expect(headers).toEqual({
      cookie: 'website_ab_tests=test87%3DvariantA',
    });
  });

  it('should handle comma separator', () => {
    const headers = { cookie: 'existing_key=existing_value, existing_key1=existing_value1' };
    headersAddCookie('website_ab_tests', 'test87%3DvariantA', headers);
    expect(headers).toEqual({
      cookie: 'existing_key=existing_value; existing_key1=existing_value1; website_ab_tests=test87%3DvariantA',
    });
  });

  it('should handle existing cookie initial state, when there is no ; on the end', () => {
    const headers = { cookie: 'existing_key=existing_value' };
    headersAddCookie('website_ab_tests', 'test87%3DvariantA', headers);
    expect(headers).toEqual({
      cookie: 'existing_key=existing_value; website_ab_tests=test87%3DvariantA',
    });
  });

  it('should handle existing cookie initial state, when there is ; on the end', () => {
    const headers = { cookie: 'existing_key=existing_value;' };
    headersAddCookie('website_ab_tests', 'test87%3DvariantA', headers);
    expect(headers).toEqual({
      cookie: 'existing_key=existing_value; website_ab_tests=test87%3DvariantA',
    });
  });

  it('should handle existing cookie initial state, when there is ; and space on the end', () => {
    const headers = { cookie: 'existing_key=existing_value; ' };
    headersAddCookie('website_ab_tests', 'test87%3DvariantA', headers);
    expect(headers).toEqual({
      cookie: 'existing_key=existing_value; website_ab_tests=test87%3DvariantA',
    });
  });

  it('should handle existing cookie initial state, when there is no ; but space on the end', () => {
    const headers = { cookie: 'existing_key=existing_value ' };
    headersAddCookie('website_ab_tests', 'test87%3DvariantA', headers);
    expect(headers).toEqual({
      cookie: 'existing_key=existing_value; website_ab_tests=test87%3DvariantA',
    });
  });

  it('should override existing cookie value', () => {
    const headers = { cookie: 'existing_key=existing_value; website_ab_tests=abc; third_key=da ' };
    headersAddCookie('website_ab_tests', 'test87%3DvariantA', headers);
    expect(headers).toEqual({
      cookie: 'existing_key=existing_value; website_ab_tests=test87%3DvariantA; third_key=da',
    });
  });

  it('should filter out invalid cookies', () => {
    const headers = { cookie: 'asdas da ; existing_key=existing_value; website_ab_tests1=; third_key= ; asd' };
    headersAddCookie('website_ab_tests', 'test87%3DvariantA', headers);
    expect(headers).toEqual({
      cookie: 'existing_key=existing_value; website_ab_tests=test87%3DvariantA',
    });
  });
});
