import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AccordionComponent } from '../component';
import { AccordionPanelTemplate } from '../panel/template';

describe('AccordionComponent', () => {
  it('should render without throwing any errors', () => {
    const { container } = render(
      <AccordionComponent title='Popular searches' expanded>
        <AccordionPanelTemplate>content</AccordionPanelTemplate>
      </AccordionComponent>
    );

    expect(container).toMatchSnapshot();
  });

  it('should expanded state works properly', () => {
    const { rerender } = render(
      <AccordionComponent title='Popular searches'>
        <AccordionPanelTemplate>content</AccordionPanelTemplate>
      </AccordionComponent>
    );

    expect(screen.queryByText('content')).not.toBeInTheDocument();

    userEvent.click(screen.getByText('Popular searches'));

    rerender(
      <AccordionComponent title='Popular searches' expanded>
        <AccordionPanelTemplate>content</AccordionPanelTemplate>
      </AccordionComponent>
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('should render multiple content', () => {
    const items = ['Apartments for rent', 'Villas for rent', 'Townhouses for rent'];

    render(
      <AccordionComponent title='Popular searches' expanded>
        <ul role='list'>
          {items.map((item, index) => (
            <AccordionPanelTemplate key={index} listItem>
              {item}
            </AccordionPanelTemplate>
          ))}
        </ul>
      </AccordionComponent>
    );

    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
