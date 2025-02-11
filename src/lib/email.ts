import sgMail from '@sendgrid/mail';

interface ResetEmailParams {
  to: string;
  resetLink: string;
}

// Function to send the password reset email
export async function sendResetEmail({ to, resetLink }: ResetEmailParams): Promise<void> {


  // Validate the sender email
  const senderEmail = process.env.SENDGRID_SENDER_EMAIL;
  if (!senderEmail) {
    throw new Error('SENDGRID_SENDER_EMAIL is not defined in environment variables');
  }

  // Validate the reset link
  if (!resetLink || !resetLink.trim()) {
    throw new Error('Reset link is required');
  }

  // Define the email message with proper typing
  const msg = {
    to: "test@example.com", // Ensure no extra spaces
    from: "test@gmail.com", // Ensure no extra spaces
    subject: 'Password Reset',
    text:"Here is your password reset link",
    html: `
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send password reset email');
  }
}