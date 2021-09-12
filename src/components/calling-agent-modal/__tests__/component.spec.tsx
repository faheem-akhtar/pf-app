/**
 * @jest-environment jsdom
 */
import { act, fireEvent, render, waitFor } from '@testing-library/react';

import { CallingAgentModalComponent } from '../component';
import { CallingAgentModalComponentPropsInterface } from '../component-props.interface';
import { CallingAgentModalFeedbackComponent } from '../feedback-component';
import { filtersContextPropsStub } from 'stubs/filters/context-props.stub';
import { FiltersContextProvider } from 'components/filters/context-provider';
import { fireEvent as fireDOMEvent } from '@testing-library/dom';
import { mockModalEnv } from 'mocks/modal-env/mock';
import { mockReactUseSwr } from 'mocks/react/mock-use-swr';
import { mockWindowFetch } from 'mocks/window/fetch.mock';
import { PropertyReportReasonEnum } from 'enums/property/report/reason.enum';
import { PropertyReportUserTypeEnum } from 'enums/property/report/user-type.enum';
import { propertySerpObfuscatedGetId } from 'components/property/serp/obfuscated/get/id';
import { propertySerpObfuscatedGetReference } from 'components/property/serp/obfuscated/get/reference';
import { PropertySerpObfuscatedType } from 'components/property/serp/obfuscated/type';
import { propertyStub } from 'stubs/property/stub';

describe('CallingAgentModalComponent', () => {
  const property: PropertySerpObfuscatedType = propertyStub();
  let props: CallingAgentModalComponentPropsInterface;
  let referenceId: string;
  let propertyId: string;

  const openRef = { current: jest.fn() };
  const closeRef = { current: jest.fn() };

  beforeEach(() => {
    referenceId = propertySerpObfuscatedGetReference(property);
    propertyId = propertySerpObfuscatedGetId(property);
    props = {
      propertyId,
      referenceId,
      openRef,
      closeRef,
    };

    mockModalEnv();
  });

  it('should render without throwing any errors', () => {
    const { getByTestId } = render(<CallingAgentModalComponent {...props} />);
    act(openRef.current);
    expect(getByTestId('CallingAgentModalContent')).toMatchSnapshot();
  });

  it('should update title when close is clicked first time', async () => {
    const { getByTestId } = render(<CallingAgentModalComponent {...props} />);
    act(openRef.current);
    const titleElement = getByTestId('CallingAgentModalTitle');
    fireDOMEvent(titleElement.nextSibling as HTMLElement, new MouseEvent('click', { bubbles: true }));
    await waitFor(() => expect(titleElement.textContent).toBe('agent-modal/property-availability'));
  });

  it('should close modal when close is clicked second time', async () => {
    const { getByTestId, queryAllByTestId } = render(<CallingAgentModalComponent {...props} />);
    act(openRef.current);
    const closeButtonElement = getByTestId('CallingAgentModalCloseButton');

    fireDOMEvent(closeButtonElement, new MouseEvent('click', { bubbles: true }));
    fireDOMEvent(closeButtonElement, new MouseEvent('click', { bubbles: true }));
    await waitFor(() => expect(queryAllByTestId('CallingAgentModalCloseButton').length).toEqual(0));
  });

  test('if agent info is shown properly', async () => {
    mockReactUseSwr({ ok: true, data: { name: 'lorem', languages: ['a', 'b'], imageSrc: 'image' } });
    const { getByTestId } = render(<CallingAgentModalComponent {...props} />);
    act(openRef.current);
    await waitFor(() => expect(getByTestId('AgentInfoComponentDetails')).toMatchSnapshot());
  });

  it('should render feedback component when agen data exists and close is clicked first time', async () => {
    const { getByTestId, getByText } = render(<CallingAgentModalComponent {...props} />);
    act(openRef.current);
    const titleElement = getByTestId('CallingAgentModalTitle');
    mockReactUseSwr({ ok: true, data: { name: 'lorem', languages: ['a', 'b'], imageSrc: 'image' } });

    fireDOMEvent(titleElement.nextSibling as HTMLElement, new MouseEvent('click', { bubbles: true }));
    mockReactUseSwr({ ok: true, data: { name: 'lorem', languages: ['a', 'b'], imageSrc: 'image' } });
    await waitFor(() => expect(getByText('agent-modal/agent-not-answered')).toBeTruthy());
  });

  it('should call onAnswerClicked callback when a feedback button is clicked', async () => {
    const onAnswerClickedSpy = jest.fn();
    const { getAllByRole } = render(
      <CallingAgentModalFeedbackComponent onAnswerClicked={onAnswerClickedSpy} propertyId={propertyId} />
    );
    act(openRef.current);
    const [answerButton] = getAllByRole('button');
    fireEvent.click(answerButton);
    await waitFor(() => expect(onAnswerClickedSpy).toHaveBeenCalledTimes(1));
  });

  it('should make request if clicked answer is no', async () => {
    const fetchMock = mockWindowFetch();
    const { getByText } = render(
      <FiltersContextProvider {...filtersContextPropsStub()}>
        <CallingAgentModalFeedbackComponent onAnswerClicked={jest.fn()} propertyId={propertyId} />
      </FiltersContextProvider>
    );
    const answerButton = getByText('no');

    fireEvent.click(answerButton);
    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          body: JSON.stringify({
            propertyId,
            attributes: {
              email: 'report@report.com',
              message: 'Property Not Available - Call Lead Pop-up',
              reason_id: PropertyReportReasonEnum.notAvailable,
              reporter_type: PropertyReportUserTypeEnum.renter,
            },
          }),
        })
      )
    );
  });
});
