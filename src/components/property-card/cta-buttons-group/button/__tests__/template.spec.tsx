/**
 * @jest-environment jsdom
 */

import { shallow } from 'enzyme';

import { ButtonTemplate } from 'library/button/template';
import { IconSolidWhatsappTemplate } from 'components/icon/solid/whatsapp-template';
import { PropertyCardCtaButtonsGroupButtonTemplate } from '../template';
import { PropertyCardCtaButtonsGroupButtonTemplatePropsInterface } from '../template-props.interface';

const makeDefaultProps = (): PropertyCardCtaButtonsGroupButtonTemplatePropsInterface =>
  ({
    href: 'href',
    onClick: jest.fn(),
    iconComponent: IconSolidWhatsappTemplate,
    labelKey: 'label-key',
  } as PropertyCardCtaButtonsGroupButtonTemplatePropsInterface);

describe('PropertyCardCtaButtonsGroupButtonTemplate', () => {
  it('should call onClick on button click', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = shallow(<PropertyCardCtaButtonsGroupButtonTemplate {...defaultProps} />);

    const callButton = wrapper.find(ButtonTemplate);

    (callButton.props().onClick as Function)();

    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
