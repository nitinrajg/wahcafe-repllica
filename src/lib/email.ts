import { Resend } from 'resend';

let _resend: Resend | null = null;

function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface LeadEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  formType: string;
  sourcePath?: string;
}

export async function sendLeadNotification(data: LeadEmailData) {
  const resend = getResend();
  const to = process.env.LEADS_NOTIFY_EMAIL!;

  const formLabel = data.formType === 'customize-menu' ? 'Customize Menu Request' : 'Contact Enquiry';

  await resend.emails.send({
    from: 'Wah Cafe Website <onboarding@resend.dev>',
    to,
    replyTo: data.email,
    subject: `New ${formLabel}: ${data.firstName} ${data.lastName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #034230;">New ${formLabel}</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Name</td><td style="padding: 8px 0;">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Email</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Phone</td><td style="padding: 8px 0;"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
          ${data.sourcePath ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Source</td><td style="padding: 8px 0;">${data.sourcePath}</td></tr>` : ''}
        </table>
        <p style="color: #888; font-size: 12px; margin-top: 24px;">This lead was submitted via the Wah Cafe website.</p>
      </div>
    `,
  });
}
