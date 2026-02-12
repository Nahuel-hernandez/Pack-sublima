import { MercadoPagoConfig, Payment } from "mercadopago";
import nodemailer from "nodemailer";

function getPaymentId(body: any) {
  return body?.data?.id ?? body?.id ?? null;
}

async function sendEmail(to: string) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const drive1 = process.env.DRIVE_URL_1;
  const drive2 = process.env.DRIVE_URL_2;

  if (!user || !pass) throw new Error("Faltan GMAIL_USER o GMAIL_APP_PASSWORD");
  if (!drive1 || !drive2) throw new Error("Faltan DRIVE_URL_1 o DRIVE_URL_2");

  const title = process.env.PRODUCT_TITLE ?? "FINAL BOSS PACK";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `${title} <${user}>`,
    to,
    subject: `✅ Acceso a tu compra: ${title}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.5">
        <h2>🎉🎉 Gracias por tu compra! 🎉🎉</h2>
        <p>Acá tenés los links de descarga:</p>
        <ul>
          <li><a href="${drive1}">Drive 1 (Pack)</a></li>
          <li><a href="${drive2}">Drive 2 (Cursos)</a></li>
        </ul>
        <p>Si necesitás ayuda, respondé este email.</p>
      </div>
    `,
  });
}

export async function POST(req: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) return new Response("Missing MP_ACCESS_TOKEN", { status: 500 });

    const body = await req.json();

    // Si viene un evento que no es pago, lo ignoramos
    const topic = body?.type ?? body?.topic;
    if (topic && topic !== "payment" && topic !== "payments") {
      return Response.json({ ok: true });
    }

    const paymentId = getPaymentId(body);
    if (!paymentId) return Response.json({ ok: true });

    const client = new MercadoPagoConfig({ accessToken });
    const payment = new Payment(client);

    const pay = await payment.get({ id: paymentId });

    if (pay.status === "approved" && pay.date_approved && pay.payer?.email) {
      await sendEmail(pay.payer.email);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("WEBHOOK ERROR:", err);
    return Response.json({ ok: true });
  }
}
    