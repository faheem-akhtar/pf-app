import { mockReactUseEffect } from 'mocks/react/mock-use-effect';
import { mockReactUseState } from 'mocks/react/mock-use-state';
import { mockReactUseSwr } from 'mocks/react/mock-use-swr';

import { ApiMakeSwrFactory } from 'api/make-swr-factory';
import { JwtTokenStore } from 'services/jwt/token/store';

describe('ApiMakeSwrFactory', () => {
  it('should use origin from window', () => {
    mockReactUseState();
    mockReactUseEffect();
    const swrResult = { ok: true, data: { a: 1 } };
    mockReactUseSwr(swrResult);
    global.origin = 'test.origin';
    const swrFactory = ApiMakeSwrFactory({ requireAuth: false });
    const hook = swrFactory({
      method: 'GET',
      url: 'testurl',
    });

    const result = hook({});

    expect(result).toEqual(swrResult);
  });

  it('should not make a call when auth is true but there is not token in local storage', () => {
    mockReactUseState();
    mockReactUseEffect();
    const swrResult = { ok: true, data: { a: 1 } };
    mockReactUseSwr(swrResult);
    global.origin = 'test.origin';
    const swrFactory = ApiMakeSwrFactory({ requireAuth: true, jwtTokenService: new JwtTokenStore() });
    const hook = swrFactory({
      method: 'GET',
      url: 'testurl',
    });

    const result = hook({});

    expect(result).toEqual({ ok: null });
  });
});
