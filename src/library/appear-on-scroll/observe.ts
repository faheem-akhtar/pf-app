export const appearOnScrollObserve = (
  element: Element,
  onVisibilityChange: (visible: boolean) => void
): (() => void) => {
  // TODO-FE[TPNX-3146] add polifill for IntersectionObserver
  const observer: IntersectionObserver = new window.IntersectionObserver(
    (entries) => entries.forEach(({ isIntersecting }) => onVisibilityChange(isIntersecting)),
    {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: [0],
    }
  );

  observer.observe(element);

  return (): void => observer.disconnect();
};
