export interface ContractData {
  contractNumber: string;
  date: string;
  seller: string;
  buyer: {
    name: string;
    username: string;
  };
  property: {
    title: string;
    location: string;
    type: string;
    size?: string;
  };
  amount: number;
  txid: string;
  transactionType: "sale" | "rent" | "token" | "hotel";
}

export function generateContractHTML(data: ContractData): string {
  const typeText = {
    sale: "بيع عقار",
    rent: "إيجار عقار", 
    token: "استثمار عقاري مُرمَّز",
    hotel: "حجز فندقي"
  }[data.transactionType];

  return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: Arial, sans-serif; background: #fff; color: #333; padding: 50px; line-height: 1.8; }
  .header { text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 2px solid #D4AF6A; }
  .logo { font-size: 2rem; font-weight: 900; color: #D4AF6A; }
  .contract-title { font-size: 1.4rem; font-weight: 700; margin: 10px 0; }
  .contract-num { color: #999; font-size: 0.9rem; }
  .section { margin: 25px 0; }
  .section-title { font-size: 1rem; font-weight: 700; color: #D4AF6A; border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 15px; }
  .clause { margin: 12px 0; padding-right: 20px; position: relative; font-size: 0.92rem; }
  .clause::before { content: '•'; position: absolute; right: 0; color: #D4AF6A; font-weight: 700; }
  .highlight { background: #fffbf0; border: 1px solid #D4AF6A; border-radius: 8px; padding: 15px; margin: 15px 0; }
  .signatures { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 50px; }
  .sig-box { border-top: 2px solid #333; padding-top: 10px; text-align: center; }
  .sig-label { font-size: 0.8rem; color: #999; }
  .blockchain-seal { background: linear-gradient(135deg, #060608, #1a1a2e); color: #D4AF6A; border-radius: 14px; padding: 20px; margin: 30px 0; text-align: center; }
  .seal-title { font-size: 0.75rem; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; opacity: 0.7; }
  .seal-hash { font-family: monospace; font-size: 0.72rem; word-break: break-all; opacity: 0.9; }
  .footer { margin-top: 40px; text-align: center; font-size: 0.78rem; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
</style>
</head>
<body>
  <div class="header">
    <div class="logo">RE PLATFORM</div>
    <div class="contract-title">عقد ${typeText}</div>
    <div class="contract-num">رقم العقد: ${data.contractNumber} | التاريخ: ${data.date}</div>
  </div>

  <div class="section">
    <div class="section-title">أطراف العقد</div>
    <div class="highlight">
      <div class="clause"><strong>البائع/المُؤجِّر:</strong> ${data.seller}</div>
      <div class="clause"><strong>المشتري/المستأجر:</strong> ${data.buyer.name} (@${data.buyer.username})</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">موضوع العقد</div>
    <div class="clause"><strong>العقار:</strong> ${data.property.title}</div>
    <div class="clause"><strong>الموقع:</strong> ${data.property.location}</div>
    <div class="clause"><strong>النوع:</strong> ${data.property.type}</div>
    ${data.property.size ? `<div class="clause"><strong>المساحة:</strong> ${data.property.size}</div>` : ''}
  </div>

  <div class="section">
    <div class="section-title">القيمة المالية</div>
    <div class="highlight" style="text-align:center">
      <div style="font-size:2rem;font-weight:900;color:#D4AF6A">${data.amount.toLocaleString()} Pi</div>
      <div style="font-size:0.8rem;color:#999;margin-top:4px">مدفوعة عبر Pi Network Blockchain</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">الشروط والأحكام</div>
    <div class="clause">تم إبرام هذا العقد وفق أحكام الشريعة الإسلامية والقانون الدولي المعمول به.</div>
    <div class="clause">الدفعة المنفذة عبر Pi Network غير قابلة للاسترداد بعد التأكيد على البلوكشين.</div>
    <div class="clause">يلتزم البائع بتسليم العقار في الحالة المتفق عليها في موعد أقصاه 30 يوم من تاريخ العقد.</div>
    <div class="clause">أي نزاع يُحل بالتحكيم وفق قواعد منصة RE Platform.</div>
    <div class="clause">هذا العقد موثق رقمياً على Pi Blockchain ولا يمكن تعديله.</div>
  </div>

  <div class="blockchain-seal">
    <div class="seal-title">🔗 موثق على Pi Blockchain</div>
    <div class="seal-hash">TXID: ${data.txid || 'Pending...'}</div>
  </div>

  <div class="signatures">
    <div class="sig-box">
      <div style="height:50px"></div>
      <div class="sig-label">توقيع البائع</div>
      <div style="font-size:0.85rem;margin-top:5px">${data.seller}</div>
    </div>
    <div class="sig-box">
      <div style="height:50px"></div>
      <div class="sig-label">توقيع المشتري</div>
      <div style="font-size:0.85rem;margin-top:5px">${data.buyer.name}</div>
    </div>
  </div>

  <div class="footer">
    <p>RE Platform · re.pi · منصة العقارات العالمية على Pi Network</p>
    <p>هذا العقد صادر ومُوثَّق تلقائياً · ${data.date}</p>
  </div>
</body>
</html>
  `;
}

export function downloadContract(data: ContractData) {
  const html = generateContractHTML(data);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `RE-Contract-${data.contractNumber}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
