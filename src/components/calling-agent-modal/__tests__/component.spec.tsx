import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { propertyStub } from 'stubs/property/stub';

import { FiltersContextProvider } from 'components/filters/context-provider';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { PropertyReportReasonEnum } from 'enums/property/report/reason.enum';
import { PropertyReportUserTypeEnum } from 'enums/property/report/user-type.enum';

import { CallingAgentModalComponent } from '../component';
import { CallingAgentModalComponentPropsInterface } from '../component-props.interface';
import * as CallingAgentModalFeedbackComponentModule from '../feedback-component';

describe('CallingAgentModalComponent', () => {
  const openRef = { current: jest.fn() };
  const closeRef = { current: jest.fn() };
  const property: PropertySerpObfuscatedType = propertyStub();
  const propertyId: string = propertySerpObfuscatedGetId(property);

  let props: CallingAgentModalComponentPropsInterface;

  beforeEach(() => {
    mockModalEnv();

    window.dataLayer = [];

    props = {
      property,
      referenceId: propertySerpObfuscatedGetReference(property),
      openRef,
      closeRef,
    };
  });

  it('should render without throwing any errors', () => {
    mockReactUseSwr('en-property-search/agent-GET-{"propertyId":"198023"}', {
      ok: false,
    });
    render(<CallingAgentModalComponent {...props} />);
    act(openRef.current);

    expect(screen.getByTestId('calling-agent-modal-content')).toMatchSnapshot();
  });

  describe('when agent model information is loaded', () => {
    beforeEach(() => {
      mockReactUseSwr('en-property-search/agent-GET-{"propertyId":"198023"}', {
        ok: true,
        data: { name: 'lorem', languages: ['a', 'b'], imageSrc: 'image' },
      });

      render(<CallingAgentModalComponent {...props} />);
      act(openRef.current);
    });

    it('should update title when close is clicked first time', () => {
      userEvent.click(screen.getByRole('button', { name: /cross/i }));

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('agent-modal/property-availability');
    });

    it('should close modal when close is clicked second time', () => {
      const closeButton = screen.getByRole('button', { name: /cross/i });
      userEvent.dblClick(closeButton);

      expect(closeButton).not.toBeInTheDocument();
    });

    test('if agent info is shown properly', () => {
      expect(screen.getByTestId('agent-info-component-details')).toMatchSnapshot();
    });

    it('should render feedback component when agent data exists and close is clicked first time', () => {
      userEvent.click(screen.getByRole('button', { name: /cross/i }));

      expect(screen.getByText('agent-modal/agent-not-answered')).toBeInTheDocument();
    });
  });

  describe('FeedbackComponent', () => {
    it('should call onAnswerClicked callback when a feedback button is clicked', async () => {
      mockReactUseSwr('en-property-search/agent-GET-{"propertyId":"198023"}', {
        ok: true,
        data: { name: 'lorem', languages: ['a', 'b'], imageSrc: 'image' },
      });
      jest
        .spyOn(CallingAgentModalFeedbackComponentModule, 'CallingAgentModalFeedbackComponent')
        .mockImplementationOnce(({ onAnswerClicked }) => (
          <button data-testid='feedback-component-button' onClick={(): void => onAnswerClicked('yes')} />
        ));

      render(<CallingAgentModalComponent {...props} />);

      act(openRef.current);

      const closeButton = screen.getByRole('button', { name: /cross/i });

      expect(closeButton).toBeInTheDocument();

      userEvent.click(closeButton);

      userEvent.click(screen.getByTestId('feedback-component-button'));

      expect(closeButton).not.toBeInTheDocument();

      expect(window.dataLayer).toEqual([
        {
          event: 'customEvent',
          eventCategory: 'Post Lead Survey',
          eventAction: 'propertyAvailable',
          eventLabel: 'offering-type - agentId - broker',
        },
      ]);
    });

    it('should make a request if clicked answer is no', async () => {
      const fetchMock = mockWindowFetch();
      render(
        <FiltersContextProvider {...filtersContextPropsStub()}>
          <CallingAgentModalFeedbackComponentModule.CallingAgentModalFeedbackComponent
            onAnswerClicked={jest.fn()}
            propertyId={propertyId}
          />
        </FiltersContextProvider>
      );
      const answerButton = screen.getByText('no');
      userEvent.click(answerButton);

      await waitFor(() =>
        expect(fetchMock).toHaveBeenCalledWith(
          expect.anything(),
          expect.objectContaining({
            body: JSON.stringify({
              data: {
                type: 'property_report',
                attributes: {
                  email: 'report@report.com',
                  message: 'Property Not Available - Call Lead Pop-up',
                  reason_id: PropertyReportReasonEnum.notAvailable,
                  reporter_type: PropertyReportUserTypeEnum.renter,
                },
              },
            }),
          })
        )
      );
    });
  });
});
