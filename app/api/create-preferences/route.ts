import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: Request) {
  try {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!accessToken) return new Response("Falta MP_ACCESS_TOKEN", { status: 500 });
    if (!baseUrl) return new Response("Falta NEXT_PUBLIC_BASE_URL", { status: 500 });

    const { email } = await req.json();

    if (!email || !String(email).includes("@")) {
      return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400 });
    }

    const title = process.env.PRODUCT_TITLE ?? "FINAL BOSS PACK";
    const price = Number(process.env.PRODUCT_PRICE_ARS ?? 20000);

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: "final-boss-pack",
            title,
            quantity: 1,
            currency_id: "ARS",
            unit_price: price,
          },
        ],

        payer: { email: String(email) },

        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },

        // ✅ opcional: si lo querés activo
        // auto_return: "approved",

        // ✅ esto conecta con TU webhook en Vercel
        notification_url: `${baseUrl}/api/mp/webhook`,
      },
    });

    return Response.json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (err: any) {
    console.error("CREATE PREFERENCE ERROR:", err);
    return new Response(JSON.stringify({ error: err?.message ?? "error" }), { status: 500 });
  }
}

