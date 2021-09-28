/**
 * @jest-environment jsdom
 */

import { render, RenderResult, screen } from '@testing-library/react';

import { LanguageSelectorComponent } from '../component';

describe('LanguageSelectorComponent', () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(<LanguageSelectorComponent />);
  });

  it('should render without throwing any errors', () => {
    expect(renderResult.container).toMatchSnapshot();
  });

  it('should link take values correctly', () => {
    const link = screen.getByRole('link', { name: 'language-selector' });

    expect(link).toHaveAttribute('href', '/ar/search?c=4');
    expect(link).toHaveTextContent('menu.language.ar');
  });
});
