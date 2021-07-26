import { mount, ReactWrapper } from 'enzyme';

import { HeaderComponent } from '../component';

describe('HeaderComponent', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<HeaderComponent />);
  });

  it('should create the wrapper', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
