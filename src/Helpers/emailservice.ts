import nodemailer, { Transporter } from "nodemailer";


class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: "Gmail",
      port: Number(process.env.SMTP_PORT),
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });

    } catch (error) {
      console.error("Error sending email: ", error);
      throw new Error("Email could not be sent");
    }
  }
  async sendVerificationEmail(to: string, token: string): Promise<void> {

    const verifyLink = `${process.env.App_URL}/verify?token=${token}`;
    const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #E3F2FD; font-family: Arial, sans-serif;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="600px" border="0" cellspacing="0" cellpadding="20" style="background-color: #FFFFFF; border-radius: 10px; text-align: center; margin-top: 30px;">
                    <!-- Logo Section -->
                    <tr>
                        <td align="center">
                            <div style="width: 80px; height: 80px; border-radius: 50%; background-color: #BBDEFB; display: flex; align-items: center; justify-content: center;">
                                <img src="https://i.ibb.co/XkVcJc9T/800px-Facebook-Messenger-logo-2020-svg.png" alt="Logo" style="width: 50px; height: 50px;">
                            </div>
                        </td>
                    </tr>
                    <!-- Email Verification Content -->
                    <tr>
                        <td align="center">
                            <h2 style="color: #1565C0;">Email Verification</h2>
                            <p style="color: #424242; font-size: 16px;">
                                Hi  ${to}, <br>
                                You're almost set to start enjoying  Messenger. Simply click the link below to verify your email address and get started. The link expires in 48 hours.
                            </p>
                            <a href="${verifyLink}" target="_blank" style="display: inline-block; background-color: #0288D1; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px; font-weight: bold;">
                                Verify my email address
                            </a>
                            <p style="color: #757575; font-size: 14px; margin-top: 20px;">
                                If you did not sign up for Messenger, please ignore this email.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

await this.transporter.sendMail({
    from: `"Messenger" <${process.env.SMTP_USER}>`,
    to,
    subject: "Verify Your Email",
    html
});

  }
}

export default new EmailService();