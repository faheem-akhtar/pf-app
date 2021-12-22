import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AccordionComponent } from '../component';
import { AccordionItemComponent } from '../item/component';

describe('AccordionComponent', () => {
  it('should render without throwing any errors', () => {
    const { container } = render(
      <AccordionComponent>
        <AccordionItemComponent title='Popular searches' expanded>
          content
        </AccordionItemComponent>
      </AccordionComponent>
    );

    expect(container).toMatchSnapshot();
  });

  it('should expanded state works properly', () => {
    const { rerender } = render(
      <AccordionComponent>
        <AccordionItemComponent title='Popular searches'>content</AccordionItemComponent>
      </AccordionComponent>
    );

    expect(screen.queryByText('content')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('Popular searches'));

    rerender(
      <AccordionComponent>
        <AccordionItemComponent title='Popular searches' expanded>
          content
        </AccordionItemComponent>
      </AccordionComponent>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
