/**
 * @jest-environment jsdom
 */

import { appRootElementId } from 'src/constants/app/root-element-id';
import { shallow } from 'enzyme';

import { ModalPortalComponent } from '../portal-component';

describe('ModalPortalComponent', () => {
  beforeEach(() => {
    const getElementByIdSpy = (document.getElementById = jest.fn());
    getElementByIdSpy.mockReturnValue({
      classList: {
        add: jest.fn(),
        remove: jest.fn(),
      },
    });
  });
  it('It should add hide classname when opened', () => {
    const getElementByIdSpy = (document.getElementById = jest.fn());
    const classList = {
      add: jest.fn(),
    };
    getElementByIdSpy.mockReturnValue({ classList });
    shallow(<ModalPortalComponent>content</ModalPortalComponent>);

    expect(getElementByIdSpy).toHaveBeenCalledWith(appRootElementId);
    expect(classList.add).toHaveBeenCalledTimes(1);
  });

  it('It should remove hide classname on unmount', () => {
    const getElementByIdSpy = (document.getElementById = jest.fn());
    const classList = {
      add: jest.fn(),
      remove: jest.fn(),
    };
    getElementByIdSpy.mockReturnValue({ classList });
    const wrapper = shallow(<ModalPortalComponent>content</ModalPortalComponent>);

    wrapper.unmount();

    expect(classList.remove).toHaveBeenCalledTimes(1);
  });

  it('It should return scroll top on unmount', () => {
    const expectedScrollTop = 500;
    const scrollTop = {
      get: jest.fn(() => expectedScrollTop),
      set: jest.fn(),
    };
    Object.defineProperty(document.documentElement, 'scrollTop', scrollTop);
    const wrapper = shallow(<ModalPortalComponent>content</ModalPortalComponent>);

    wrapper.unmount();

    expect(scrollTop.get).toHaveBeenCalledTimes(1);
    expect(scrollTop.set).toHaveBeenCalledTimes(1);
    expect(scrollTop.set).toHaveBeenCalledWith(expectedScrollTop);
  });
});
