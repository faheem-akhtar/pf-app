/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';

import { mockReactUseSwr } from 'mocks/react/use-swr.mock';

import { InputPhoneNumberComponent } from '../component';
import { InputPhoneNumberComponentPropsInterface } from '../component-props.interface';

describe('EmailAgentModalFormWidgetPhoneComponent', () => {
  let props: InputPhoneNumberComponentPropsInterface;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      value: '',
    };
  });

  it('should display skeleton template when the countries empty', () => {
    mockReactUseSwr('en-countries-GET-{"sort":"priority"}', { ok: false });
    render(<InputPhoneNumberComponent {...props} />);

    expect(screen.getByTestId('skeleton-template')).toBeInTheDocument();
  });

  it('should display phone number field with initial value', () => {
    mockReactUseSwr('en-countries-GET-{"sort":"priority"}', {
      ok: true,
      data: [
        { code: 'ae', name: 'United Arab Emirates', phoneCode: '+971' },
        { code: 'tr', name: 'Turkey', phoneCode: '+90' },
      ],
    });
    render(<InputPhoneNumberComponent {...props} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });
});
