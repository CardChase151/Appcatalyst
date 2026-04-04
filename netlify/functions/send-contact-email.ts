import { Handler } from '@netlify/functions';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const {
      firstName,
      lastName,
      email,
      company,
      phone,
      appDescription,
      budgetRange,
      platforms,
      timeline,
      hasDesign
    } = data;

    console.log('📧 Processing contact form submission:', { firstName, lastName, email, budgetRange });
    console.log('🔑 Resend API Key exists:', !!process.env.RESEND_API_KEY);

    // Create subject line based on budget range for easy filtering
    const subjectMap: { [key: string]: string } = {
      'under-1k': '🟢 Quick Project (<$1K)',
      '1k-3k': '🟡 Small Project ($1K-$3K)',
      '3k-5k': '🟠 Medium Project ($3K-$5K)',
      '5k-10k': '🔴 Large Project ($5K-$10K)',
      'over-10k': '🔥 Premium Project ($10K+)',
      'not-sure': '❓ Budget TBD'
    };

    const subject = `${subjectMap[budgetRange] || 'New Contact'} - ${firstName} ${lastName}`;

    const escape = (s: string = '') =>
      String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const titleCase = (s: string = '') =>
      s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const brandedShell = (innerHtml: string) => `
<html>
<head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 1200px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background-color: #003366; padding: 28px 32px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: 0.5px;">App Catalyst LLC</h1>
              <p style="margin: 6px 0 0 0; color: #6ca6d9; font-size: 13px;">The Spark Behind Your Purpose</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              ${innerHtml}
            </td>
          </tr>
          <tr>
            <td style="background-color: #003366; padding: 18px 32px; text-align: center;">
              <p style="margin: 0; color: #6ca6d9; font-size: 12px;">App Catalyst LLC | The Spark Behind Your Purpose | <a href="https://appcatalyst.org" style="color: #ffffff; text-decoration: none;">appcatalyst.org</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const section = (color: string, title: string, bodyHtml: string) => `
      <div style="background-color: #f8fafc; border-left: 3px solid ${color}; padding: 16px 20px; margin: 0 0 20px 0; border-radius: 0 6px 6px 0;">
        <p style="font-size: 14px; color: ${color}; font-weight: 600; margin: 0 0 10px 0;">${title}</p>
        <div style="font-size: 14px; color: #333333; line-height: 1.6; margin: 0;">${bodyHtml}</div>
      </div>`;

    // ===== Owner email =====
    const ownerInner = `
      <p style="font-size: 15px; color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        New contact form submission from <strong>${escape(firstName)} ${escape(lastName)}</strong>.
      </p>

      ${section('#003366', 'Contact Information', `
        <p style="margin: 0 0 6px 0;"><strong>Name:</strong> ${escape(firstName)} ${escape(lastName)}</p>
        <p style="margin: 0 0 6px 0;"><strong>Email:</strong> <a href="mailto:${escape(email)}" style="color: #003366;">${escape(email)}</a></p>
        <p style="margin: 0 0 6px 0;"><strong>Phone:</strong> ${escape(phone)}</p>
        ${company ? `<p style="margin: 0;"><strong>Company:</strong> ${escape(company)}</p>` : ''}
      `)}

      ${section('#16a34a', 'Project Details', `
        <p style="margin: 0 0 6px 0;"><strong>Budget:</strong> ${escape(titleCase(budgetRange))}</p>
        <p style="margin: 0 0 6px 0;"><strong>Platforms:</strong> ${escape((platforms || []).join(', '))}</p>
        <p style="margin: 0 0 6px 0;"><strong>Timeline:</strong> ${escape(titleCase(timeline))}</p>
        <p style="margin: 0;"><strong>Has Design:</strong> ${escape(hasDesign)}</p>
      `)}

      ${section('#d97706', 'App Description', escape(appDescription).replace(/\n/g, '<br />'))}

      <p style="font-size: 12px; color: #888888; line-height: 1.6; margin: 24px 0 0 0;">
        Submitted ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT
      </p>
    `;

    console.log('Sending email to owner...');
    const ownerEmail = await resend.emails.send({
      from: 'AppCatalyst Contact Form <noreply@mysendz.com>',
      to: 'thek2way17@gmail.com',
      replyTo: email,
      subject: subject,
      html: brandedShell(ownerInner)
    });
    console.log('Owner email result:', ownerEmail);

    // ===== Client confirmation =====
    const clientInner = `
      <p style="font-size: 15px; color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Hey ${escape(firstName)},
      </p>

      <p style="font-size: 15px; color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        Thanks for reaching out through AppCatalyst. I got your message and I'll be back to you within 24-48 hours to talk through the next steps.
      </p>

      ${section('#003366', 'Your Submission', `
        <p style="margin: 0 0 6px 0;"><strong>Project Type:</strong> ${escape((platforms || []).join(', '))}</p>
        <p style="margin: 0 0 6px 0;"><strong>Budget:</strong> ${escape(titleCase(budgetRange))}</p>
        <p style="margin: 0;"><strong>Timeline:</strong> ${escape(titleCase(timeline))}</p>
      `)}

      <p style="font-size: 15px; color: #333333; line-height: 1.6; margin: 0 0 20px 0;">
        In the meantime, feel free to look through past work at <a href="https://appcatalyst.org" style="color: #003366;">appcatalyst.org</a>.
      </p>

      <p style="font-size: 15px; color: #333333; line-height: 1.6; margin: 0 0 4px 0;">Looking forward to it,</p>
      <p style="font-size: 15px; color: #333333; line-height: 1.6; margin: 0;">Chase Kellis</p>

      <p style="font-size: 12px; color: #888888; line-height: 1.6; margin: 24px 0 0 0;">
        If you didn't submit this form, you can ignore this email.
      </p>
    `;

    console.log('Sending confirmation to client...');
    const clientEmail = await resend.emails.send({
      from: 'Chase at AppCatalyst <chase@mysendz.com>',
      to: email,
      subject: 'Thanks for reaching out - AppCatalyst',
      html: brandedShell(clientInner)
    });
    console.log('✅ Client email result:', clientEmail);

    if (ownerEmail.error || clientEmail.error) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: 'Email send failed',
          ownerError: ownerEmail.error,
          clientError: clientEmail.error,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, ownerEmail, clientEmail }),
    };
  } catch (error: any) {
    console.error('❌ Error sending email:', error);
    console.error('Full error:', JSON.stringify(error, null, 2));
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email', details: error.message }),
    };
  }
};
