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
      if (state.pointerPositionStartX !== null && state.pointerPositionStartY !== null) {
        const pointerPositionCurrentX = action.positionX;
        const pointerPositionDelta = state.pointerPositionStartX - pointerPositionCurrentX;

        const scrollDirection = state.scrollDirection
          ? state.scrollDirection
          : galleryScrollGetTouchDirection({
              pointerPositionStartX: state.pointerPositionStartX,
              pointerPositionStartY: state.pointerPositionStartY,
              pointerPositionSecondX: action.positionX,
              pointerPositionSecondY: action.positionY,
            });

        const nextState = {
          ...state,
          pointerPositionCurrentX,
          scrollDirection,
        };

        if (
          scrollDirection === GalleryScrollDirectionEnum.HORIZONTAL &&
          Math.abs(pointerPositionDelta) > DRAG_DELTA_MIN
        ) {
          return {
            ...nextState,
            isDragging: true,
          };
        }

        return nextState;
      }
    } else if (action.type === 'end') {
      if (
        state.scrollDirection === GalleryScrollDirectionEnum.VERTICAL ||
        state.pointerPositionCurrentX === null ||
        state.pointerPositionCurrentX === state.pointerPositionStartX
      ) {
        return {
          ...state,
          isDragging: false,
          pointerPositionStartX: null,
          pointerPositionCurrentX: null,
        };
      }

      const { activeIndex, itemsPositionsX } = state;

      if (state.pointerPositionStartX !== null && state.pointerPositionCurrentX !== null) {
        const pointerPositionDelta = state.pointerPositionStartX - state.pointerPositionCurrentX;
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
          pointerPositionStartX: null,
          pointerPositionCurrentX: null,
        };
      }
    } else if (action.type === 'start') {
      return {
        ...state,
        isDragging: false,
        pointerPositionStartX: action.positionX,
        pointerPositionCurrentX: action.positionX,
        pointerPositionStartY: action.positionY,
        scrollDirection: null,
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
