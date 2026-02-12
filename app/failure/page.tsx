export default function FailurePage() {
  return (
    <div className="container">
      <section className="hero">
        <div>
          <div className="badge">❌ Pago no completado</div>
          <h1 className="h1">No se pudo procesar el pago</h1>
          <p className="sub">
            No te preocupes: no se te cobró (o el intento fue rechazado). Podés intentar nuevamente.
          </p>

          <div className="actions">
            <a className="btn" href="/">
              Reintentar compra
            </a>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <div className="h2" style={{ marginBottom: 10 }}>Causas comunes</div>
            <ul className="list">
              <li className="li"><span className="dot" /> Fondos insuficientes o límite de la tarjeta.</li>
              <li className="li"><span className="dot" /> Datos incorrectos o verificación pendiente.</li>
              <li className="li"><span className="dot" /> Cancelación del pago.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
