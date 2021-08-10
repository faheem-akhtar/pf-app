import { AnyValueType } from 'types/any/value.type';
import { LocaleService } from 'services/locale/service';

const importScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    // Prepare script
    script.type = 'text/javascript';
    script.onerror = (): void => reject();
    script.onload = (): void => resolve();

    // Load script
    document.head.appendChild(script);
    script.src = src;
  });
};
export class GoogleRecaptchaService {
  /**
   * Is recaptcha ready for usage ?
   */
  protected isReady: boolean = false;

  /**
   * Is the script currently loading ?
   */
  protected isLoading: boolean = false;

  /**
   * Queue of Promise.resolve to call once the Recaptcha script will be ready
   */
  protected promiseQueue: Array<() => void> = [];

  /**
   * Load Recaptcha script
   */
  public load(): Promise<string> {
    const loadedPromise = new Promise<void>((resolve) => {
      // Script already ready
      if (this.isReady) {
        resolve();
        return;
      }

      // Add resolve function to queue
      this.promiseQueue.push(resolve);

      // Script is loading
      if (this.isLoading) {
        return;
      }

      // Script is now loading
      this.isLoading = true;

      // Define global callback function
      (window as unknown as { onReadyGoogleRecaptcha: AnyValueType }).onReadyGoogleRecaptcha =
        this.onReadyGoogleRecaptcha;

      this.importScript();
    });

    return loadedPromise.then(() => {
      const captchaPlaceholder = document.createElement('div');
      document.querySelector('body')?.appendChild(captchaPlaceholder);

      let resolveCaptcha: (capthaTocken: string) => void;
      (
        window as unknown as { grecaptcha: { render: (p1: HTMLDivElement, config: AnyValueType) => void } }
      ).grecaptcha.render(captchaPlaceholder, {
        // TODO-FE[CX-249] read from config
        sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        callback: (c: string) => {
          // eslint-disable-next-line no-console
          console.log('resolve', c);
          resolveCaptcha(c);
        },
        // eslint-disable-next-line no-console
        'expired-callback': () => console.log('captcha expired'),
        size: 'invisible',
      });

      return new Promise((resolve) => {
        resolveCaptcha = resolve;
        (window as unknown as { grecaptcha: { execute: () => void } }).grecaptcha.execute();
      });
    });
  }

  /**
   * Returns the script "src" value
   */
  public getSrc(): string {
    const langCode = LocaleService.getLocale();
    return `https://www.google.com/recaptcha/api.js?render=explicit&onload=onReadyGoogleRecaptcha&hl=${langCode}`;
  }

  /**
   * Google Recaptcha ready for usage
   */
  protected onReadyGoogleRecaptcha = (): void => {
    this.isReady = true;
    this.isLoading = false;

    // Call every promise.resolve in queue
    this.promiseQueue.forEach((resolve) => resolve());
  };

  /**
   * Import script
   */
  private importScript(): Promise<void> {
    return importScript(this.getSrc());
  }
}
