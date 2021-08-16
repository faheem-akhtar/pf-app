/**
 * @jest-environment jsdom
 */

import { shallow } from 'enzyme';

import { AppearOnScrollStatusEnum } from '../status.enum';
import { AppearOnScrollTemplate } from '../template';

describe('AppearOnScrollTemplate', () => {
  it('should render template without an error', () => {
    const wrapper = shallow(
      <AppearOnScrollTemplate status={AppearOnScrollStatusEnum.ENTERING} className={'additional class'}>
        <div />
      </AppearOnScrollTemplate>
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
