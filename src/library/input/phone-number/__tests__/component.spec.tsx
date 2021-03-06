import { render, screen } from '@testing-library/react';

import { mockReactUseSwr } from 'mocks/react/use-swr.mock';
import { countryPhoneCodesStub } from 'stubs/country-phone-codes/stub';

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
      data: [countryPhoneCodesStub()],
    });
    render(<InputPhoneNumberComponent {...props} />);

    const listItems = screen.getByRole('listitem');
    expect(listItems).toBeInTheDocument();
  });
});
