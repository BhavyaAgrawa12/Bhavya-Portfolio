import nodemailer from "nodemailer";
import { env } from "../config/env.js";

let transporter = null;

const initializeSMTP = () => {
  if (!transporter && env.SMTP_USER && env.SMTP_PASS) {
    try {
      transporter = nodemailer.createTransport({
        host: env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(env.SMTP_PORT || "587"),
        secure: env.SMTP_PORT === "465",
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASS,
        },
      });
      console.log("Nodemailer SMTP Transporter initialized");
    } catch (err) {
      console.error("Failed to initialize Nodemailer SMTP Transporter:", err.message);
    }
  }
};

export const sendContactNotificationEmail = async (details) => {
  const { name, email: senderEmail, subject: clientSubject, message } = details;

  // Format Subject: 🚀 Project Enquiry | Bhavya Portfolio - clientSubject (if present) (newlines are rejected by Resend API)
  const finalSubject = clientSubject 
    ? `🚀 Project Enquiry | Bhavya Portfolio - ${clientSubject}`
    : "🚀 Project Enquiry | Bhavya Portfolio";

  const recipient = env.SMTP_USER || "agrawalbhavya563@gmail.com";

  const textContent = `New portfolio contact form submission received.
  
Sender: ${name}
Email: ${senderEmail}
Subject: ${clientSubject || "None"}

Message:
${message}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>New Portfolio Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${senderEmail}">${senderEmail}</a></p>
      <p><strong>Subject:</strong> ${clientSubject || "None"}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin-left: 0; white-space: pre-wrap;">${message}</blockquote>
    </div>
  `;

  // 1. Resend HTTP API Route (HTTPS port 443, perfect for Render)
  if (env.RESEND_API_KEY) {
    try {
      console.log("Sending email notification via Resend API...");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: env.RESEND_FROM || "onboarding@resend.dev",
          to: [recipient],
          subject: finalSubject,
          text: textContent,
          html: htmlContent,
        }),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || `Resend HTTP error ${response.status}`);
      }
      console.log("Email notification sent successfully via Resend:", resData.id);
      return resData;
    } catch (err) {
      console.error("Resend API failed:", err.message);
      // Fall through to SMTP if configured
    }
  }

  // 2. SMTP fallback
  initializeSMTP();
  if (transporter) {
    try {
      console.log("Sending email notification via SMTP...");
      const info = await transporter.sendMail({
        from: recipient,
        to: recipient,
        subject: finalSubject,
        text: textContent,
        html: htmlContent,
      });
      console.log("Email notification sent successfully via SMTP:", info.messageId);
      return info;
    } catch (err) {
      console.error("SMTP sending failed:", err.message);
    }
  }

  console.warn("Mail sending skipped: neither Resend API Key nor valid SMTP credentials are set.");
  return null;
};
