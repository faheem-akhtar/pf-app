import { ElementService } from 'services/element/service';

const original = ElementService.getBoundingClientRect;

/**
 * Mock element bounding client rect
 */
export const mockElementGetBoundingClientRect = (mock: Partial<DOMRect>): void => {
  ElementService.getBoundingClientRect = (element: Element): DOMRect => ({ ...original(element), ...mock } as DOMRect);
};

// eslint-disable-next-line pf-rules/export-name-validation
export const recoverElementGetBoundingClientRect = (): void => {
  ElementService.getBoundingClientRect = original;
};
