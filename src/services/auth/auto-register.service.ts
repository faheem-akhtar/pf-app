import { apiAuthAutoRegisterFetcher } from 'api/auth/auto-register/fetcher';
import { ApiAuthAutoRegisterRequestInterface } from 'api/auth/auto-register/request.interface';
import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import { UserInterface } from 'components/user/interface';
import { AuthService } from 'services/auth/service';

import { AuthSubscribeEventTypeEnum } from './subscribe-event-type.enum';

/**
 * Auto register user
 */
export const AuthAutoRegisterService = (
  model: ApiAuthAutoRegisterRequestInterface
): Promise<UserInterface | ApiFetcherResultFailureInterface> =>
  apiAuthAutoRegisterFetcher({
    first_name: model.first_name,
    last_name: model.last_name,
    email: model.email,
    phone: model.phone,
  }).then((response) => {
    if (!response.ok) {
      return response;
    }

    AuthService.onAuthResolved(response.data, AuthSubscribeEventTypeEnum.register, 'Email');
    return response.data.user;
  });
