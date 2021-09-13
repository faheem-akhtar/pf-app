export interface ApiAuthAutoRegisterResponseInterface {
  data: {
    id: string;
    meta: {
      refresh_token: string;
      token: string;
    };
    relationships: {
      user: {
        data: {
          id: string;
          type: string;
        };
      };
    };
    type: string;
  };
  included: [
    {
      attributes: {
        email: string;
        first_name: string;
        image: string;
        last_name: string;
        phone: string;
      };
      id: string;
      type: string;
    }
  ];
}
