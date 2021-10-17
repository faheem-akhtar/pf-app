import { AnalyticsTealiumService } from 'services/analytics/tealium.service';
import { UserModelInterface } from 'services/user/model.interface';

export const tealiumUserEventTracker = {
  onLoginWithFacebook: (user: UserModelInterface): void => {
    AnalyticsTealiumService.onUserLoggedIn(
      {
        user_email: user.email,
        user_id: user.userId,
        user_status: 'Logged In',
      },
      'facebook'
    );
  },
  onLoginWithEmail: (user: UserModelInterface): void => {
    AnalyticsTealiumService.onUserLoggedIn(
      {
        user_email: user.email,
        user_id: user.userId,
        user_status: 'Logged In',
      },
      'email'
    );
  },
  onLoginWithGoogle: (user: UserModelInterface): void => {
    AnalyticsTealiumService.onUserLoggedIn(
      {
        user_email: user.email,
        user_id: user.userId,
        user_status: 'Logged In',
      },
      'google'
    );
  },
  onRegisterWithEmail: (user: UserModelInterface): void => {
    AnalyticsTealiumService.onUserRegistered({
      user_email: user.email,
      user_id: user.userId,
      user_status: 'Logged In',
    });
  },
  onLogout: (user: UserModelInterface | null): void => {
    if (user) {
      AnalyticsTealiumService.onUserLoggedOut({
        user_email: user.email,
        user_id: user.userId,
        user_status: 'Not Logged In',
      });
    }
  },
};
