export default function SuccessPage() {
  return (
    <div className="container">
      <section className="hero">
        <div>
          <div className="badge">✅ Pago aprobado • Entrega automática por email</div>
          <h1 className="h1">¡Compra confirmada!</h1>
          <p className="sub">
            Te enviamos un email con los links de descarga. Revisá también “Promociones” o “Spam”
            por si acaso.
          </p>

          <div className="actions">
            <a className="btn" href="/">
              Volver al inicio
            </a>
          </div>

          <div className="card" style={{ marginTop: 18 }}>
            <div className="h2" style={{ marginBottom: 10 }}>Tips rápidos</div>
            <ul className="list">
              <li className="li"><span className="dot" /> Guardá el email para volver a descargar.</li>
              <li className="li"><span className="dot" /> Si no llega en 2 minutos, revisá Spam.</li>
              <li className="li"><span className="dot" /> Si compraste con otro email, revisá ese inbox.</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="h2" style={{ marginBottom: 10 }}>¿Qué sigue?</div>
          <p className="sub" style={{ marginTop: 0 }}>
            Descargá el pack desde el email y empezá a imprimir/sublimar.
          </p>
        </div>
      </section>
    </div>
  );
}
