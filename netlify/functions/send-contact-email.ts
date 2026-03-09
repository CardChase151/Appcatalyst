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

    const subject = `${subjectMap[budgetRange] || '📧 New Contact'} - ${firstName} ${lastName}`;

    // Email to you (owner)
    console.log('📤 Sending email to owner...');
    const ownerEmail = await resend.emails.send({
      from: 'AppCatalyst Contact Form <noreply@mysendz.com>',
      to: 'thek2way17@gmail.com',
      subject: subject,
      html: `
        <h2>New Contact Form Submission</h2>
        <hr />
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}

        <h3>Project Details</h3>
        <p><strong>Budget Range:</strong> ${budgetRange.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
        <p><strong>Platforms:</strong> ${platforms.join(', ')}</p>
        <p><strong>Timeline:</strong> ${timeline.replace(/-/g, ' ')}</p>
        <p><strong>Has Design:</strong> ${hasDesign}</p>

        <h3>App Description</h3>
        <p>${appDescription.replace(/\n/g, '<br />')}</p>

        <hr />
        <p style="color: #666; font-size: 12px;">Submitted at ${new Date().toLocaleString()}</p>
      `
    });
    console.log('✅ Owner email result:', ownerEmail);

    // Confirmation email to client
    console.log('📤 Sending confirmation to client...');
    const clientEmail = await resend.emails.send({
      from: 'Chase at AppCatalyst <chase@mysendz.com>',
      to: email,
      subject: 'Thanks for reaching out! - AppCatalyst',
      html: `
        <h2>Hi ${firstName}!</h2>
        <p>Thank you for reaching out through AppCatalyst. I've received your message and will get back to you within 24-48 hours.</p>

        <h3>Your Submission Summary</h3>
        <p><strong>Project Type:</strong> ${platforms.join(', ')}</p>
        <p><strong>Budget Range:</strong> ${budgetRange.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
        <p><strong>Timeline:</strong> ${timeline.replace(/-/g, ' ')}</p>

        <p>In the meantime, feel free to check out my portfolio and previous projects at <a href="https://appcatalyst.org">appcatalyst.org</a></p>

        <p>Looking forward to discussing your project!</p>

        <p>Best,<br />
        Chase Kellis<br />
        AppCatalyst</p>

        <hr />
        <p style="color: #666; font-size: 12px;">If you didn't submit this form, please disregard this email.</p>
      `
    });
    console.log('✅ Client email result:', clientEmail);

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
