import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { functionSelf } from 'helpers/function/self';

import { PropertyCardMenuContentTemplate } from '../template';
import { PropertyCardMenuContentTemplatePropsInterface } from '../template-props.interface';

describe('PropertyCardMenuContentTemplate', () => {
  let props: PropertyCardMenuContentTemplatePropsInterface;
  const socialShareOpenRef = { current: jest.fn() };
  const reportOpenRef = { current: jest.fn() };

  beforeEach(() => {
    props = {
      socialShareOpenRef,
      reportOpenRef,
      t: functionSelf,
    };
  });

  it('should render without throwing any errors', () => {
    const { container } = render(<PropertyCardMenuContentTemplate {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should call social share modal', () => {
    render(<PropertyCardMenuContentTemplate {...props} />);
    act(socialShareOpenRef.current);

    userEvent.click(screen.getByRole('button', { name: /share/i }));

    expect(socialShareOpenRef.current).toHaveBeenCalled();
  });

  it('should call report modal', () => {
    render(<PropertyCardMenuContentTemplate {...props} />);
    act(socialShareOpenRef.current);

    userEvent.click(screen.getByRole('button', { name: /report/i }));

    expect(reportOpenRef.current).toHaveBeenCalled();
  });
});
