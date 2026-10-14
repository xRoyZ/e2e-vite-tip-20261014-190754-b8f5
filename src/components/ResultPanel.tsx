import type { ResultPanelProps } from '../lib/tip';

export default function ResultPanel({ result }: ResultPanelProps) {
  const placeholder = '—';

  return (
    <div className="result-block">
      <div className="result-row">
        <span className="result-label">Trinkgeld</span>
        <span className="result-value result-value--empty">{placeholder}</span>
      </div>
      <div className="result-row">
        <span className="result-label">Gesamt</span>
        <span className="result-value result-value--empty">{placeholder}</span>
      </div>
      <div className="result-row result-row--highlight">
        <span className="result-label">Pro Person</span>
        <span className="result-value result-value--empty">{placeholder}</span>
      </div>
    </div>
  );
}
