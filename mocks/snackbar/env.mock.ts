import { appRootElementId } from 'constants/app/root-element-id';

export const mockSnackbarEnv = (): { snackbarRoot: HTMLDivElement; appRoot: HTMLDivElement } => {
  const snackbarRoot = (document.getElementById('snackbar-root') || document.createElement('div')) as HTMLDivElement;
  snackbarRoot.id = 'snackbar-root';

  const appRoot = (document.getElementById(appRootElementId) || document.createElement('div')) as HTMLDivElement;
  appRoot.id = appRootElementId;

  if (!document.getElementById('snackbar-root')) {
    document.body.appendChild(snackbarRoot);
  }

  if (!document.getElementById(appRootElementId)) {
    document.body.appendChild(appRoot);
  }

  return {
    snackbarRoot,
    appRoot,
  };
};
