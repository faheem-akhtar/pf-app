import { appRootElementId } from 'constants/app/root-element-id';

export const mockModalEnv = (): { modalRoot: HTMLDivElement; appRoot: HTMLDivElement } => {
  const modalRoot = document.createElement('div');
  modalRoot.id = 'modal-root';
  document.body.appendChild(modalRoot);
  const appRoot = document.createElement('div');
  appRoot.id = appRootElementId;
  document.body.appendChild(appRoot);

  return {
    modalRoot,
    appRoot,
  };
};
