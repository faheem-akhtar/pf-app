import { Dispatch, useEffect } from 'react';
import { GalleryScrollActionType } from './action.type';
import { WindowService } from 'services/window/service';

export const useGalleryScrollEffects = (
  isMouseOrTouchDown: boolean,
  dispatch: Dispatch<GalleryScrollActionType>
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

    const onMove = (positionX: number): void => {
      dispatch({ type: 'move', positionX });
    };
    const onEnd = (e: Event): void => {
      e.stopPropagation();
      dispatch({ type: 'end' });
    };

    const onMouseMove = (e: MouseEvent): void => {
      onMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent): void => {
      onMove(e.changedTouches[0].pageX);
    };

    WindowService.addEventListener('contextmenu', disableContextMenu);
    WindowService.addEventListener('mousemove', onMouseMove);
    WindowService.addEventListener('touchmove', onTouchMove);
    WindowService.addEventListener('mouseup', onEnd);
    WindowService.addEventListener('touchend', onEnd);

    return (): void => {
      WindowService.removeEventListener('contextmenu', disableContextMenu);
      WindowService.removeEventListener('mousemove', onMouseMove);
      WindowService.removeEventListener('touchmove', onTouchMove);
      WindowService.removeEventListener('mouseup', onEnd);
      WindowService.removeEventListener('touchend', onEnd);
    };
  });
};
