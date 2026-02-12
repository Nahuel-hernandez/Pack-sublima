export default function PendingPage() {
  return (
    <div className="container">
      <section className="hero">
        <div>
          <div className="badge">⏳ Pago pendiente</div>
          <h1 className="h1">Tu pago está en proceso</h1>
          <p className="sub">
            Cuando Mercado Pago lo confirme como aprobado, te mandamos automáticamente el email con
            los links de descarga.
          </p>

          <div className="actions">
            <a className="btn" href="/">
              Volver al inicio
            </a>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <div className="h2" style={{ marginBottom: 10 }}>¿Cuánto tarda?</div>
            <ul className="list">
              <li className="li"><span className="dot" /> Puede demorar unos minutos según el método de pago.</li>
              <li className="li"><span className="dot" /> Si se aprueba, te llega el email automáticamente.</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="h2" style={{ marginBottom: 10 }}>Tip</div>
          <p className="sub" style={{ marginTop: 0 }}>
            Si pagaste con transferencia o medios offline, el estado puede tardar más.
          </p>
          <div style={{ opacity: 0.9 }}>
            Apenas se acredite, te llega el acceso.
          </div>
        </div>
      </section>
    </div>
  );
}
