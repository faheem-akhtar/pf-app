import { Dispatch, useEffect } from 'react';

import { WindowService } from 'services/window/service';

import { GalleryScrollActionType } from './action.type';

export const useGalleryScrollEffects = (
  isMouseOrTouchDown: boolean,
  dispatch: Dispatch<GalleryScrollActionType>,
  isClickLike: boolean,
  onClick: () => void
): void => {
  useEffect(() => {
    if (!isMouseOrTouchDown) {
      return;
    }

    const disableContextMenu = (e: Event): boolean => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const onMove = (positionX: number, positionY: number): void => {
      dispatch({ type: 'move', positionX, positionY });
    };
    const onEnd = (e: Event): void => {
      e.stopPropagation();

      dispatch({ type: 'end' });
    };

    const onMouseMove = (e: MouseEvent): void => {
      onMove(e.clientX, e.clientY);
    };
    const onTouchMove = (e: TouchEvent): void => {
      onMove(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
    };
    const onTouchEnd = (e: TouchEvent): void => {
      if (isClickLike) {
        onClick();
      }
      // we should prevent default because otherwise it will trigger mouse down right after touchend
      if (e.cancelable) {
        e.preventDefault();
      }
      onEnd(e);
    };

    WindowService.addEventListener('contextmenu', disableContextMenu);
    WindowService.addEventListener('mousemove', onMouseMove);
    WindowService.addEventListener('touchmove', onTouchMove);
    WindowService.addEventListener('mouseup', onEnd);
    WindowService.addEventListener('touchend', onTouchEnd);

    return (): void => {
      WindowService.removeEventListener('contextmenu', disableContextMenu);
      WindowService.removeEventListener('mousemove', onMouseMove);
      WindowService.removeEventListener('touchmove', onTouchMove);
      WindowService.removeEventListener('mouseup', onEnd);
      WindowService.removeEventListener('touchend', onTouchEnd);
    };
  });
};
