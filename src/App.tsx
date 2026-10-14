import TipForm from './components/TipForm';

export default function App() {
  return (
    <main className="page">
      <div className="container">
        <h1 className="page-title">Trinkgeld-Rechner</h1>
        <section className="card">
          <TipForm />
        </section>
      </div>
    </main>
  );
}
