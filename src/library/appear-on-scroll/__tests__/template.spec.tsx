import { shallow } from 'enzyme';

import { AppearOnScrollStatusEnum } from '../status.enum';
import { AppearOnScrollTemplate } from '../template';

describe('AppearOnScrollTemplate', () => {
  it('should render template without an error', () => {
    const wrapper = shallow(
      <AppearOnScrollTemplate
        status={AppearOnScrollStatusEnum.ENTERING}
        className={'additional class'}
        children={'123'}
      />
    );

    expect(wrapper.html()).toMatchSnapshot();
  });
});
