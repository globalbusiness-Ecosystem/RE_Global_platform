export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  buyer: {
    name: string;
    username: string;
  };
  property: {
    title: string;
    location: string;
    type: string;
  };
  amount: number;
  txid: string;
  paymentMethod: string;
}

export function generateInvoiceHTML(data: InvoiceData): string {
  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: Arial, sans-serif; background: #fff; color: #333; padding: 40px; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #D4AF6A; }
  .logo { font-size: 2.5rem; font-weight: 900; color: #D4AF6A; letter-spacing: 3px; }
  .logo-sub { font-size: 0.7rem; color: #999; letter-spacing: 2px; }
  .invoice-title { font-size: 1.5rem; font-weight: 700; color: #333; }
  .invoice-num { font-size: 0.9rem; color: #999; }
  .section { margin-bottom: 30px; }
  .section-title { font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; color: #999; margin-bottom: 12px; font-weight: 600; }
  .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .info-box { background: #f8f8f8; border-radius: 10px; padding: 16px; }
  .info-label { font-size: 0.72rem; color: #999; margin-bottom: 4px; }
  .info-value { font-size: 0.95rem; font-weight: 600; color: #333; }
  .amount-box { background: linear-gradient(135deg, #D4AF6A, #F0D090); border-radius: 14px; padding: 24px; text-align: center; margin: 30px 0; }
  .amount-label { font-size: 0.8rem; color: rgba(0,0,0,0.6); margin-bottom: 8px; }
  .amount-value { font-size: 3rem; font-weight: 900; color: #060608; }
  .amount-currency { font-size: 1rem; color: rgba(0,0,0,0.6); }
  .txid-box { background: #f0f0f0; border-radius: 8px; padding: 12px 16px; font-family: monospace; font-size: 0.75rem; color: #666; word-break: break-all; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 0.8rem; color: #999; }
  .stamp { border: 3px solid #10B981; border-radius: 50%; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; margin: 20px auto; color: #10B981; font-weight: 700; font-size: 0.85rem; text-align: center; }
</style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">RE</div>
      <div class="logo-sub">PI PROPERTY · GLOBAL REAL ESTATE</div>
    </div>
    <div style="text-align:left">
      <div class="invoice-title">فاتورة رسمية</div>
      <div class="invoice-num">#${data.invoiceNumber}</div>
      <div class="invoice-num">${data.date}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">معلومات المشتري</div>
    <div class="info-grid">
      <div class="info-box">
        <div class="info-label">الاسم</div>
        <div class="info-value">${data.buyer.name}</div>
      </div>
      <div class="info-box">
        <div class="info-label">حساب Pi</div>
        <div class="info-value">@${data.buyer.username}</div>
      </div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">تفاصيل العقار</div>
    <div class="info-grid">
      <div class="info-box">
        <div class="info-label">العقار</div>
        <div class="info-value">${data.property.title}</div>
      </div>
      <div class="info-box">
        <div class="info-label">الموقع</div>
        <div class="info-value">${data.property.location}</div>
      </div>
      <div class="info-box">
        <div class="info-label">النوع</div>
        <div class="info-value">${data.property.type}</div>
      </div>
      <div class="info-box">
        <div class="info-label">وسيلة الدفع</div>
        <div class="info-value">${data.paymentMethod}</div>
      </div>
    </div>
  </div>

  <div class="amount-box">
    <div class="amount-label">المبلغ المدفوع</div>
    <div class="amount-value">${data.amount.toLocaleString()} <span class="amount-currency">Pi</span></div>
  </div>

  <div class="section">
    <div class="section-title">معرّف المعاملة على البلوكشين</div>
    <div class="txid-box">${data.txid || 'Processing...'}</div>
  </div>

  <div class="stamp">✓ مدفوع</div>

  <div class="footer">
    <p>RE Platform · re.pi · reeac1132.pinet.com</p>
    <p>هذه الفاتورة صادرة تلقائياً وموثقة على Pi Blockchain</p>
  </div>
</body>
</html>
  `;
}

export function downloadInvoice(data: InvoiceData) {
  const html = generateInvoiceHTML(data);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `RE-Invoice-${data.invoiceNumber}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
