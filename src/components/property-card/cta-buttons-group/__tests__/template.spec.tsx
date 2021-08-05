/**
 * @jest-environment jsdom
 */

import { shallow } from 'enzyme';

import { ContactOptionsDisabledMock } from 'mocks/contact-options/disabled-mock';
import { ContactOptionsMock } from 'mocks/contact-options/mock';
import { PropertyCardCtaButtonsGroupButtonTemplate } from '../button/template';
import { PropertyCardCtaButtonsGroupTemplate } from '../template';
import { PropertyCardCtaButtonsGroupTemplatePropsInterface } from '../template-props.interface';

const makeDefaultProps = (): PropertyCardCtaButtonsGroupTemplatePropsInterface => ({
  contactOptions: ContactOptionsMock,
  onCallClick: jest.fn(),
  onWhatsappClick: jest.fn(),
  onEmailClick: jest.fn(),
  loading: false,
});

describe('PropertyCardCtaButtonsGroupTemplate', () => {
  it('should call onCallClick prop', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = shallow(<PropertyCardCtaButtonsGroupTemplate {...defaultProps} />);

    const callButton = wrapper.find(PropertyCardCtaButtonsGroupButtonTemplate).at(0);

    (callButton.props().onClick as Function)();

    expect(defaultProps.onCallClick).toHaveBeenCalled();
  });

  it('should call onWhatsappClick prop', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = shallow(<PropertyCardCtaButtonsGroupTemplate {...defaultProps} />);

    const waButton = wrapper.find(PropertyCardCtaButtonsGroupButtonTemplate).at(1);

    (waButton.props().onClick as Function)();

    expect(defaultProps.onWhatsappClick).toHaveBeenCalled();
  });

  it('should call onEmailClick prop', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = shallow(<PropertyCardCtaButtonsGroupTemplate {...defaultProps} />);

    const emailButton = wrapper.find(PropertyCardCtaButtonsGroupButtonTemplate).at(2);

    (emailButton.props().onClick as Function)();

    expect(defaultProps.onEmailClick).toHaveBeenCalled();
  });

  it('should not render any buttons if options are not there', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = shallow(
      <PropertyCardCtaButtonsGroupTemplate {...defaultProps} contactOptions={ContactOptionsDisabledMock} />
    );
    const buttons = wrapper.find(PropertyCardCtaButtonsGroupButtonTemplate);

    expect(buttons.length).toBe(0);
  });
});
