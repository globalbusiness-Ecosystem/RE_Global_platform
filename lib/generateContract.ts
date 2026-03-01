export interface ContractData {
  contractNumber: string;
  date: string;
  seller: string;
  buyer: { name: string; username: string; };
  property: { title: string; location: string; type: string; };
  amount: number;
  txid: string;
  transactionType: "sale" | "rent" | "token" | "hotel";
}

export function downloadContract(data: ContractData) {
  const typeText = { sale:"بيع عقار", rent:"إيجار عقار", token:"استثمار مُرمَّز", hotel:"حجز فندقي" }[data.transactionType];
  const html = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head><meta charset="UTF-8">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Arial,sans-serif;padding:50px;color:#333;line-height:1.8}
.header{text-align:center;margin-bottom:40px;padding-bottom:25px;border-bottom:2px solid #D4AF6A}
.logo{font-size:2rem;font-weight:900;color:#D4AF6A}
.sec-title{font-size:1rem;font-weight:700;color:#D4AF6A;border-bottom:1px solid #eee;padding-bottom:8px;margin:20px 0 12px}
.clause{margin:10px 0;padding-right:18px;position:relative;font-size:0.9rem}
.clause::before{content:'•';position:absolute;right:0;color:#D4AF6A;font-weight:700}
.highlight{background:#fffbf0;border:1px solid #D4AF6A;border-radius:8px;padding:15px;margin:12px 0}
.amount-box{background:linear-gradient(135deg,#060608,#1a1a2e);color:#D4AF6A;border-radius:14px;padding:20px;text-align:center;margin:25px 0}
.txid-box{background:#f0f0f0;border-radius:8px;padding:12px;font-family:monospace;font-size:0.7rem;word-break:break-all;margin:15px 0}
.sigs{display:grid;grid-template-columns:1fr 1fr;gap:40px;margin-top:50px}
.sig{border-top:2px solid #333;padding-top:10px;text-align:center;font-size:0.8rem;color:#999}
.footer{margin-top:30px;text-align:center;font-size:0.75rem;color:#999;border-top:1px solid #eee;padding-top:15px}
</style></head>
<body>
<div class="header">
  <div class="logo">RE PLATFORM</div>
  <div style="font-size:1.3rem;font-weight:700;margin:8px 0">عقد ${typeText}</div>
  <div style="color:#999">رقم العقد: ${data.contractNumber} | ${data.date}</div>
</div>
<div class="sec-title">أطراف العقد</div>
<div class="highlight">
  <div class="clause"><strong>البائع:</strong> ${data.seller}</div>
  <div class="clause"><strong>المشتري:</strong> ${data.buyer.name} (@${data.buyer.username})</div>
</div>
<div class="sec-title">موضوع العقد</div>
<div class="clause"><strong>العقار:</strong> ${data.property.title}</div>
<div class="clause"><strong>الموقع:</strong> ${data.property.location}</div>
<div class="clause"><strong>النوع:</strong> ${data.property.type}</div>
<div class="sec-title">القيمة المالية</div>
<div class="amount-box"><div style="font-size:2rem;font-weight:900">${data.amount.toLocaleString()} Pi</div><div style="font-size:0.8rem;opacity:0.7;margin-top:4px">مدفوعة عبر Pi Network Blockchain</div></div>
<div class="sec-title">الشروط والأحكام</div>
<div class="clause">تم إبرام هذا العقد وفق القانون الدولي المعمول به.</div>
<div class="clause">الدفعة المنفذة عبر Pi Network غير قابلة للاسترداد بعد التأكيد.</div>
<div class="clause">يلتزم البائع بتسليم العقار خلال 30 يوم من تاريخ العقد.</div>
<div class="clause">هذا العقد موثق رقمياً على Pi Blockchain ولا يمكن تعديله.</div>
<div class="txid-box">🔗 TXID: ${data.txid || 'Pending...'}</div>
<div class="sigs">
  <div class="sig"><div style="height:45px"></div>توقيع البائع<br>${data.seller}</div>
  <div class="sig"><div style="height:45px"></div>توقيع المشتري<br>${data.buyer.name}</div>
</div>
<div class="footer"><p>RE Platform · re.pi · منصة العقارات العالمية على Pi Network · ${data.date}</p></div>
</body></html>`;
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `RE-Contract-${data.contractNumber}.html`;
  a.click();
  URL.revokeObjectURL(url);
}
