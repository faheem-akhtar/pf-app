/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { appRootElementId } from 'src/constants/app/root-element-id';

import { ModalPortalComponent } from '../portal-component';

// TODO-FE[CX-169] enable back
describe('ModalPortalComponent', () => {
  let modalRoot: HTMLDivElement;
  let appRoot: HTMLDivElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
    appRoot = document.createElement('div');
    appRoot.id = appRootElementId;
    document.body.appendChild(appRoot);
  });

  afterEach(() => {
    modalRoot.remove();
    appRoot.remove();
  });

  it('It should add hide classname when opened', async () => {
    render(<ModalPortalComponent>content</ModalPortalComponent>);

    // expecting undefined because css modules do not export classnames
    expect(appRoot.className).toMatchInlineSnapshot(`"hide"`);
  });

  it('It should remove hide classname on unmount', () => {
    const { unmount } = render(<ModalPortalComponent>content</ModalPortalComponent>);
    unmount();

    expect(appRoot.className).toMatchInlineSnapshot(`""`);
  });

  it('It should return scroll top on unmount', () => {
    const expectedScrollTop = 500;
    const scrollTop = {
      get: jest.fn(() => expectedScrollTop),
      set: jest.fn(),
    };
    Object.defineProperty(document.documentElement, 'scrollTop', scrollTop);
    const { unmount } = render(<ModalPortalComponent>content</ModalPortalComponent>);

    unmount();

    expect(scrollTop.set).toHaveBeenCalledWith(expectedScrollTop);
  });
});
