import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function send2FACode(email: string, code: string) {
  await transporter.sendMail({
    from: `"Courses App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your verification code",
    html: `
      <div style="font-family: Arial, sans-serif">
        <h2>Two-Factor Authentication</h2>
        <p>Your verification code:</p>
        <h1 style="letter-spacing: 4px">${code}</h1>
        <p>This code will expire in 5 minutes.</p>
      </div>
    `,
  })
}
