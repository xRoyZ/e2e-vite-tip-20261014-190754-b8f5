export type FieldName = 'amount' | 'tipPercent' | 'persons';

export type TipInput = {
  amount: string;
  tipPercent: string;
  persons: string;
};

export type TipResult = {
  tipCents: number;
  totalCents: number;
  perPersonCents: number;
};

export type FieldErrors = Partial<Record<FieldName, string>>;

export type ResultPanelProps = {
  result: TipResult | null;
};

export function parseDecimal(raw: string): number | null {
  return null;
}

export function validateInput(input: TipInput): FieldErrors {
  return {};
}

export function calculateTip(input: TipInput): TipResult | null {
  return null;
}

export function formatEuro(cents: number): string {
  return '';
}
