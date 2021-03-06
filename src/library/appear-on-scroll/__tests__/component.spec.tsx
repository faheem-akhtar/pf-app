import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { mockElementGetBoundingClientRect } from 'mocks/element/get-bounding-client-rect.mock';
import { mockDocumentBodyClientHeight } from 'mocks/window/document/body-client-height.mock';
import { mockWindowSetTimeout } from 'mocks/window/set-timeout.mock';

import { AppearOnScrollComponent } from '../component';
import { AppearOnScrollComponentPropsInterface } from '../component-props.interface';

const BODY_CLIENT_HEIGHT = 10;
type Observer = (elements: { isIntersecting: boolean }[]) => void;

describe('AppearOnScrollComponent', () => {
  let IntersectionObserverCallback: Observer;

  let defaultProps: AppearOnScrollComponentPropsInterface;

  let flushSetTimeouts: Function;
  let IntersectionObserverDisconnectMock: jest.Mock;

  beforeEach(() => {
    IntersectionObserverDisconnectMock = jest.fn();
    flushSetTimeouts = mockWindowSetTimeout();
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: class ObserverMock {
        constructor(observer: Observer) {
          IntersectionObserverCallback = observer;
        }
        observe = (): null => null;
        disconnect = IntersectionObserverDisconnectMock;
      },
    });

    defaultProps = {
      onEntering: jest.fn(),
      onVisible: jest.fn(),
      onExiting: jest.fn(),
      onHidden: jest.fn(),
      children: <div>Some content</div>,
      showOnlyOnScrollUp: false,
    };
    mockElementGetBoundingClientRect({ y: 1 });
    mockDocumentBodyClientHeight(BODY_CLIENT_HEIGHT);
  });

  describe('animation classes changes', () => {
    const getTemplate = (): Promise<HTMLElement> => {
      return screen.findByTestId('appear-on-scroll-template');
    };
    const assertTemplateStatus: (className: string) => Promise<void> = async (className: string) => {
      const template = await getTemplate();
      expect(template.className).toContain(className);
    };

    it('should pass an animation class to the template', async () => {
      render(<AppearOnScrollComponent {...defaultProps} />);
      await assertTemplateStatus('appear_on_scroll__hidden');
    });

    it('should call onEntering and the onHidden method when wrapper is out of the viewport', async () => {
      render(<AppearOnScrollComponent {...defaultProps} />);

      await act(async () => {
        await IntersectionObserverCallback([{ isIntersecting: false }]);
        await flushSetTimeouts();
      });

      await waitFor(() => {
        expect(defaultProps.onEntering).toHaveBeenCalled();
      });

      expect(defaultProps.onHidden).toHaveBeenCalled();
    });

    it('should call onExiting when wrapper is in the viewport', async () => {
      render(<AppearOnScrollComponent {...defaultProps} />);

      await act(async () => {
        await IntersectionObserverCallback([{ isIntersecting: false }]);
        await flushSetTimeouts();
        await IntersectionObserverCallback([{ isIntersecting: true }]);
        await flushSetTimeouts();
      });

      await waitFor(() => {
        expect(defaultProps.onExiting).toHaveBeenCalled();
      });

      expect(defaultProps.onVisible).toHaveBeenCalled();
    });

    it('should disconnect observer on unmount', () => {
      const { unmount } = render(<AppearOnScrollComponent {...defaultProps} />);
      unmount();
      expect(IntersectionObserverDisconnectMock).toHaveBeenCalled();
    });
  });
});
