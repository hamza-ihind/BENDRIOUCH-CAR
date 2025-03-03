import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "admin@bendriouchcar.com",
    to: email,
    subject: "2FA",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://www.bendriouchcar.com/new-password?token=${token}`;

  await resend.emails.send({
    from: "admin@bendriouchcar.com",
    to: email,
    subject: "Reset Your Password",
    html: `<p> Click <a href="${resetLink}">here</a> to reset your password </p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://www.bendriouchcar.com/new-verification?token=${token}`;

  await resend.emails.send({
    from: "admin@bendriouchcar.com",
    to: email,
    subject: "Confirm your email",
    html: `<p> Click <a href="${confirmLink}">here</a> to confirm your Email </p>`,
  });
};
