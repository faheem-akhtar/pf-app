import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';

import { mockReactUseEffect } from 'mocks/react/use-effect.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';

import { FiltersContextProvider } from 'components/filters/context-provider';

import { PaginationSectionComponent } from '../component';
import { PaginationSectionComponentPropsType } from '../component-props.type';

describe('PaginationSectionComponent', () => {
  let props: PaginationSectionComponentPropsType;

  beforeEach(() => {
    props = {
      loading: false,
      pagesAvailable: 1815,
    };
  });

  it('renders without throwing any errors', () => {
    const { container } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PaginationSectionComponent {...props} />
      </FiltersContextProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should be disable the previous button when the page is initial', () => {
    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PaginationSectionComponent {...props} />
      </FiltersContextProvider>
    );

    const prevButton = screen.getByRole('link', { name: 'prev' });

    expect(prevButton).toHaveClass('disabled');
    expect(prevButton).toHaveAttribute('href', '#');
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
    expect(routerPushSpy).toHaveBeenCalledWith('/en/search?page=2');
  });

  it('should call router events on when on mount', () => {
    mockReactUseEffect();
    window.scrollTo = jest.fn();

    const handlers: Function[] = [];
    useRouter().events.on = (_, callback): void => {
      handlers.push(callback);
    };

    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PaginationSectionComponent {...props} />
      </FiltersContextProvider>
    );

    handlers.forEach((handler) => handler(''));

    expect(window.scrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 });
  });

  it('should call router events off when on unmount', () => {
    const { unmountAll } = mockReactUseEffect();
    window.scrollTo = jest.fn();

    const routerOffSpy = jest.fn();
    useRouter().events.off = routerOffSpy;

    render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <PaginationSectionComponent {...props} />
      </FiltersContextProvider>
    );

    unmountAll();

    expect(routerOffSpy).toHaveBeenCalledWith('routeChangeStart', expect.anything());
  });
});
