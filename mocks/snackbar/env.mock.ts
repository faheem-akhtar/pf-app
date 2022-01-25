import { APP_ROOT_ELEMENT_ID } from 'constants/app/root-element-id.constant';
import { APP_SNACKBAR_ROOT_ELEMENT_ID } from 'constants/app/snackbar-root-element-id.constant';

export const mockSnackbarEnv = (): { snackbarRoot: HTMLDivElement; appRoot: HTMLDivElement } => {
  const snackbarRoot = (document.getElementById(APP_SNACKBAR_ROOT_ELEMENT_ID) ||
    document.createElement('div')) as HTMLDivElement;
  snackbarRoot.id = APP_SNACKBAR_ROOT_ELEMENT_ID;

  const appRoot = (document.getElementById(APP_ROOT_ELEMENT_ID) || document.createElement('div')) as HTMLDivElement;
  appRoot.id = APP_ROOT_ELEMENT_ID;

  if (!document.getElementById(APP_SNACKBAR_ROOT_ELEMENT_ID)) {
    document.body.appendChild(snackbarRoot);
  }

  if (!document.getElementById(APP_ROOT_ELEMENT_ID)) {
    document.body.appendChild(appRoot);
  }

  return {
    snackbarRoot,
    appRoot,
  };
};
