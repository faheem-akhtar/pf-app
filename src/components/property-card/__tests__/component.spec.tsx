/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { mockWindowConsole } from 'mocks/window/console.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { propertyStub } from 'stubs/property/stub';
import { touchEventStub } from 'stubs/touch/event.stub';

import { propertySerpObfuscatedGetContactOptionsList } from 'components/property/serp/obfuscated/get/contact-options-list';
import { SavedPropertyContext } from 'components/saved-property/context';
import { SavedPropertyInterface } from 'components/saved-property/interface';
import { StatsService } from 'services/stats/service';
import { PropertySearchStatsDataPromiseForCurrentQueryContext } from 'views/property-search/stats-data-promise-for-current-query/context';

import { PropertyCardComponent } from '../component';
import { PropertyCardComponentPropsType } from '../component-props.type';
import * as usePropertyCardTrackVisibilityOnScreenModule from '../track-visibility-on-screen.hook';

jest.mock('../track-visibility-on-screen.hook');

const makeDefaultProps = (): PropertyCardComponentPropsType => ({
  property: propertyStub(),
  loading: false,
  onSaveButtonClick: jest.fn(),
});

/**
 * TODO-FE[CX-407] Add missing tests
 */

describe('PropertyCardComponent', () => {
  beforeAll(() => {
    mockModalEnv();
  });

  beforeEach(() => {
    mockWindowFetch();
    (StatsService().propertyLeadClick as jest.Mock).mockReset();
  });
  /**
   * Gallery
   */
  it('before gallery touched, render single image', () => {
    const defaultProps = makeDefaultProps();
    const { getAllByTestId } = render(<PropertyCardComponent {...defaultProps} />);

    expect(getAllByTestId('gallery-scroll-picture').length).toBe(1);
  });

  it('should load images when gallery is touched', () => {
    const defaultProps = makeDefaultProps();
    const { getByTestId, getAllByTestId } = render(<PropertyCardComponent {...defaultProps} />);

    mockReactUseSwr('en-property-search/images-GET-{"propertyId":"198023","imageType":"medium"}', {
      ok: true,
      data: ['i1', 'i2', 'i3'],
    });

    const gallery = getByTestId('gallery-scroll');
    fireEvent.touchStart(gallery, {
      ...touchEventStub(),
      changedTouches: [{ pageX: 5 } as Touch] as unknown as React.TouchList,
      touches: [{ clientX: 5, clientY: 7 }],
    });

    expect(getAllByTestId('gallery-scroll-picture').length).toBe(3);
  });

  it('should call usePropertyCardTrackVisibilityOnScreen hook', async () => {
    const statsDataPromise = Promise.resolve({ ok: true });
    const defaultProps = makeDefaultProps();

    render(
      <PropertySearchStatsDataPromiseForCurrentQueryContext.Provider value={statsDataPromise}>
        <PropertyCardComponent {...defaultProps} />
      </PropertySearchStatsDataPromiseForCurrentQueryContext.Provider>
    );

    await statsDataPromise;

    expect(usePropertyCardTrackVisibilityOnScreenModule.usePropertyCardTrackVisibilityOnScreen).toHaveBeenCalledWith(
      statsDataPromise,
      '198023',
      expect.objectContaining({ current: expect.anything() })
    );
  });
  /**
   * CTA buttons
   */
  it('should print error if can not send lead', async () => {
    const statsDataPromise = Promise.resolve({ ok: false });

    mockReactUseSwr('en-property-search/agent-GET-{"propertyId":"198023"}', {});
    const defaultProps = makeDefaultProps();
    const { getByTestId } = render(
      <PropertySearchStatsDataPromiseForCurrentQueryContext.Provider value={statsDataPromise}>
        <PropertyCardComponent {...defaultProps} />
      </PropertySearchStatsDataPromiseForCurrentQueryContext.Provider>
    );

    const callButton = getByTestId('cta-call');

    const { error: errorMock } = mockWindowConsole();
    userEvent.click(callButton);

    await statsDataPromise;

    expect(errorMock).toHaveBeenCalledTimes(1);
    expect(errorMock).toHaveBeenCalledWith('Unable to send lead because stats data failed to load');
  });

  const makeCtaClickTest = (ctaType: string, medium: string): void => {
    it(`should send lead on ${ctaType}`, async () => {
      const statsDataPromise = Promise.resolve({ ok: true });
      mockReactUseSwr('en-property-search/agent-GET-{"propertyId":"198023"}', {});
      mockReactUseSwr('en-countries-GET-{"sort":"priority"}', {});
      const defaultProps = makeDefaultProps();
      propertySerpObfuscatedGetContactOptionsList(defaultProps.property).whatsapp = { type: '', value: '', link: '' };
      const { getByTestId } = render(
        <PropertySearchStatsDataPromiseForCurrentQueryContext.Provider value={statsDataPromise}>
          <PropertyCardComponent {...defaultProps} />
        </PropertySearchStatsDataPromiseForCurrentQueryContext.Provider>
      );

      const callButton = getByTestId(`cta-${ctaType}`);

      userEvent.click(callButton);
      await statsDataPromise;

      expect(StatsService().propertyLeadClick).toHaveBeenCalledTimes(1);
      expect(StatsService().propertyLeadClick).toHaveBeenCalledWith(198023, { lead: { cta: 'button', medium } });
    });
  };

  makeCtaClickTest('call', 'phone');
  makeCtaClickTest('email', 'email');
  makeCtaClickTest('whatsapp', 'whatsapp');

  it('should send propertySave event on save button click', () => {
    const defaultProps = makeDefaultProps();
    const { getByTestId } = render(<PropertyCardComponent {...defaultProps} />);
    StatsService().propertySave = jest.fn();

    const saveButton = getByTestId('property-save-button');
    userEvent.click(saveButton);

    expect(StatsService().propertySave).toHaveBeenCalledTimes(1);
    expect(StatsService().propertySave).toHaveBeenCalledWith(198023, {});
  });

  it('should send propertyUnsave event on save button click and was previously saved', () => {
    const defaultProps = makeDefaultProps();
    const { getByTestId } = render(
      <SavedPropertyContext.Provider
        value={{ data: [{ propertyId: 198023 } as SavedPropertyInterface], toggle: jest.fn() }}
      >
        <PropertyCardComponent {...defaultProps} />
      </SavedPropertyContext.Provider>
    );
    StatsService().propertyUnsave = jest.fn();

    const saveButton = getByTestId('property-save-button');
    userEvent.click(saveButton);

    expect(StatsService().propertyUnsave).toHaveBeenCalledTimes(1);
    expect(StatsService().propertyUnsave).toHaveBeenCalledWith(198023, {});
  });
});
