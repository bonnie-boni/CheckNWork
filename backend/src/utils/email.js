import nodemailer from 'nodemailer';

const sendConfirmationEmail = async (applicantEmail, jobDetails, termsAndConditions, posterContactInfo) => {
  console.log("Sending confirmation email using Nodemailer...");
  try {
    // Create a transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      console.log('Transporter created successfully.');
    } catch (transporterError) {
      console.error('Error creating transporter:', transporterError);
      throw transporterError;
    }

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: applicantEmail,
      subject: `Job Application Confirmation: ${jobDetails.category}`,
      text: `Dear Applicant,\n\nYou have successfully applied for the following job:\n\nCategory: ${jobDetails.category}\nDescription: ${jobDetails.description}\nWilling to pay: ${jobDetails.amount}\n\nJob Poster Contact Information:\nUsername: ${posterContactInfo.username}\nEmail: ${posterContactInfo.email}\n\nTerms and Conditions:\n${termsAndConditions}\n\nThank you for your interest!\n\nSincerely,\nThe Job Board Team`,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully!');
    } catch (sendMailError) {
      console.error('Error sending email:', sendMailError);
      throw sendMailError;
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

export { sendConfirmationEmail };
