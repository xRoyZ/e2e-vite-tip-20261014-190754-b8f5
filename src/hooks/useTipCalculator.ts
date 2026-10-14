import { useState } from 'react';
import type { FieldErrors, FieldName, TipInput, TipResult } from '../lib/tip';

export function useTipCalculator(): {
  input: TipInput;
  touched: Record<FieldName, boolean>;
  errors: FieldErrors;
  result: TipResult | null;
  setField: (field: FieldName, value: string) => void;
  touchField: (field: FieldName) => void;
} {
  const [input, setInput] = useState<TipInput>({
    amount: '',
    tipPercent: '',
    persons: '',
  });
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    amount: false,
    tipPercent: false,
    persons: false,
  });

  const errors: FieldErrors = {};
  const result: TipResult | null = null;

  function setField(field: FieldName, value: string): void {
    setInput((previous) => ({ ...previous, [field]: value }));
  }

  function touchField(field: FieldName): void {
    setTouched((previous) => ({ ...previous, [field]: true }));
  }

  return { input, touched, errors, result, setField, touchField };
}
