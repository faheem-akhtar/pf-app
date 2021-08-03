import { GalleryScrollBrowseEnum } from './browse.enum';
import { galleryScrollComputeItemPositionsXUpdate } from './compute-item-positions-x-update';
import { galleryScrollGetBrowseOnUserTouchDown } from './get-browse-on-user-touch-down';
import { GalleryScrollReducerType } from './reducer.type';
import { GalleryScrollStateInterface } from './state.interface';

type MakeReducerType = (isRtl: boolean, itemsCount: number) => GalleryScrollReducerType;

export const galleryScrollMakeReducer: MakeReducerType =
  (isRtl, itemsCount) =>
  (state, action): GalleryScrollStateInterface => {
    if (action.type === 'move') {
      if (state.pointerPositionStart !== null) {
        const pointerPositionCurrent = action.positionX;
        const pointerPositionDelta = state.pointerPositionStart - pointerPositionCurrent;

        if (Math.abs(pointerPositionDelta) > 10) {
          return {
            ...state,
            isDragging: true,
            pointerPositionCurrent,
          };
        }

        return {
          ...state,
          pointerPositionCurrent,
        };
      }
    } else if (action.type === 'end') {
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
      };
    }

    return state;
  };
