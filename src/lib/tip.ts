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

const DECIMAL_PATTERN = /^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/;

export function parseDecimal(raw: string): number | null {
  if (typeof raw !== 'string') {
    return null;
  }
  const trimmed = raw.trim();
  if (trimmed === '' || !DECIMAL_PATTERN.test(trimmed)) {
    return null;
  }
  const normalized = trimmed.replace(',', '.');
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

function validateAmount(raw: string): string | undefined {
  if (raw.trim() === '') {
    return 'Bitte einen Betrag eingeben.';
  }
  const value = parseDecimal(raw);
  if (value === null) {
    return 'Bitte eine gültige Zahl eingeben.';
  }
  if (value < 0) {
    return 'Der Betrag darf nicht negativ sein.';
  }
  return undefined;
}

function validateTipPercent(raw: string): string | undefined {
  if (raw.trim() === '') {
    return 'Bitte ein Trinkgeld in Prozent eingeben.';
  }
  const value = parseDecimal(raw);
  if (value === null) {
    return 'Bitte eine gültige Zahl eingeben.';
  }
  if (value < 0) {
    return 'Das Trinkgeld darf nicht negativ sein.';
  }
  return undefined;
}

function validatePersons(raw: string): string | undefined {
  if (raw.trim() === '') {
    return 'Bitte die Personenzahl eingeben.';
  }
  const value = parseDecimal(raw);
  if (value === null) {
    return 'Bitte eine gültige Zahl eingeben.';
  }
  if (value < 0) {
    return 'Die Personenzahl darf nicht negativ sein.';
  }
  if (value === 0) {
    return 'Die Personenzahl muss mindestens 1 sein.';
  }
  if (!Number.isInteger(value)) {
    return 'Die Personenzahl muss eine ganze Zahl sein.';
  }
  return undefined;
}

export function validateInput(input: TipInput): FieldErrors {
  const errors: FieldErrors = {};

  const amountError = validateAmount(input.amount);
  if (amountError !== undefined) {
    errors.amount = amountError;
  }

  const tipError = validateTipPercent(input.tipPercent);
  if (tipError !== undefined) {
    errors.tipPercent = tipError;
  }

  const personsError = validatePersons(input.persons);
  if (personsError !== undefined) {
    errors.persons = personsError;
  }

  return errors;
}

export function calculateTip(input: TipInput): TipResult | null {
  if (Object.keys(validateInput(input)).length > 0) {
    return null;
  }

  const amount = parseDecimal(input.amount);
  const tipPercent = parseDecimal(input.tipPercent);
  const persons = parseDecimal(input.persons);

  if (amount === null || tipPercent === null || persons === null) {
    return null;
  }

  const amountCents = Math.round(amount * 100);
  const tipCents = Math.round((amountCents * tipPercent) / 100);
  const totalCents = amountCents + tipCents;
  const perPersonCents = Math.round(totalCents / persons);

  return { tipCents, totalCents, perPersonCents };
}

export function formatEuro(cents: number): string {
  const rounded = Math.round(cents);
  const sign = rounded < 0 ? '-' : '';
  const absolute = Math.abs(rounded);
  const euros = Math.floor(absolute / 100);
  const centPart = absolute % 100;
  const grouped = String(euros).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const centString = String(centPart).padStart(2, '0');
  return `${sign}${grouped},${centString} €`;
}
