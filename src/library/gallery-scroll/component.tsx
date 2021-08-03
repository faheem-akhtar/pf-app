import { useReducer, useRef, useState } from 'react';

import { functionNoop } from 'helpers/function/noop';
import { galleryScrollGetSlidingStyles } from './get-sliding-styles';
import { galleryScrollMakeInitialState } from './make-initial-state';
import { galleryScrollMakeReducer } from './make-reducer';
import { useGalleryScrollEffects } from './effects.hook';

import { GalleryScrollComponentPropsInterface } from './component-props.interface';
import { GalleryScrollTemplate } from './template';

export const GalleryScrollComponent = (props: GalleryScrollComponentPropsInterface): JSX.Element => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const numberOfImages = props.items.length;
  const [reducer] = useState(() => galleryScrollMakeReducer(props.isRtl, numberOfImages));
  const [initialReducerState] = useState(() => galleryScrollMakeInitialState(props.items, props.isRtl));

  const [state, dispatch] = useReducer(reducer, initialReducerState);
  useGalleryScrollEffects(state.pointerPositionStart !== null, dispatch);

  const onStart = (positionX: number): void => {
    if (!galleryRef.current) {
      return;
    }
    const galleryRect = galleryRef.current.getBoundingClientRect();

    dispatch({
      type: 'start',
      positionX,
      galleryLeft: galleryRect.left,
      galleryRight: galleryRect.right,
    });
  };

  const hasMultipleImages = numberOfImages > 1;

  const itemsToRender = props.items.map((item, i) => ({
    ...item,
    style: hasMultipleImages ? galleryScrollGetSlidingStyles(state, i, numberOfImages) : null,
  }));

  return (
    <GalleryScrollTemplate
      containerRef={galleryRef}
      className={props.className}
      onMouseDown={
        hasMultipleImages
          ? (e): void => {
              e.preventDefault();
              onStart(e.clientX);
              props.onTouch();
            }
          : functionNoop
      }
      onTouchStart={
        hasMultipleImages
          ? (e): void => {
              onStart(e.changedTouches[0].pageX);
              props.onTouch();
            }
          : functionNoop
      }
      items={itemsToRender}
      isTouched={state.isTouched}
      activeIndex={state.activeIndex}
    />
  );
};
