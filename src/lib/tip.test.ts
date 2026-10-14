import { describe, expect, it } from 'vitest';
import {
  calculateTip,
  formatEuro,
  parseDecimal,
  validateInput,
  type TipInput,
} from './tip';

function makeInput(overrides: Partial<TipInput> = {}): TipInput {
  return { amount: '100', tipPercent: '10', persons: '4', ...overrides };
}

describe('parseDecimal', () => {
  it('parses dot decimals', () => {
    expect(parseDecimal('12.5')).toBe(12.5);
  });

  it('parses comma decimals', () => {
    expect(parseDecimal('12,5')).toBe(12.5);
  });

  it('treats comma and dot as equivalent', () => {
    expect(parseDecimal('12,5')).toBe(parseDecimal('12.5'));
  });

  it('parses integers', () => {
    expect(parseDecimal('100')).toBe(100);
  });

  it('returns null for empty input', () => {
    expect(parseDecimal('')).toBeNull();
    expect(parseDecimal('   ')).toBeNull();
  });

  it('returns null for non-numeric input', () => {
    expect(parseDecimal('abc')).toBeNull();
    expect(parseDecimal('1.2.3')).toBeNull();
    expect(parseDecimal('12,')).toBe(12);
  });

  it('parses negatives', () => {
    expect(parseDecimal('-3')).toBe(-3);
    expect(parseDecimal('-3,5')).toBe(-3.5);
  });
});

describe('calculateTip', () => {
  it('computes tip, total and per person for the happy path', () => {
    expect(calculateTip(makeInput())).toEqual({
      tipCents: 1000,
      totalCents: 11000,
      perPersonCents: 2750,
    });
  });

  it('returns null while any field is invalid', () => {
    expect(calculateTip(makeInput({ amount: '' }))).toBeNull();
    expect(calculateTip(makeInput({ persons: '0' }))).toBeNull();
    expect(calculateTip(makeInput({ amount: '-5' }))).toBeNull();
    expect(calculateTip(makeInput({ amount: 'abc' }))).toBeNull();
  });

  it('rounds per person kaufmaennisch to whole cents (100 / 15 / 3)', () => {
    const result = calculateTip(makeInput({ amount: '100', tipPercent: '15', persons: '3' }));
    expect(result).not.toBeNull();
    expect(result!.perPersonCents).toBe(3833);
    expect(result!.tipCents).toBe(1500);
    expect(result!.totalCents).toBe(11500);
  });

  it('accepts comma and dot decimal separators with the same result', () => {
    const comma = calculateTip(makeInput({ tipPercent: '12,5' }));
    const dot = calculateTip(makeInput({ tipPercent: '12.5' }));
    expect(comma).toEqual(dot);
  });

  it('handles a 0 % tip', () => {
    const result = calculateTip(makeInput({ amount: '50', tipPercent: '0', persons: '2' }));
    expect(result).toEqual({ tipCents: 0, totalCents: 5000, perPersonCents: 2500 });
  });

  it('handles exactly one person', () => {
    const result = calculateTip(makeInput({ amount: '20', tipPercent: '10', persons: '1' }));
    expect(result).toEqual({ tipCents: 200, totalCents: 2200, perPersonCents: 2200 });
  });

  it('handles a very large amount', () => {
    const result = calculateTip(makeInput({ amount: '1000000', tipPercent: '10', persons: '2' }));
    expect(result).not.toBeNull();
    expect(result!.tipCents).toBe(10000000);
    expect(result!.totalCents).toBe(110000000);
    expect(result!.perPersonCents).toBe(55000000);
  });

  it('rounds tip to whole cents', () => {
    const result = calculateTip(makeInput({ amount: '9.99', tipPercent: '10', persons: '1' }));
    expect(result).not.toBeNull();
    expect(Number.isInteger(result!.tipCents)).toBe(true);
    expect(result!.tipCents).toBe(100);
  });
});

describe('validateInput', () => {
  it('returns no errors for valid input', () => {
    expect(validateInput(makeInput())).toEqual({});
  });

  it('flags an empty amount', () => {
    expect(validateInput(makeInput({ amount: '' })).amount).toBeTruthy();
  });

  it('flags non-numeric input', () => {
    expect(validateInput(makeInput({ amount: 'abc' })).amount).toBeTruthy();
    expect(validateInput(makeInput({ persons: 'x' })).persons).toBeTruthy();
    expect(validateInput(makeInput({ tipPercent: '!' })).tipPercent).toBeTruthy();
  });

  it('flags a negative amount', () => {
    expect(validateInput(makeInput({ amount: '-1' })).amount).toBeTruthy();
  });

  it('flags a person count of 0', () => {
    expect(validateInput(makeInput({ persons: '0' })).persons).toBeTruthy();
  });

  it('flags a non-integer person count', () => {
    expect(validateInput(makeInput({ persons: '2,5' })).persons).toBeTruthy();
  });
});

describe('formatEuro', () => {
  it('renders german notation with two decimals and euro sign', () => {
    expect(formatEuro(123450)).toBe('1.234,50 €');
    expect(formatEuro(0)).toBe('0,00 €');
    expect(formatEuro(5)).toBe('0,05 €');
    expect(formatEuro(100)).toBe('1,00 €');
  });

  it('never shows more than two decimals', () => {
    expect(formatEuro(3833)).toBe('38,33 €');
    expect(formatEuro(999999)).toBe('9.999,99 €');
  });
});
