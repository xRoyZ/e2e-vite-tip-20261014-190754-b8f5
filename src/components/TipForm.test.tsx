import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import TipForm from './TipForm';

describe('TipForm', () => {
  it('renders the three labelled, keyboard-reachable fields', () => {
    const html = renderToStaticMarkup(<TipForm />);

    expect(html).toContain('Betrag (€)');
    expect(html).toContain('Trinkgeld (%)');
    expect(html).toContain('Personenzahl');

    expect(html).toContain('label class="field-label" for="amount"');
    expect(html).toContain('id="amount"');
    expect(html).toContain('for="tipPercent"');
    expect(html).toContain('id="tipPercent"');
    expect(html).toContain('for="persons"');
    expect(html).toContain('id="persons"');
  });

  it('shows no validation error on a freshly loaded form', () => {
    const html = renderToStaticMarkup(<TipForm />);

    expect(html).not.toContain('field-error');
    expect(html).not.toContain('Bitte');
    expect(html).not.toContain('NaN');
    expect(html).not.toContain('Infinity');
  });

  it('shows no numeric value in the result block without input', () => {
    const html = renderToStaticMarkup(<TipForm />);

    expect(html).not.toMatch(/\d[\d.]*,\d{2}\s*€/);
    expect(html).toContain('—');
  });
});
