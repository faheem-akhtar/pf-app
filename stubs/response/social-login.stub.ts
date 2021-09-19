import { ApiAuthSocialLoginResponseInterface } from 'api/auth/social-login/response.interface';

export const responseSocialLoginStub = (): ApiAuthSocialLoginResponseInterface => ({
  data: {
    id: '1',
    meta: {
      refresh_token: 'refresh token',
      token: 'token',
    },
    relationships: {
      user: {
        data: {
          id: '1',
          type: 'type',
        },
      },
    },
    type: 'type',
  },
  included: [
    {
      attributes: {
        email: 'test@propertyfinder.ae',
        first_name: 'first name',
        image: 'image',
        last_name: 'last_name',
        phone: 'phone',
      },
      id: 'id',
      type: 'type',
    },
  ],
});
