function ResetEmailTemplate(resetUrl: string) {
    return `
    <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            color: #333;
          }
          .email-container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          .email-header {
              display: flex;
              flex-direction:column;
                align-items: center;
  justify-content: center;
  color:#BBDEFB;
            text-align: center;
            margin-bottom: 20px;
          }
          .email-header h1 {
            color: #4CAF50;
            font-size: 24px;
          }
          .email-body {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .email-body p {
            margin-bottom: 10px;
          }
          .reset-link {
            display: inline-block;
            padding: 12px 30px;
            background-color: #1e84d9;
            color: white;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 15px;
            transition: background-color 0.3s;
          }
          .reset-link:hover {
            background-color: #1e84d9;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            color: #777;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
             <div style="width: 80px; height: 80px; border-radius: 50%; background-color: #BBDEFB; display: flex; align-items: center; justify-content: center;">
                                <img src="https://i.ibb.co/XkVcJc9T/800px-Facebook-Messenger-logo-2020-svg.png" alt="Logo" style="width: 50px; height: 50px;">
                            </div>
                            
            <h1 style="color:#1e84d9">Password Reset Request</h1>
          </div>
          <div class="email-body">
            <p>Hi,</p>
            <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
            <p>Click the button below to reset your password. This link will expire in 15 minutes:</p>
            <p>
              <a href="${resetUrl}" class="reset-link">Reset My Password</a>
            </p>
            <p>If you have any issues, feel free to <a href="mailto:support@yourdomain.com">contact us</a>.</p>
          </div>
          <div class="footer">
            <p>Thanks,<br>The Team at Your Website</p>
            <p><a href="https://localhost:3000">Visit our website</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
  

  export {ResetEmailTemplate}