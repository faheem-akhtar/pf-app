import * as importScriptModule from 'helpers/import/script';
import { functionNoop } from 'helpers/function/noop';
import { GoogleRecaptcha } from '../recaptcha';
import { reCaptchaSelector } from 'components/re-captcha/selector';
import { WindowService } from 'services/window/service';

describe('GoogleRecaptcha', () => {
  let googleRecaptcha: GoogleRecaptcha;

  beforeEach(() => {
    googleRecaptcha = new GoogleRecaptcha();
  });

  describe('load()', () => {
    let importScriptSpy: jest.SpyInstance<Promise<void>>;

    beforeEach(() => {
      importScriptSpy = jest.spyOn(importScriptModule, 'importScript').mockReturnValue(Promise.resolve());
    });

    it('should not import script if is already ready', async () => {
      googleRecaptcha['isReady'] = true;
      await googleRecaptcha.load();

      expect(importScriptSpy).not.toHaveBeenCalled();
    });

    it('should not import script if is still loading', (done) => {
      googleRecaptcha['isLoading'] = true;
      googleRecaptcha.load();

      setTimeout(() => {
        expect(importScriptSpy).not.toHaveBeenCalled();
        done();
      });
    });

    it('should import the script', (done) => {
      googleRecaptcha.load();

      setTimeout(() => {
        expect(importScriptSpy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('execute()', () => {
    it('will return the token if exist', async () => {
      googleRecaptcha['token'] = 'this is a token';
      const token = await googleRecaptcha.execute();
      expect(token).toEqual('this is a token');
    });

    it('will load and render captcha if captcha doesnt exist in window', async () => {
      jest.spyOn(WindowService, 'getGrecaptcha').mockReturnValue(null as unknown as typeof grecaptcha);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onCaptchaRenderSpy = jest.spyOn(<any>googleRecaptcha, 'onCaptchaRender').mockReturnValue(null);
      const executeRecaptchaSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(<any>googleRecaptcha, 'executeRecaptcha')
        .mockReturnValue(Promise.resolve());
      googleRecaptcha['isReady'] = true;

      await googleRecaptcha.execute();

      expect(onCaptchaRenderSpy).toHaveBeenCalledTimes(1);
      expect(executeRecaptchaSpy).toHaveBeenCalledTimes(1);
    });

    it('will load and render captcha if captcha exist in window', async () => {
      jest.spyOn(WindowService, 'getGrecaptcha').mockReturnValue({} as unknown as typeof grecaptcha);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const onCaptchaRenderSpy = jest.spyOn(<any>googleRecaptcha, 'onCaptchaRender').mockReturnValue(null);
      const executeRecaptchaSpy = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn(<any>googleRecaptcha, 'executeRecaptcha')
        .mockReturnValue(Promise.resolve());
      googleRecaptcha['isReady'] = true;

      await googleRecaptcha.execute();

      expect(onCaptchaRenderSpy).toHaveBeenCalledTimes(1);
      expect(executeRecaptchaSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('executeRecaptcha()', () => {
    it('should execute aptcha on windows', (done) => {
      const executeSpy = jest.fn();
      jest
        .spyOn(WindowService, 'getGrecaptcha')
        .mockReturnValue({ execute: executeSpy } as unknown as typeof grecaptcha);

      expect(googleRecaptcha['resolveCaptcha']).toEqual(functionNoop);

      googleRecaptcha['executeRecaptcha']();

      setTimeout(() => {
        expect(googleRecaptcha['resolveCaptcha']).not.toEqual(functionNoop);
        expect(executeSpy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('reset()', () => {
    let resetSpy: jest.Mock;

    beforeEach(() => {
      googleRecaptcha['token'] = 'my token';
      resetSpy = jest.fn();
      jest.spyOn(WindowService, 'getGrecaptcha').mockReturnValue({ reset: resetSpy } as unknown as typeof grecaptcha);
    });

    it('should not do anything if instanceId doest not exist', () => {
      googleRecaptcha['instanceId'] = undefined;
      googleRecaptcha.reset();

      expect(resetSpy).not.toHaveBeenCalled();
      expect(googleRecaptcha['token']).toEqual('my token');
    });

    it('should reset the token and captcha', () => {
      googleRecaptcha['instanceId'] = 100;
      googleRecaptcha.reset();

      expect(resetSpy).toHaveBeenCalledTimes(1);
      expect(googleRecaptcha['token']).toEqual('');
    });
  });

  describe('onCaptchaRender()', () => {
    let renderSpy: jest.Mock;

    beforeEach(() => {
      googleRecaptcha['token'] = 'my token';
      renderSpy = jest.fn().mockReturnValue(10);
      jest.spyOn(WindowService, 'getGrecaptcha').mockReturnValue({ render: renderSpy } as unknown as typeof grecaptcha);
    });

    it('should reset', () => {
      const resetSpy = jest.spyOn(googleRecaptcha, 'reset');
      googleRecaptcha['onCaptchaRender']();

      expect(resetSpy).toHaveBeenCalledTimes(1);
    });

    it('should set the instanceId', () => {
      expect(googleRecaptcha['instanceId']).toBeUndefined();

      googleRecaptcha['onCaptchaRender']();

      expect(renderSpy).toHaveBeenCalledTimes(1);
      expect(renderSpy).toHaveBeenCalledWith(reCaptchaSelector, {
        sitekey: process.env.NEXT_PUBLIC_RECAPTCHA,
        callback: expect.any(Function),
        'expired-callback': expect.any(Function),
        size: 'invisible',
      });
      expect(googleRecaptcha['instanceId']).toEqual(10);
    });
  });

  describe('onReadyGoogleRecaptcha()', () => {
    it('should set isReady and isLoading flag', () => {
      googleRecaptcha['isReady'] = false;
      googleRecaptcha['isLoading'] = true;

      googleRecaptcha['onReadyGoogleRecaptcha']();

      expect(googleRecaptcha['isReady']).toBeTruthy();
      expect(googleRecaptcha['isLoading']).toBeFalsy();
    });

    it('should call every promise in queue', () => {
      const resolveSpy1 = jest.fn();
      const resolveSpy2 = jest.fn();
      googleRecaptcha['promiseQueue'] = [resolveSpy1, resolveSpy2];

      googleRecaptcha['onReadyGoogleRecaptcha']();

      expect(resolveSpy1).toHaveBeenCalledTimes(1);
      expect(resolveSpy2).toHaveBeenCalledTimes(1);
    });
  });

  describe('importScript()', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    it('should call import script', () => {
      const importScriptSpy = jest.spyOn(importScriptModule, 'importScript').mockReturnValue(Promise.resolve());
      googleRecaptcha['importScript']();

      expect(importScriptSpy).toHaveBeenCalledTimes(1);
      expect(importScriptSpy).toHaveBeenCalledWith(
        'https://www.google.com/recaptcha/api.js?render=explicit&onload=onReadyGoogleRecaptcha&hl=en'
      );
    });
  });
});
