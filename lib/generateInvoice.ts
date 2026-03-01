export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  buyer: { name: string; username: string; };
  property: { title: string; location: string; type: string; };
  amount: number;
  txid: string;
}

export function downloadInvoice(data: InvoiceData) {
  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Arial,sans-serif;padding:40px;color:#333}
.logo{font-size:2.5rem;font-weight:900;color:#D4AF6A}
.header{display:flex;justify-content:space-between;padding-bottom:20px;border-bottom:3px solid #D4AF6A;margin-bottom:30px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:20px 0}
.box{background:#f8f8f8;border-radius:10px;padding:15px}
.lbl{font-size:0.7rem;color:#999;margin-bottom:4px}
.val{font-size:0.95rem;font-weight:600}
.amount{background:linear-gradient(135deg,#D4AF6A,#F0D090);border-radius:14px;padding:24px;text-align:center;margin:25px 0}
.amt-val{font-size:2.5rem;font-weight:900;color:#060608}
.txid{background:#f0f0f0;border-radius:8px;padding:12px;font-family:monospace;font-size:0.72rem;word-break:break-all;margin:15px 0}
.stamp{border:3px solid #10B981;border-radius:50%;width:90px;height:90px;display:flex;align-items:center;justify-content:center;margin:20px auto;color:#10B981;font-weight:700;font-size:0.8rem;text-align:center}
.footer{margin-top:30px;text-align:center;font-size:0.75rem;color:#999;border-top:1px solid #eee;padding-top:15px}
</style></head>
<body>
<div class="header">
  <div><div class="logo">RE</div><div style="font-size:0.6rem;color:#999;letter-spacing:2px">PI PROPERTY · GLOBAL REAL ESTATE</div></div>
  <div style="text-align:left"><div style="font-size:1.3rem;font-weight:700">فاتورة رسمية</div><div style="color:#999">#${data.invoiceNumber}</div><div style="color:#999">${data.date}</div></div>
</div>
<div class="grid">
  <div class="box"><div class="lbl">المشتري</div><div class="val">${data.buyer.name}</div></div>
  <div class="box"><div class="lbl">حساب Pi</div><div class="val">@${data.buyer.username}</div></div>
  <div class="box"><div class="lbl">العقار</div><div class="val">${data.property.title}</div></div>
  <div class="box"><div class="lbl">الموقع</div><div class="val">${data.property.location}</div></div>
</div>
<div class="amount"><div style="font-size:0.8rem;color:rgba(0,0,0,0.6);margin-bottom:8px">المبلغ المدفوع</div><div class="amt-val">${data.amount.toLocaleString()} Pi</div></div>
<div class="txid">TXID: ${data.txid || 'Processing...'}</div>
<div class="stamp">✓ مدفوع</div>
<div class="footer"><p>RE Platform · re.pi · reeac1132.pinet.com</p><p>فاتورة موثقة على Pi Blockchain</p></div>
</body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `RE-Invoice-${data.invoiceNumber}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
