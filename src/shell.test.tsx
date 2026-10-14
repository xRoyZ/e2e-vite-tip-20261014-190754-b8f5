import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('app shell', () => {
  it('renders the calculator frame with its heading', () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).toContain('Trinkgeld-Rechner');
    expect(html).toContain('Betrag');
    expect(html).toContain('Pro Person');
  });

  it('shows no numeric result while the input is empty', () => {
    const html = renderToStaticMarkup(<App />);

    expect(html).not.toMatch(/\d[\d.]*,\d{2}\s*€/);
    expect(html).not.toContain('NaN');
    expect(html).not.toContain('Infinity');
  });
});
