/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import { ContactOptionsDisabledMock } from 'mocks/contact-options/disabled-mock';
import { ContactOptionsMock } from 'mocks/contact-options/mock';
import { PropertyCardCtaButtonsGroupTemplate } from '../template';
import { PropertyCardCtaButtonsGroupTemplatePropsInterface } from '../template-props.interface';

const makeDefaultProps = (): PropertyCardCtaButtonsGroupTemplatePropsInterface => ({
  contactOptions: ContactOptionsMock,
  onCallClick: jest.fn(),
  onWhatsappClick: jest.fn(),
  onEmailClick: jest.fn(),
});

describe('PropertyCardCtaButtonsGroupTemplate', () => {
  it('should call onCallClick prop', () => {
    const defaultProps = makeDefaultProps();
    const { getByText } = render(<PropertyCardCtaButtonsGroupTemplate {...defaultProps} />);

    fireEvent.click(getByText('cta-call'));

    expect(defaultProps.onCallClick).toHaveBeenCalled();
  });

  it('should call onWhatsappClick prop', () => {
    const defaultProps = makeDefaultProps();
    const { getByText } = render(<PropertyCardCtaButtonsGroupTemplate {...defaultProps} />);

    fireEvent.click(getByText('cta-whatsapp'));

    expect(defaultProps.onWhatsappClick).toHaveBeenCalled();
  });

  it('should call onEmailClick prop', () => {
    const defaultProps = makeDefaultProps();
    const { getByText } = render(<PropertyCardCtaButtonsGroupTemplate {...defaultProps} />);

    fireEvent.click(getByText('cta-email'));

    expect(defaultProps.onEmailClick).toHaveBeenCalled();
  });

  it('should not render any buttons if options are not there', () => {
    const defaultProps = makeDefaultProps();
    const { container } = render(
      <PropertyCardCtaButtonsGroupTemplate {...defaultProps} contactOptions={ContactOptionsDisabledMock} />
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`"<div class=\\"container\\"></div>"`);
  });
});
