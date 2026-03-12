import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.office365.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'info@interallied.com',
    pass: process.env.SMTP_PASS || 'Kking-100',
  },
});

/**
 * Send inquiry email to both admin and the customer
 * @param {Object} params
 * @param {string} params.customerName
 * @param {string} params.customerEmail
 * @param {string} params.customerPhone 
 * @param {Array}  params.cartItems  - [{ name, category, quantity, specs }]
 */
export async function sendInquiryEmail({ customerName, customerEmail, customerPhone, cartItems }) {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@interallied.com';

  const itemsHtml = cartItems
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #2a3f5f;color:#c8d6e8;">${item.name}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a3f5f;color:#c8d6e8;">${item.category}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a3f5f;color:#c8d6e8;">${item.specs || 'N/A'}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a3f5f;color:#ff7c2a;font-weight:bold;">${item.quantity}</td>
      </tr>`
    )
    .join('');

  const emailTemplate = (title, greeting) => `
  <!DOCTYPE html>
  <html>
  <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;padding:0;background:#0d1b2e;font-family:'Segoe UI',Arial,sans-serif;">
    <div style="max-width:640px;margin:40px auto;background:#112240;border-radius:12px;overflow:hidden;border:1px solid #1e3a5f;">
      <div style="background:linear-gradient(135deg,#0a1628 0%,#1a3a6e 100%);padding:36px 40px;text-align:center;border-bottom:3px solid #ff7c2a;">
        <h1 style="margin:0;color:#ff7c2a;font-size:28px;letter-spacing:2px;text-transform:uppercase;">INTERALLIED</h1>
        <p style="margin:6px 0 0;color:#8aa8cc;font-size:13px;letter-spacing:1px;">TRANSFORMERS · SWITCHGEAR · SWITCHBOARDS</p>
      </div>
      <div style="padding:36px 40px;">
        <h2 style="color:#ffffff;margin:0 0 8px;font-size:22px;">${title}</h2>
        <p style="color:#8aa8cc;margin:0 0 28px;font-size:15px;">${greeting}</p>
        <div style="background:#0d1b2e;border-radius:8px;padding:20px;margin-bottom:24px;border:1px solid #1e3a5f;">
          <h3 style="color:#ff7c2a;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Customer Details</h3>
          <p style="margin:4px 0;color:#c8d6e8;"><strong style="color:#8aa8cc;min-width:70px;display:inline-block;">Name:</strong> ${customerName}</p>
          <p style="margin:4px 0;color:#c8d6e8;"><strong style="color:#8aa8cc;min-width:70px;display:inline-block;">Email:</strong> ${customerEmail}</p>
          <p style="margin:4px 0;color:#c8d6e8;"><strong style="color:#8aa8cc;min-width:70px;display:inline-block;">Phone:</strong> ${customerPhone}</p>
        </div>
        <h3 style="color:#ff7c2a;margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:1px;">Requested Items</h3>
        <table style="width:100%;border-collapse:collapse;background:#0d1b2e;border-radius:8px;overflow:hidden;border:1px solid #1e3a5f;">
          <thead>
            <tr style="background:#1a3a6e;">
              <th style="padding:10px 12px;text-align:left;color:#8aa8cc;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Product</th>
              <th style="padding:10px 12px;text-align:left;color:#8aa8cc;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Category</th>
              <th style="padding:10px 12px;text-align:left;color:#8aa8cc;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Specs</th>
              <th style="padding:10px 12px;text-align:left;color:#8aa8cc;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Qty</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
      </div>
      <div style="background:#0a1628;padding:20px 40px;text-align:center;border-top:1px solid #1e3a5f;">
        <p style="margin:0;color:#4a6080;font-size:12px;">© ${new Date().getFullYear()} Interallied · interallied.com</p>
      </div>
    </div>
  </body>
  </html>`;

  // Email to admin
  await transporter.sendMail({
    from: `"Interallied Website" <${process.env.SMTP_USER}>`,
    to: ADMIN_EMAIL,
    subject: `New Inquiry from ${customerName} — ${cartItems.length} item(s)`,
    html: emailTemplate(
      '📋 New Product Inquiry',
      `You have received a new inquiry from <strong style="color:#ff7c2a;">${customerName}</strong>.`
    ),
  });

  // Confirmation email to customer
  await transporter.sendMail({
    from: `"Interallied" <${process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: `Your Inquiry Has Been Received — Interallied`,
    html: emailTemplate(
      '✅ Inquiry Received',
      `Thank you, <strong style="color:#ff7c2a;">${customerName}</strong>! We have received your product inquiry and our team will contact you shortly.`
    ),
  });

  return { success: true };
}
