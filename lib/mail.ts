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
    subject:
      "Vérifiez votre adresse e-mail pour activer votre compte BendriouchCar",
    html: `<div style="
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: Arial, sans-serif;
">
  <!-- En-tête de l'e-mail -->
  <div style="
    background-color: #3b82f6;
    color: #ffffff;
    text-align: center;
    padding: 20px;
  ">
    <h1 style="margin: 0; font-size: 24px;">BendriouchCar</h1>
  </div>

  <!-- Corps de l'e-mail -->
  <div style="padding: 20px; color: #333333;">
    <h2 style="font-size: 20px; margin-bottom: 16px;">Bonjour,</h2>
    <p style="font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
      Merci de vous être inscrit sur <strong>BendriouchCar</strong> ! Nous sommes ravis de vous accueillir sur notre plateforme de location de voitures. Pour commencer à explorer nos offres et réserver votre prochaine voiture, veuillez vérifier votre adresse e-mail en cliquant sur le bouton ci-dessous :
    </p>

    <!-- Bouton de vérification -->
    <div style="text-align: center;">
      <a
        href="${confirmLink}"
        style="
          display: inline-block;
          background-color: #3b82f6;
          color: #ffffff;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: bold;
          margin: 20px 0;
        "
      >
        Vérifier mon e-mail
      </href=>
    </div>


  <!-- Pied de page de l'e-mail -->
  <div style="
    text-align: center;
    padding: 20px;
    background-color: #f1f1f1;
    color: #666666;
    font-size: 14px;
  ">
    <p>
      Merci de faire confiance à <strong>BendriouchCar</strong> pour vos locations de voitures.<br>
      À très bientôt sur notre plateforme !
    </p>
    <p>
      Cordialement,<br>
      L'équipe <strong>BendriouchCar</strong><br>
      📍 [Adresse de l'entreprise] <br>
      📞 [Numéro de téléphone] <br>
      🌐 <a href="https://www.bendriouchcar.com" style="color: #3b82f6; text-decoration: none;">www.bendriouchcar.com</a>
    </p>
  </div>
</div>`,
  });
};
