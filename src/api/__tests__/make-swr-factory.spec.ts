import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { mockReactUseState } from 'mocks/react/use-state.mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';

import { ApiMakeSwrFactory } from 'api/make-swr-factory';
import { JwtTokenStore } from 'services/jwt/token/store';

describe('ApiMakeSwrFactory', () => {
  it('should use origin from window', () => {
    mockReactUseState();
    mockReactUseEffect();
    const swrResult = { ok: true, data: { a: 1 } };
    mockReactUseSwr('en-testurl-GET', swrResult);
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
    mockReactUseSwr('en-testurl-GET', swrResult);
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
