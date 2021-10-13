import { GalleryScrollBrowseEnum } from './browse.enum';
import { galleryScrollComputeItemPositionsXUpdate } from './compute-item-positions-x-update';
import { GalleryScrollDirectionEnum } from './direction.enum';
import { galleryScrollGetBrowseOnUserTouchDown } from './get-browse-on-user-touch-down';
import { galleryScrollGetTouchDirection } from './get-touch-direction';
import { GalleryScrollReducerType } from './reducer.type';
import { GalleryScrollStateInterface } from './state.interface';

type MakeReducerType = (isRtl: boolean, itemsCount: number) => GalleryScrollReducerType;

const DRAG_DELTA_MIN = 10;

export const galleryScrollMakeReducer: MakeReducerType =
  (isRtl, itemsCount) =>
  (state, action): GalleryScrollStateInterface => {
    if (action.type === 'move') {
      if (state.pointerPositionStart !== null) {
        const pointerPositionCurrent = action.positionX;
        const pointerPositionDelta = state.pointerPositionStart - pointerPositionCurrent;

        if (state.initialTouch && action.firstTouchMove) {
          const touchDirection: GalleryScrollDirectionEnum = state.touchDirection
            ? state.touchDirection
            : galleryScrollGetTouchDirection(state.initialTouch, action.firstTouchMove);

          if (!state.touchDirection) {
            state.touchDirection = touchDirection;
          }

          if (
            touchDirection === GalleryScrollDirectionEnum.HORIZONTAL &&
            Math.abs(pointerPositionDelta) > DRAG_DELTA_MIN
          ) {
            return {
              ...state,
              isDragging: true,
              pointerPositionCurrent,
            };
          }
        }

        return {
          ...state,
          pointerPositionCurrent,
        };
      }
    } else if (action.type === 'end') {
      if (state.touchDirection === GalleryScrollDirectionEnum.VERTICAL) {
        return state;
      }

      const { activeIndex, itemsPositionsX } = state;

      if (state.pointerPositionStart !== null && state.pointerPositionCurrent !== null) {
        const pointerPositionDelta = state.pointerPositionStart - state.pointerPositionCurrent;
        const isRtlSign = isRtl ? -1 : 1;
        const indexDelta =
          isRtlSign *
          (state.isDragging
            ? pointerPositionDelta < 0
              ? -1
              : 1
            : state.browse === GalleryScrollBrowseEnum.next
            ? 1
            : -1);
        const newIndex = (((activeIndex + indexDelta) % itemsCount) + itemsCount) % itemsCount;

        return {
          ...state,
          activeIndex: newIndex,
          browse: state.isDragging
            ? indexDelta > 0
              ? GalleryScrollBrowseEnum.next
              : GalleryScrollBrowseEnum.previous
            : state.browse,
          itemsPositionsX: {
            ...itemsPositionsX,
            ...galleryScrollComputeItemPositionsXUpdate(itemsCount, isRtl, newIndex),
          },
          isDragging: false,
          pointerPositionStart: null,
          pointerPositionCurrent: null,
        };
      }
    } else if (action.type === 'start') {
      return {
        ...state,
        isDragging: false,
        pointerPositionStart: action.positionX,
        pointerPositionCurrent: action.positionX,
        browse: galleryScrollGetBrowseOnUserTouchDown(
          isRtl,
          action.positionX,
          (action.galleryRight - action.galleryLeft) / 2
        ),
        isTouched: true,
        ...(action.initialTouch && { initialTouch: action.initialTouch }),
      };
    }

    return state;
  };
