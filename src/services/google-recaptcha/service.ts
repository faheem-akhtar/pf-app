import { AnyValueType } from 'types/any/value.type';
import { functionNoop } from 'helpers/function/noop';
import { importScript } from 'helpers/import/script';
import { LocaleService } from 'services/locale/service';
import { reCaptchaSelector } from 'components/re-captcha/selector';
import { WindowService } from 'services/window/service';

export class GoogleRecaptchaService {
  /**
   * Is recaptcha ready for usage ?
   * @protected
   */
  protected isReady: boolean = false;

  /**
   * Is the script currently loading ?
   * @protected
   */
  protected isLoading: boolean = false;

  /**
   * Queue of Promise.resolve to call once the Recaptcha script will be ready
   * @protected
   */
  protected promiseQueue: Array<() => void> = [];

  /**
   * Recaptcha script load promise
   * @protected
   */
  protected loadPromise: Promise<string> | undefined;

  /**
   * Grecapcha instance id
   * @private
   */
  private instanceId: number | undefined = undefined;

  /**
   * Captcha token
   */
  private token: string = '';

  /**
   * Captcha promise resolver
   * @private
   */
  private resolveCaptcha: (captchaToken: string) => void = functionNoop;

  /**
   * Execute grecaptcha
   */
  public execute(): Promise<string> {
    if (this.token) {
      return Promise.resolve(this.token);
    }

    // If captcha doesnt exist in window
    if (!WindowService.getGrecaptcha()) {
      // Load and render captcha
      return this.load().then(this.onCaptchaRender).then(this.executeRecaptcha);
    }

    // If instance doesn't exist render recaptcha
    if (!this.instanceId) {
      this.onCaptchaRender();
    }

    return this.executeRecaptcha();
  }

  /**
   * Captcha token resolver
   */
  private executeRecaptcha = (): Promise<string> => {
    return new Promise((resolve) => {
      this.resolveCaptcha = resolve;
      WindowService.getGrecaptcha().execute();
    });
  };

  /**
   * Load captcha script and render inside @containerElement
   */
  public load(): Promise<void> {
    return new Promise<void>((resolve) => {
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
  }

  /**
   * Reset grecaptcha
   */
  public reset(): void {
    if (!this.instanceId) {
      return;
    }

    this.token = '';
    WindowService.getGrecaptcha().reset(this.instanceId);
  }

  /**
   * On captcha is being initialized
   */
  private onCaptchaRender = (): void => {
    // Reset captcha
    this.reset();

    // Create a placeholder for the captcha frame
    const captchaPlaceholder = document.createElement('div');

    // Append it to the component
    WindowService.document?.querySelector('body')?.appendChild(captchaPlaceholder);

    // Render inside the placeholder
    this.instanceId = WindowService.getGrecaptcha().render(reCaptchaSelector, {
      sitekey: process.env.NEXT_PUBLIC_RECAPTCHA,
      callback: (c: string) => {
        // Store captcha token
        this.token = c;
        this.resolveCaptcha(c);
      },
      'expired-callback': () => {
        // Reset captcha token
        this.token = '';
      },
      size: 'invisible',
    });
  };

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
  private importScript(): void {
    importScript(this.getSrc());
  }

  /**
   * Returns the script "src" value
   */
  private getSrc(): string {
    const langCode = LocaleService.getLocale();
    return `https://www.google.com/recaptcha/api.js?render=explicit&onload=onReadyGoogleRecaptcha&hl=${langCode}`;
  }
}
