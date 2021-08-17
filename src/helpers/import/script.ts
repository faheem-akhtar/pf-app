import { WindowService } from 'services/window/service';

/**
 * Returns a promise that will resolve on dynamically importing a script. The promise will be rejected if the script fails to load.
 * @param src
 * @param isAsync
 */
export const importScript = (src: string, isAsync?: boolean): Promise<void> => {
  return new Promise((resolve, reject) => {
    const head = WindowService.document?.head || WindowService.document?.getElementsByTagName('head')[0];
    const script = WindowService.document?.createElement('script');

    if (!script || !head) {
      reject();
      return;
    }

    // Prepare script
    script.type = 'text/javascript';
    script.onerror = (): void => reject();
    script.onload = (): void => resolve();

    // Add async attribute to the script
    if (isAsync) {
      script.setAttribute('async', '');
    }

    // Load script
    head.appendChild(script);
    script.src = src;
  });
};
