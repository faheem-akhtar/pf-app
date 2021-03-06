import { useEffect, useReducer, useRef, useState } from 'react';

import { functionNoop } from 'helpers/function/noop';
import { usePrevious } from 'hooks/previous.hook';

import { GalleryScrollComponentPropsInterface } from './component-props.interface';
import { GalleryScrollDirectionEnum } from './direction.enum';
import { useGalleryScrollEffects } from './effects.hook';
import { galleryScrollGetSlidingStyles } from './get-sliding-styles';
import { galleryScrollMakeInitialState } from './make-initial-state';
import { galleryScrollMakeReducer } from './make-reducer';
import { GalleryScrollTemplate } from './template';

export const GalleryScrollComponent = (props: GalleryScrollComponentPropsInterface): JSX.Element => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const {
    className,
    items,
    isRtl,
    objectFit,
    cardType,
    onActiveIndexChange = functionNoop,
    onTouch = functionNoop,
    onClick = functionNoop,
    onDrag = functionNoop,
  } = props;
  const numberOfImages = items.length;
  const [reducer] = useState(() => galleryScrollMakeReducer(isRtl, numberOfImages));
  const [initialReducerState] = useState(() => galleryScrollMakeInitialState(items, isRtl));

  const [state, dispatch] = useReducer(reducer, initialReducerState);
  useGalleryScrollEffects(
    state.pointerPositionStartX !== null,
    dispatch,
    state.pointerPositionCurrentX === null ||
      (state.pointerPositionCurrentX === state.pointerPositionStartX &&
        state.scrollDirection !== GalleryScrollDirectionEnum.VERTICAL),
    onClick
  );

  const { activeIndex } = state;

  const prevActiveIndex = usePrevious(activeIndex);
  if (prevActiveIndex !== undefined && prevActiveIndex !== activeIndex) {
    // should use setTimeout, otherwise callback code can not use react setState
    setTimeout(() => onActiveIndexChange(activeIndex, numberOfImages));
  }

  const onStart = (positionX: number, positionY: number): void => {
    const galleryRect = (galleryRef.current as HTMLDivElement).getBoundingClientRect();

    dispatch({
      type: 'start',
      positionX,
      positionY,
      galleryLeft: galleryRect.left,
      galleryRight: galleryRect.right,
    });
  };

  const hasMultipleImages = numberOfImages > 1;

  const itemsToRender = items.map((item, i) => ({
    ...item,
    style: hasMultipleImages ? galleryScrollGetSlidingStyles(state, i, numberOfImages) : {},
  }));

  useEffect(() => {
    if (state.isDragging) {
      onDrag();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isDragging]);

  return (
    <GalleryScrollTemplate
      containerRef={galleryRef}
      className={className}
      onMouseDown={(e): void => {
        e.preventDefault();
        onStart(e.clientX, e.clientY);
        onTouch();
      }}
      onTouchStart={(e): void => {
        onStart(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
        onTouch();
      }}
      items={itemsToRender}
      isTouched={state.isTouched}
      activeIndex={state.activeIndex}
      objectFit={objectFit}
      isRtl={isRtl}
      cardType={cardType}
    />
  );
};
