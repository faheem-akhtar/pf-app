const originalIntersectionObserver = global.IntersectionObserver;

export const mockWindowIntersectionObserver = (): jest.Mock => {
  const intersectionObserverMock = jest.fn();

  global.IntersectionObserver = intersectionObserverMock.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  return intersectionObserverMock;
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverWindowIntersectionObserver = (): void => {
  global.IntersectionObserver = originalIntersectionObserver;
};
