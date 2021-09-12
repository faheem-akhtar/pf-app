/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import { contactOptionsDisabledStub } from 'stubs/contact-options/disabled.stub';
import { contactOptionsEnabledStub } from 'stubs/contact-options/enabled.stub';
import { PropertyCardCtaButtonsGroupTemplate } from '../template';
import { PropertyCardCtaButtonsGroupTemplatePropsInterface } from '../template-props.interface';

const makeDefaultProps = (): PropertyCardCtaButtonsGroupTemplatePropsInterface => ({
  contactOptions: contactOptionsEnabledStub,
  onCallClick: jest.fn(),
  onWhatsappClick: jest.fn(),
  onEmailClick: jest.fn(),
  t: (x: string): string => x,
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
    const { getByText } = render(
      <PropertyCardCtaButtonsGroupTemplate
        {...defaultProps}
        contactOptions={{
          ...defaultProps.contactOptions,
          whatsapp: {
            type: 'whatsapp',
            value: '5555555',
            link: 'phone://5555555',
          },
        }}
      />
    );

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
      <PropertyCardCtaButtonsGroupTemplate {...defaultProps} contactOptions={contactOptionsDisabledStub} />
    );

    expect(container.innerHTML).toMatchInlineSnapshot(`"<div class=\\"container\\"></div>"`);
  });
});
