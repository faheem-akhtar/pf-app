import { appearOnScrollMakeStatusUpdater } from '../make-status-updater';
import { AppearOnScrollStatusEnum } from '../status.enum';

describe('appearOnScrollMakeStatusUpdater', () => {
  it('should return same status if status is already at final animation state', () => {
    const updater = appearOnScrollMakeStatusUpdater({
      afterAnimationStatus: AppearOnScrollStatusEnum.WRAPPER_IN_VIEW,
      animationStatus: AppearOnScrollStatusEnum.EXITING,
      setStatus: jest.fn(),
    });

    expect(updater(AppearOnScrollStatusEnum.WRAPPER_IN_VIEW)).toBe(AppearOnScrollStatusEnum.WRAPPER_IN_VIEW);
  });
});
