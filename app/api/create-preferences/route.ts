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

    const client = new MercadoPagoConfig({ accessToken });
    const preference = new Preference(client);
    console.log("USANDO ROUTE NUEVO ✅", { baseUrl, success: `${baseUrl}/success` });


    const result = await preference.create({
      body: {
        items: [
          {
            id: "final-boss-pack",
            title: "FINAL BOSS PACK",
            quantity: 1,
            currency_id: "ARS",
            unit_price: 20000,
          },
        ],
        payer: { email: String(email) },

        // ✅ PLURAL: back_urls
       back_urls: {
  success: "http://localhost:3000/success",
  failure: "http://localhost:3000/failure",
  pending: "http://localhost:3000/pending",
},


      },
    });

    return Response.json({
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (err: any) {
    console.error("MP create preference error:", err);
    return new Response(JSON.stringify({ error: err?.message ?? "error" }), { status: 500 });
  }
}
