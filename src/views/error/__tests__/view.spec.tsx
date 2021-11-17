import { render, screen } from '@testing-library/react';

import { ErrorView } from '../view';
import { ErrorViewPropsInterface } from '../view-props.interface';

describe('EmailView', () => {
  let props: ErrorViewPropsInterface;

  beforeEach(() => {
    props = {
      statusCode: 404,
      error: 'Page not found',
    };
  });

  it('renders without throwing any errors', () => {
    const { container } = render(<ErrorView {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should display view with correct values', () => {
    props = {
      statusCode: 500,
      error: 'A server error occurred',
    };

    render(<ErrorView {...props} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('500');
    expect(screen.getByText('A server error occurred'));
  });
});
