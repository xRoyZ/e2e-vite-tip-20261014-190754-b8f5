import { useTipCalculator } from '../hooks/useTipCalculator';
import type { FieldName } from '../lib/tip';
import ResultPanel from './ResultPanel';

type FieldConfig = {
  name: FieldName;
  label: string;
  placeholder: string;
  inputMode: 'decimal' | 'numeric';
  autoComplete: string;
};

const FIELDS: FieldConfig[] = [
  {
    name: 'amount',
    label: 'Betrag (€)',
    placeholder: 'z. B. 100,00',
    inputMode: 'decimal',
    autoComplete: 'off',
  },
  {
    name: 'tipPercent',
    label: 'Trinkgeld (%)',
    placeholder: 'z. B. 10',
    inputMode: 'decimal',
    autoComplete: 'off',
  },
  {
    name: 'persons',
    label: 'Personenzahl',
    placeholder: 'z. B. 4',
    inputMode: 'numeric',
    autoComplete: 'off',
  },
];

export default function TipForm() {
  const { input, touched, errors, result, setField, touchField } =
    useTipCalculator();

  return (
    <form
      className="tip-form"
      noValidate
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="inputs">
        {FIELDS.map((field) => {
          const errorId = `${field.name}-error`;
          const showError = touched[field.name] && Boolean(errors[field.name]);

          return (
            <div className="field" key={field.name}>
              <label className="field-label" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                className={showError ? 'input input--error' : 'input'}
                type="text"
                inputMode={field.inputMode}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={input[field.name]}
                aria-invalid={showError}
                aria-describedby={showError ? errorId : undefined}
                onChange={(event) => setField(field.name, event.target.value)}
                onBlur={() => touchField(field.name)}
              />
              {showError ? (
                <p className="field-error" id={errorId} role="alert">
                  {errors[field.name]}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <hr className="divider" />

      <ResultPanel result={result} />
    </form>
  );
}
