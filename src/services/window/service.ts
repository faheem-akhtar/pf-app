export const WindowService = {
  addEventListener: <K extends keyof WindowEventMap>(
    type: K,
    handler: (this: Window, ev: WindowEventMap[K]) => void,
    options?: boolean | AddEventListenerOptions | undefined
  ): void => window.addEventListener(type, handler, options),
  removeEventListener: <K extends keyof WindowEventMap>(
    type: K,
    handler: (this: Window, ev: WindowEventMap[K]) => void
  ): void => window.removeEventListener(type, handler),
};
