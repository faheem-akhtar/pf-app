import { apiAuthAutoRegisterFetcher } from 'api/auth/auto-register/fetcher';
import { ApiAuthAutoRegisterRequestInterface } from 'api/auth/auto-register/request.interface';
import { ApiFetcherResultFailureInterface } from 'api/fetcher-result-failure.interface';
import AuthService from 'services/auth/service';
import { UserModelInterface } from 'services/user/model.interface';

/**
 * Auto register user
 */
export const AuthAutoRegisterService = (
  model: ApiAuthAutoRegisterRequestInterface
): Promise<UserModelInterface | ApiFetcherResultFailureInterface> =>
  apiAuthAutoRegisterFetcher({
    first_name: model.first_name,
    last_name: model.last_name,
    email: model.email,
    phone: model.phone,
  })
    .then((model) => {
      if (!model.ok) {
        return AuthService.onAutoRegistrationRejected(model);
      }

      AuthService.onAuthResolved(model);
      return model.data.user;
    })
    .catch(AuthService.onAutoRegistrationRejected);
