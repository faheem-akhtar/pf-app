import { appModalRootElementId } from 'constants/app/modal-root-element-id';
import { appRootElementId } from 'constants/app/root-element-id';

export const mockModalEnv = (): { modalRoot: HTMLDivElement; appRoot: HTMLDivElement } => {
  const modalRoot = (document.getElementById(appModalRootElementId) || document.createElement('div')) as HTMLDivElement;
  modalRoot.id = appModalRootElementId;

  const appRoot = (document.getElementById(appRootElementId) || document.createElement('div')) as HTMLDivElement;
  appRoot.id = appRootElementId;

  if (!document.getElementById(appRootElementId)) {
    document.body.appendChild(modalRoot);
  }

  if (!document.getElementById(appRootElementId)) {
    document.body.appendChild(appRoot);
  }

  return {
    modalRoot,
    appRoot,
  };
};
