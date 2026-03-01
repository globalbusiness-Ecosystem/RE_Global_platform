import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { payment } = await req.json();
    if (!payment?.identifier) {
      return NextResponse.json({ success: true });
    }
    const res = await fetch(
      `https://api.minepi.com/v2/payments/${payment.identifier}`,
      { headers: { Authorization: `Key ${process.env.PI_API_KEY}` } }
    );
    const data = await res.json();
    if (data.status?.developer_approved && !data.status?.developer_completed) {
      await fetch(
        `https://api.minepi.com/v2/payments/${payment.identifier}/complete`,
        {
          method: "POST",
          headers: {
            Authorization: `Key ${process.env.PI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ txid: data.transaction?.txid }),
        }
      );
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
