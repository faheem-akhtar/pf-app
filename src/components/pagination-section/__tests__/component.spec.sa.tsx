import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextRouter, useRouter } from 'next/router';

import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { configCommon } from 'config/common';

import { PaginationSectionComponent } from '../component';
import { PaginationSectionComponentPropsType } from '../component-props.type';

const routerMock = {
  events: { on: jest.fn(), off: jest.fn() },
  locale: configCommon.language.current,
  pathname: '/search',
  asPath: '/search?c=4',
  push: jest.fn(),
} as unknown as NextRouter;

jest.mock('next/router', () => ({
  useRouter: (): NextRouter => routerMock,
}));

describe('PaginationSectionComponent Saudi', () => {
  let props: PaginationSectionComponentPropsType;

  beforeEach(() => {
    props = {
      loading: false,
      pagesAvailable: 1815,
    };
  });

  it('should call on click when the next button is clicked', () => {
    const routerPushSpy = jest.fn();
    useRouter().push = routerPushSpy;

    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PaginationSectionComponent {...props} />
      </FiltersContextProvider>
    );

    const nextButton = screen.getByRole('link', { name: 'next' });

    userEvent.click(nextButton);

    expect(routerPushSpy).toHaveBeenCalledTimes(1);
    expect(routerPushSpy).toHaveBeenCalledWith('/search?c=4&page=2');
  });
});
