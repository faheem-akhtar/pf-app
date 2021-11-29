import { render, screen } from '@testing-library/react';

import { PropertyCardMenuContentButtonTemplate } from '../template';
import { PropertyCardMenuContentButtonTemplatePropsInterface } from '../template-props.interface';

describe('PropertyCardMenuContentButtonTemplate', () => {
  let props: PropertyCardMenuContentButtonTemplatePropsInterface;

  beforeEach(() => {
    props = {
      label: 'Label',
      onClick: jest.fn(),
    };
  });

  it('should renders without throwing any errors', () => {
    const { container } = render(<PropertyCardMenuContentButtonTemplate {...props} />);

    expect(container).toMatchSnapshot();
    expect(screen.queryByTestId('tag')).not.toBeInTheDocument();
  });

  it('should tag is active', () => {
    render(<PropertyCardMenuContentButtonTemplate {...props} isNew tag='New' />);

    expect(screen.getByTestId('tag')).toBeInTheDocument();
  });
});
