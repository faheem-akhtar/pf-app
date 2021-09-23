/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';

import { mockModalEnv } from 'mocks/modal-env/mock';

import { ModalPortalComponent } from '../portal-component';

describe('ModalPortalComponent', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    document.documentElement.scroll = jest.fn();
  });

  it('It should add hide classname when opened', async () => {
    const { appRoot } = mockModalEnv();
    render(<ModalPortalComponent>content</ModalPortalComponent>);

    expect(appRoot).toHaveClass('hide');
  });

  it('It should not add hide classname when opened in overlay mode', async () => {
    const { appRoot } = mockModalEnv();
    render(<ModalPortalComponent overlay>content</ModalPortalComponent>);

    expect(appRoot).not.toHaveClass();
  });

  it('It should hide ads on mount', async () => {
    const adElement = document.createElement('div');
    adElement.setAttribute('data-ad', '1');
    document.body.append(adElement);
    mockModalEnv();
    render(<ModalPortalComponent>content</ModalPortalComponent>);

    expect(adElement).toHaveStyle({
      display: 'none',
    });
  });

  it('It should show ads on unmount', async () => {
    const adElement = document.createElement('div');
    adElement.setAttribute('data-ad', '1');
    document.body.append(adElement);
    mockModalEnv();
    const { unmount } = render(<ModalPortalComponent overlay>content</ModalPortalComponent>);
    unmount();

    await waitFor(() => {
      expect(adElement).not.toHaveStyle({
        display: 'none',
      });
    });
  });

  it('It should remove hide classname on unmount', () => {
    const { appRoot } = mockModalEnv();
    const { unmount } = render(<ModalPortalComponent>content</ModalPortalComponent>);
    unmount();

    expect(appRoot).not.toHaveClass();
  });

  it('It should return scroll top on unmount', () => {
    mockModalEnv();
    const expectedScrollTop = 500;
    const expectedOptions = {
      top: expectedScrollTop,
    };

    const scrollTop = {
      get: jest.fn(() => expectedScrollTop),
      set: jest.fn(),
    };
    Object.defineProperty(document.documentElement, 'scrollTop', scrollTop);
    const { unmount } = render(<ModalPortalComponent>content</ModalPortalComponent>);

    unmount();

    expect(document.documentElement.scroll).toHaveBeenCalledWith(expectedOptions);
  });
});
