import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (applicantEmail, jobId) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: 'xanensismo@gmail.com',
      to: applicantEmail,
      subject: 'Application Confirmation',
      text: `Thank you for applying for job ID ${jobId}. We have received your application and will review it shortly.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    console.log('Confirmation email sent successfully!');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

export { sendConfirmationEmail };
