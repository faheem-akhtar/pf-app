import { useEffect, useRef, useState } from 'react';

import { propertySerpStickyHeaderHeight } from 'constants/property/serp/sticky-header-height';
import { usePrevious } from 'hooks/previous.hook';
import { useScrollDirection } from 'hooks/scroll-direction.hook';
import { HooksScrollDirectionEnum } from 'hooks/scroll-direction/enum';
import { ElementService } from 'services/element/service';

import { AppearOnScrollComponentPropsInterface } from './component-props.interface';
import { appearOnScrollObserve } from './observe';
import { appearOnScrollOnStatusChange } from './on-status-change';
import { appearOnScrollOnVisibilityChange } from './on-visibility-change';
import { AppearOnScrollStatusEnum } from './status.enum';
import { AppearOnScrollTemplate } from './template';

export const AppearOnScrollComponent = ({
  showOnlyOnScrollUp = false,
  className,
  children,
  ...restProps
}: AppearOnScrollComponentPropsInterface): JSX.Element => {
  const wrapper = useRef<HTMLDivElement>(null);

  const [wrapperInView, setWrapperInView] = useState<boolean | null>(() => null);
  const previousWrapperInView = usePrevious(wrapperInView);

  const [status, setStatus] = useState<AppearOnScrollStatusEnum | null>(null);
  const scrollDirection = useScrollDirection({ thresholdPixels: propertySerpStickyHeaderHeight });

  // On mount
  useEffect(
    () => {
      const element = wrapper.current as HTMLDivElement;

      const wrapperClientRec = ElementService.getBoundingClientRect(element);
      const wrapperInView = wrapperClientRec.y >= 0 && wrapperClientRec.y < document.body.clientHeight;
      // set the initial status on mount
      setStatus(
        wrapperInView ? AppearOnScrollStatusEnum.WRAPPER_IN_VIEW : AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW
      );

      // observe the target element, when it's visibility change - call onVisibilityChange
      return appearOnScrollObserve(element, (isVisible) => {
        setWrapperInView(isVisible);
        appearOnScrollOnVisibilityChange({
          wrapperIsVisible: isVisible,
          setStatus,
          scrollDirection,
          showOnlyOnScrollUp,
        });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Effect dependant on scroll
  useEffect(() => {
    // Check for the scroll only when the wrapper is not in the viewport
    if (!showOnlyOnScrollUp || wrapperInView) {
      return;
    }

    // When scrolling up show the content
    if (scrollDirection === HooksScrollDirectionEnum.UP) {
      if (status === AppearOnScrollStatusEnum.WRAPPER_IN_VIEW) {
        setStatus(AppearOnScrollStatusEnum.ENTERING);
      }
    }
    // When scrolling down hide the content once again
    else if (status === AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW) {
      setStatus(AppearOnScrollStatusEnum.EXITING);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollDirection]);

  useEffect(() => {
    // Change only if status has value
    if (!status) {
      return;
    }

    if (!showOnlyOnScrollUp) {
      if (wrapperInView) {
        // The wrapper is visible therefore the content will disappear
        if (status === AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW) {
          setStatus(AppearOnScrollStatusEnum.EXITING);
        }
      }
      //  The wrapper is not visible so we should show the content
      else if (status === AppearOnScrollStatusEnum.WRAPPER_IN_VIEW) {
        setStatus(AppearOnScrollStatusEnum.ENTERING);
      }
      /* 
      When showOnlyOnScrollUp is enabled
      it checks if the wrapper was not previously visible, meaning that the content was visible
      */
    } else if (previousWrapperInView === false) {
      setStatus(AppearOnScrollStatusEnum.EXITING);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wrapperInView]);

  useEffect(
    () => {
      if (status) {
        appearOnScrollOnStatusChange(restProps, status);
      }

      if (status === AppearOnScrollStatusEnum.ENTERING || status === AppearOnScrollStatusEnum.EXITING) {
        setTimeout(() => {
          if (status === AppearOnScrollStatusEnum.ENTERING) {
            // When wrapper is not in the viewport, the component is
            setStatus(AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW);
          } else {
            // When wrapper is in the viewport, the component isn't
            setStatus(AppearOnScrollStatusEnum.WRAPPER_IN_VIEW);
          }
        }, 200);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status]
  );

  return (
    <div ref={wrapper}>
      <AppearOnScrollTemplate status={status} className={className}>
        {children}
      </AppearOnScrollTemplate>
    </div>
  );
};
