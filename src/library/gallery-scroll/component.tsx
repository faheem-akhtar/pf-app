import { useEffect, useReducer, useRef, useState } from 'react';

import { functionNoop } from 'helpers/function/noop';

import { GalleryScrollComponentPropsInterface } from './component-props.interface';
import { useGalleryScrollEffects } from './effects.hook';
import { galleryScrollGetSlidingStyles } from './get-sliding-styles';
import { galleryScrollMakeInitialState } from './make-initial-state';
import { galleryScrollMakeReducer } from './make-reducer';
import { GalleryScrollTemplate } from './template';

export const GalleryScrollComponent = (props: GalleryScrollComponentPropsInterface): JSX.Element => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const { className, items, isRtl, objectFit, onActiveIndexChange = functionNoop, onTouch = functionNoop } = props;
  const numberOfImages = items.length;
  const [reducer] = useState(() => galleryScrollMakeReducer(isRtl, numberOfImages));
  const [initialReducerState] = useState(() => galleryScrollMakeInitialState(items, isRtl));

  const [state, dispatch] = useReducer(reducer, initialReducerState);
  useGalleryScrollEffects(state.pointerPositionStart !== null, dispatch);

  const { activeIndex } = state;

  useEffect(() => {
    onActiveIndexChange(activeIndex);
  }, [onActiveIndexChange, activeIndex]);

  const onStart = (positionX: number, initialTouch?: { positionX: number; positionY: number }): void => {
    const galleryRect = (galleryRef.current as HTMLDivElement).getBoundingClientRect();

    dispatch({
      type: 'start',
      positionX,
      galleryLeft: galleryRect.left,
      galleryRight: galleryRect.right,
      initialTouch,
    });
  };

  const hasMultipleImages = numberOfImages > 1;

  const itemsToRender = items.map((item, i) => ({
    ...item,
    style: hasMultipleImages ? galleryScrollGetSlidingStyles(state, i, numberOfImages) : {},
  }));

  return (
    <GalleryScrollTemplate
      containerRef={galleryRef}
      className={className}
      onMouseDown={
        hasMultipleImages
          ? (e): void => {
              e.preventDefault();
              onStart(e.clientX);
              onTouch();
            }
          : functionNoop
      }
      onTouchStart={
        hasMultipleImages
          ? (e): void => {
              const initialTouch = { positionX: e.touches[0].clientX, positionY: e.touches[0].clientY };
              onStart(e.changedTouches[0].pageX, initialTouch);
              onTouch();
            }
          : functionNoop
      }
      items={itemsToRender}
      isTouched={state.isTouched}
      activeIndex={state.activeIndex}
      objectFit={objectFit}
      isRtl={isRtl}
    />
  );
};
