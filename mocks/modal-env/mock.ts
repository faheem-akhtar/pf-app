import { appRootElementId } from 'constants/app/root-element-id';

export const mockModalEnv = (): { modalRoot: HTMLDivElement; appRoot: HTMLDivElement } => {
  const modalRoot = (document.getElementById('modal-root') || document.createElement('div')) as HTMLDivElement;
  modalRoot.id = 'modal-root';

  const appRoot = (document.getElementById(appRootElementId) || document.createElement('div')) as HTMLDivElement;
  appRoot.id = appRootElementId;

  if (!document.getElementById('modal-root')) {
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
