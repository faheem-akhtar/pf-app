/**
 * @jest-environment jsdom
 */

import { shallow, ShallowWrapper } from 'enzyme';

import { AppearOnScrollComponent } from '../component';
import { AppearOnScrollComponentPropsInterface } from '../component-props.interface';
import { AppearOnScrollStatusEnum } from '../status.enum';
import { AppearOnScrollTemplate } from '../template';
import { AppearOnScrollTemplatePropsInterface } from '../template-props.interface';
import { mockDocumentBodyClientHeight } from 'mocks/mock/document-body-client-height';
import { mockElementGetBoundingClientRect } from 'mocks/mock/element-get-bounding-client-rect';
import { mockSetTimeout } from 'mocks/mock/set-timeout';

const BODY_CLIENT_HEIGHT = 10;
type Observer = (elements: { isIntersecting: boolean }[]) => void;

describe('AppearOnScrollComponent', () => {
  let IntersectionObserverCallback: Observer;
  let wrapper: ShallowWrapper;

  let defaultProps: AppearOnScrollComponentPropsInterface;

  let flushSetTimeouts: Function;
  let IntersectionObserverDisconnectMock: jest.Mock;

  beforeEach(() => {
    IntersectionObserverDisconnectMock = jest.fn();
    flushSetTimeouts = mockSetTimeout();
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

    mockElementGetBoundingClientRect({ y: 1 });
    mockDocumentBodyClientHeight(BODY_CLIENT_HEIGHT);

    defaultProps = {
      onEntering: jest.fn(),
      onVisible: jest.fn(),
      onExiting: jest.fn(),
      onHidden: jest.fn(),
      children: 'Some content',
    };

    wrapper = shallow(<AppearOnScrollComponent {...defaultProps} />);
  });

  describe('animation classes changes', () => {
    const getTemplate = (): ShallowWrapper<AppearOnScrollTemplatePropsInterface> =>
      wrapper.find(AppearOnScrollTemplate);

    const assertTemplateStatus: (status: AppearOnScrollStatusEnum) => void = (status) =>
      expect((getTemplate().props() as AppearOnScrollTemplatePropsInterface).status).toEqual(status);

    it('should pass an animation class to the template', () => {
      expect(getTemplate().props() as AppearOnScrollTemplatePropsInterface).toEqual({
        className: undefined,
        children: defaultProps.children,
        status: AppearOnScrollStatusEnum.WRAPPER_IN_VIEW,
      });
    });

    it('should call onEntering method when wrapper is out of the viewport', async () => {
      mockElementGetBoundingClientRect({ y: BODY_CLIENT_HEIGHT });
      wrapper = shallow(<AppearOnScrollComponent {...defaultProps} />);

      assertTemplateStatus(AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW);
    });

    it('should call onEntering method when wrapper is out of the viewport', async () => {
      assertTemplateStatus(AppearOnScrollStatusEnum.WRAPPER_IN_VIEW);
      IntersectionObserverCallback([{ isIntersecting: false }]);
      assertTemplateStatus(AppearOnScrollStatusEnum.ENTERING);
      flushSetTimeouts();
      assertTemplateStatus(AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW);
      expect(defaultProps.onEntering).toHaveBeenCalled();
    });

    it('should call onVisible method when wrapper is out of the viewport after the timeout', async () => {
      assertTemplateStatus(AppearOnScrollStatusEnum.WRAPPER_IN_VIEW);
      IntersectionObserverCallback([{ isIntersecting: false }]);
      assertTemplateStatus(AppearOnScrollStatusEnum.ENTERING);
      flushSetTimeouts();
      assertTemplateStatus(AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW);
      expect(defaultProps.onVisible).toHaveBeenCalled();
    });

    it('should call onExiting when wrapper is in the viewport', async () => {
      assertTemplateStatus(AppearOnScrollStatusEnum.WRAPPER_IN_VIEW);
      IntersectionObserverCallback([{ isIntersecting: false }]);
      assertTemplateStatus(AppearOnScrollStatusEnum.ENTERING);

      flushSetTimeouts();
      assertTemplateStatus(AppearOnScrollStatusEnum.WRAPPER_OUTSIDE_VIEW);
      expect(defaultProps.onVisible).toHaveBeenCalled();

      IntersectionObserverCallback([{ isIntersecting: true }]);
      assertTemplateStatus(AppearOnScrollStatusEnum.EXITING);
      flushSetTimeouts();
      assertTemplateStatus(AppearOnScrollStatusEnum.WRAPPER_IN_VIEW);
      expect(defaultProps.onExiting).toHaveBeenCalled();
    });

    it('should disconnect observer on unmount', () => {
      wrapper.unmount();
      expect(IntersectionObserverDisconnectMock).toHaveBeenCalled();
    });
  });
});
