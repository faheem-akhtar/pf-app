import { tealiumServiceStub } from 'stubs/tealium/service.stub';
import { userModelStub } from 'stubs/user/model.stub';

import { UserInterface } from 'components/user/interface';

import { TealiumEventEnum } from '../event.enum';
import { TealiumEventCategoryEnum } from '../event-category.enum';
import { tealiumUserEventTracker } from '../user-event-tracker';

describe('tealiumUserEventTracker', () => {
  let userModel: UserInterface;
  beforeEach(() => {
    window.utag = tealiumServiceStub();
    window.tealium = { page_type: 'page_type', page_currency: 'AED' };
    userModel = userModelStub();
  });

  it('should call user_login tealium event', () => {
    tealiumUserEventTracker.onLoginWithEmail(userModel);
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.userLogin,
        event_category: TealiumEventCategoryEnum.user,
        event_label: 'email',
        user_email: userModel.email,
        user_id: userModel.userId,
      })
    );
  });

  it('should call user_login tealium event with google event_label', () => {
    tealiumUserEventTracker.onLoginWithGoogle(userModel);
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.userLogin,
        event_category: TealiumEventCategoryEnum.user,
        event_label: 'google',
        user_email: userModel.email,
        user_id: userModel.userId,
      })
    );
  });

  it('should call user_login tealium event with facebook event_label', () => {
    tealiumUserEventTracker.onLoginWithFacebook(userModel);
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.userLogin,
        event_category: TealiumEventCategoryEnum.user,
        event_label: 'facebook',
        user_email: userModel.email,
        user_id: userModel.userId,
      })
    );
  });

  it('should call user_register tealium event', () => {
    tealiumUserEventTracker.onRegisterWithEmail(userModel);
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.userRegister,
        event_category: TealiumEventCategoryEnum.user,
        user_email: userModel.email,
        user_id: userModel.userId,
      })
    );
  });

  it('should call user_logout tealium event', () => {
    tealiumUserEventTracker.onLogout(userModel);
    expect(window.utag.link).toHaveBeenCalledWith(
      expect.objectContaining({
        tealium_event: TealiumEventEnum.userLogout,
        event_category: TealiumEventCategoryEnum.user,
        user_email: userModel.email,
        user_id: userModel.userId,
      })
    );
  });
});
