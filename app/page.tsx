"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const buy = async () => {
    setMsg(null);

    if (!email || !email.includes("@")) {
      setMsg("Ingresá un email válido para enviarte el pack.");
      return;
    }

    setLoading(true);
    try {
      // ✅ ESTA RUTA tiene que coincidir con tu carpeta:
      // app/api/create-preferences/route.ts  ->  /api/create-preferences
      const res = await fetch("/api/create-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMsg(data?.error ?? "No se pudo iniciar el pago.");
        return;
      }

      const url = data.init_point || data.sandbox_init_point;
      if (!url) {
        setMsg("No vino init_point desde Mercado Pago.");
        return;
      }

      window.location.href = url;
    } catch (e: any) {
      setMsg(e?.message ?? "Error iniciando pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <section className="hero">
        <div>
          <div className="badge">⚡  Mega pack para empezar a emprender ⚡  </div>
          <h1 className="h1">FINAL BOSS PACK</h1>
          <p className="sub">
            Pack de imágenes ,PNG,pdf y muchos formatos mas, listas para imprimir o editar a gusto.
            Ideal para emprendedores, tiendas, y creadores que quieren diseños con impacto. 
            Y no solo remeras, tambien tazas , almohadones y MAS !!!
          </p>

          <div className="priceRow">
            <div className="priceTag"><b>OFERTA IMPERDIBLE!!! $7.000 ARS</b></div>
          </div>

          {/* ✅ Solo agregamos esto: input email con estética compatible */}
          <div style={{ marginTop: 14 }}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email para recibir el pack"
              style={{
                width: "min(520px, 100%)",
                padding: "14px 14px",
                borderRadius: 12,
                border: "1px solid rgba(176, 38, 255, 0.35)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                boxShadow: "0 0 22px rgba(176, 38, 255, 0.20)",
                outline: "none",
              }}
            />
            {msg && (
              <div style={{ marginTop: 10, color: "#ff4d9d", textShadow: "0 0 12px rgba(255, 0, 93, 0.25)" }}>
                {msg}
              </div>
            )}
          </div>

          <div className="actions">
            <button className="btn" onClick={buy} disabled={loading}>
              {loading ? "Abriendo Mercado Pago..." : "Comprar pack"}
            </button>
            <button
              className="btn btnSecondary"
              onClick={() => window.scrollTo({ top: 99999, behavior: "smooth" })}
            >
              Ver previews
            </button>
          </div>

          <div className="kpis">
            <div className="kpi">
              <b>+1000 diseños</b>
              <span>Listos para imprimir</span>
            </div>
            <div className="kpi">
              <b>Alta calidad</b>
              <span>Ideal sublimado</span>
            </div>
            <div className="kpi">
              <b>Uso comercial</b>
              <span>Para que tu emprendimiento despegue </span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="h2" style={{ marginBottom: 10 }}>Incluye</div>
          <ul className="list">
            <li className="li"><span className="dot" /> MEGA PACK ANIME INCLUIDO</li>
            <li className="li"><span className="dot" /> Diseños listos para remera, almohadones , tazas, ropa de bebe, etc</li>
            <li className="li"><span className="dot" /> Mockups para que veas y publiques en tu pagina como quedarian en ya impresos. </li>
            <li className="li"><span className="dot" /> CURSO GRATUITO DE SUBLIMADO INCLUIDO JUNTO A RECURSOS GRAFICOS</li>

          </ul>
          <div style={{ marginTop: 14, opacity: 0.9 }}>
            ⚠️ El pack se entrega por email después del pago.
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="h2">Previews</h2>
        <div className="gallery">
          <img className="thumb" src="/gallery/1.png" alt="preview 1" />
          <img className="thumb" src="/gallery/2.png" alt="preview 2" />
          <img className="thumb" src="/gallery/3.png" alt="preview 3" />
          <img className="thumb" src="/gallery/4.png" alt="preview 4" />
           <img className="thumb" src="/gallery/5.png" alt="preview 5" />
          <img className="thumb" src="/gallery/6.png" alt="preview 6" />
          <img className="thumb" src="/gallery/7.png" alt="preview 7" />
          <img className="thumb" src="/gallery/8.png" alt="preview 8" />
          <img className="thumb" src="/gallery/9.png" alt="preview 9" />
        </div>
        </section>

      <section className="section">
        <h2 className="h2">FAQ</h2>
        <div className="faq">
          <div className="card">
            <div className="q">¿Cómo recibo el pack?</div>
            <div className="a">Después del pago, te llega un email con un link de acceso.</div>
          </div>
          <div className="card">
            <div className="q">¿Sirve para sublimado?</div>
            <div className="a">Sí, están preparados en PNG y alta calidad para impresión.</div>
          </div>
          <div className="card">
            <div className="q">¿Puedo usarlo comercialmente?</div>
            <div className="a">Sí, orientado a emprendedores.</div>
          </div>
        </div>
      </section>

      <div className="footer">
        © {new Date().getFullYear()} Final Boss Pack · Hecho en Argentina 🇦🇷
      </div>
    </div>
  );
}
