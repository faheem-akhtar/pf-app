import { useEffect, useRef, useState } from 'react';

import { ElementService } from 'services/element/service';

import { AppearOnScrollComponentPropsInterface } from './component-props.interface';
import { appearOnScrollObserve } from './observe';
import { appearOnScrollOnStatusChange } from './on-status-change';
import { appearOnScrollOnVisibilityChange } from './on-visibility-change';
import { AppearOnScrollStatusEnum } from './status.enum';
import { AppearOnScrollTemplate } from './template';

export const AppearOnScrollComponent = (props: AppearOnScrollComponentPropsInterface): JSX.Element => {
  const wrapper = useRef<HTMLDivElement>(null);
  const prevStatusRef = useRef<AppearOnScrollStatusEnum | null>(null);
  const [status, setStatus] = useState<AppearOnScrollStatusEnum | null>(null);

  // On mount
  useEffect(() => {
    const element = wrapper.current as HTMLDivElement;

    const wrapperClientRec = ElementService.getBoundingClientRect(element);
    const wrapperInView = wrapperClientRec.y >= 0 && wrapperClientRec.y < document.body.clientHeight;
    // set the initial status on mount
    setStatus(wrapperInView ? AppearOnScrollStatusEnum.WRAPPER_IN_VIEW : AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW);

    // observe the target element, when it's visibility change - call onVisibilityChange
    return appearOnScrollObserve(element, (visible) => appearOnScrollOnVisibilityChange(visible, setStatus));
  }, []);

  if (prevStatusRef.current !== status) {
    appearOnScrollOnStatusChange(props, status);
  }
  prevStatusRef.current = status;

  return (
    <div ref={wrapper}>
      <AppearOnScrollTemplate status={status} className={props.className}>
        {props.children}
      </AppearOnScrollTemplate>
    </div>
  );
};
