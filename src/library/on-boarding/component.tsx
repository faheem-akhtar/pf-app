import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useRef, useState } from 'react';

import { functionNoop } from 'helpers/function/noop';
import { useOnBoardingStorage } from 'helpers/on-boarding/storage.hook';
import { useWindowMouseDown } from 'helpers/window/mouse-down.hook';
import { WindowService } from 'services/window/service';

import { OnBoardingComponentPropsInterface } from './component-props.interface';
import { OnBoardingPlacementEnum } from './placement.enum';
import { ON_BOARDING_STORAGE_KEY } from './storage-key.constant';
import { OnBoardingTemplate } from './template';
import { OnBoardingTemplatePropsInterface } from './template-props.interface';

const makeOnBoardingLocalStorageKey = (locale: string): string => `${locale}_${ON_BOARDING_STORAGE_KEY}`;

export const OnBoardingComponent: FunctionComponent<OnBoardingComponentPropsInterface> = ({
  placement = OnBoardingPlacementEnum.bottom,
  name,
  prerequisiteName,
  onClose = functionNoop,
  ...props
}) => {
  const rootRef = useRef(null);
  const locale = useRouter().locale as string;
  const localStorageKey = makeOnBoardingLocalStorageKey(locale);
  const { hasBeenClosedMap, mutate } = useOnBoardingStorage(localStorageKey);
  const hasBeenClosed = hasBeenClosedMap[name];
  const [canRenderTooltip, setRenderTooltip] = useState(false);
  let isVisible = false;

  if (prerequisiteName) {
    isVisible = hasBeenClosedMap[prerequisiteName] && !hasBeenClosed && canRenderTooltip;
  } else {
    isVisible = !hasBeenClosed && canRenderTooltip;
  }

  const handleClose: OnBoardingTemplatePropsInterface['onClose'] = () => {
    WindowService.localStorage.setItem(localStorageKey, {
      ...((WindowService.localStorage.getItem(localStorageKey) as object) || {}),
      [name]: true,
    });

    mutate();
    onClose();
  };

  useEffect(() => {
    setRenderTooltip(true);
  }, []);

  useWindowMouseDown({
    shouldListen: isVisible,
    ignoreElementRef: rootRef,
    onWindowMouseDown: () => {
      handleClose();
      isVisible = false;
    },
  });

  return (
    <OnBoardingTemplate rootRef={rootRef} placement={placement} visible={isVisible} onClose={handleClose} {...props}>
      {props.children}
    </OnBoardingTemplate>
  );
};
