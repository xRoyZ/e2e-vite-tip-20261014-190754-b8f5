import { formatEuro } from '../lib/tip';
import type { ResultPanelProps } from '../lib/tip';

export default function ResultPanel({ result }: ResultPanelProps) {
  const tipValue = result === null ? '—' : formatEuro(result.tipCents);
  const totalValue = result === null ? '—' : formatEuro(result.totalCents);
  const perPersonValue =
    result === null ? '—' : formatEuro(result.perPersonCents);
  const emptyClass = result === null ? ' result-value--empty' : '';

  return (
    <div className="result-block">
      <div className="result-row">
        <span className="result-label">Trinkgeld</span>
        <span className={`result-value${emptyClass}`}>{tipValue}</span>
      </div>
      <div className="result-row">
        <span className="result-label">Gesamt</span>
        <span className={`result-value${emptyClass}`}>{totalValue}</span>
      </div>
      <div className="result-row result-row--highlight">
        <span className="result-label">Pro Person</span>
        <span className={`result-value${emptyClass}`}>{perPersonValue}</span>
      </div>
    </div>
  );
}
