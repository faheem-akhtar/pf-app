import { Dispatch, useEffect } from 'react';

import { WindowService } from 'services/window/service';

import { GalleryScrollActionType } from './action.type';

export const useGalleryScrollEffects = (
  isMouseOrTouchDown: boolean,
  dispatch: Dispatch<GalleryScrollActionType>,
  isDragging: boolean,
  onGalleryClick: Function
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

    const onMove = (positionX: number, firstTouchMove?: { positionX: number; positionY: number }): void => {
      dispatch({ type: 'move', positionX, firstTouchMove });
    };
    const onEnd = (e: Event): void => {
      e.stopPropagation();
      // Prevent dragging and keeps the active position when the click is triggered
      if (!isDragging) {
        onGalleryClick();
        return;
      }

      dispatch({ type: 'end' });
    };

    const onMouseMove = (e: MouseEvent): void => {
      onMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent): void => {
      const firstTouchMove = { positionX: e.touches[0].clientX, positionY: e.touches[0].clientY };
      onMove(e.changedTouches[0].pageX, firstTouchMove);
    };
    const onTouchEnd = (e: TouchEvent): void => {
      // we should prevent default because otherwise it will trigger mouse down right after touchend
      e.preventDefault();
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
