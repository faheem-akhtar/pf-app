import { render } from '@testing-library/react';

import { HeadTrackersTemplate } from '../trackers-template';

describe('HeadTrackersTemplate', () => {
  it('should render without error', () => {
    const { container } = render(<HeadTrackersTemplate snowplowHost={'c.propertyfinderdata.com'} />);

    expect(container.innerHTML).toMatchSnapshot();
  });
});
