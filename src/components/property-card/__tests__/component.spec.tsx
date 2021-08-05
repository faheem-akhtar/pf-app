/**
 * @jest-environment jsdom
 */
import { mount, shallow } from 'enzyme';
import { mockUseSwr } from 'mocks/mock/use-swr';

import { CallingAgentModalComponent } from 'components/calling-agent-modal/component';
import { EmailAgentModalComponent } from 'components/email-agent-modal/component';
import { PropertyCardComponent } from '../component';
import { PropertyCardComponentPropsType } from '../component-props.type';
import { PropertyCardTemplate } from '../template';
import { PropertyMock } from 'mocks/property/mock';

const makeDefaultProps = (): PropertyCardComponentPropsType => ({
  property: PropertyMock,
  loading: false,
});

describe('PropertyCardComponent', () => {
  /**
   * Gallery
   */
  it('Initial gallery images, before gallery touched', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = shallow(<PropertyCardComponent {...defaultProps} />);

    expect(wrapper.find(PropertyCardTemplate).props().gallery.items).toMatchSnapshot();
  });

  it('should load images when gallery is touched', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = shallow(<PropertyCardComponent {...defaultProps} />);

    const {
      gallery: { onTouch },
    } = wrapper.find(PropertyCardTemplate).props();
    mockUseSwr(['i1', 'i2', 'i3']);
    onTouch();
    wrapper.update();
    expect(wrapper.find(PropertyCardTemplate).props().gallery.items).toMatchSnapshot();
  });

  /**
   * CTA buttons
   */
  it('should open you are calling dialog', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = mount(<PropertyCardComponent {...defaultProps} />);

    const {
      ctaButtons: { onCallClick },
    } = wrapper.find(PropertyCardTemplate).props();
    const spy = (wrapper.find(CallingAgentModalComponent).props().openRef.current = jest.fn());
    onCallClick();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should open email modal on email click', () => {
    const defaultProps = makeDefaultProps();
    const wrapper = mount(<PropertyCardComponent {...defaultProps} />);

    const {
      ctaButtons: { onEmailClick },
    } = wrapper.find(PropertyCardTemplate).props();
    const spy = (wrapper.find(EmailAgentModalComponent).props().openRef.current = jest.fn());
    onEmailClick();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
