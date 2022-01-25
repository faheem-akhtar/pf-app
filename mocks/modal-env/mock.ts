import { APP_MODAL_ROOT_ELEMENT_ID } from 'constants/app/modal-root-element-id.constant';
import { APP_ROOT_ELEMENT_ID } from 'constants/app/root-element-id.constant';

export const mockModalEnv = (): { modalRoot: HTMLDivElement; appRoot: HTMLDivElement } => {
  const modalRoot = (document.getElementById(APP_MODAL_ROOT_ELEMENT_ID) ||
    document.createElement('div')) as HTMLDivElement;
  modalRoot.id = APP_MODAL_ROOT_ELEMENT_ID;

  const appRoot = (document.getElementById(APP_ROOT_ELEMENT_ID) || document.createElement('div')) as HTMLDivElement;
  appRoot.id = APP_ROOT_ELEMENT_ID;

  if (!document.getElementById(APP_ROOT_ELEMENT_ID)) {
    document.body.appendChild(modalRoot);
  }

  if (!document.getElementById(APP_ROOT_ELEMENT_ID)) {
    document.body.appendChild(appRoot);
  }

  return {
    modalRoot,
    appRoot,
  };
};
