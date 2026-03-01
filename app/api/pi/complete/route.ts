import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { paymentId, txid } = await req.json();
    if (!paymentId || !txid) {
      return NextResponse.json({ error: "paymentId and txid required" }, { status: 400 });
    }
    const response = await fetch(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ txid }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: response.status });
    }
    return NextResponse.json({ success: true, payment: data });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
