"use server";

import { redirect } from "next/navigation";
import nodemailer from "nodemailer";

export type ServiceCategory =
  | "Website Development"
  | "Office Networking"
  | "Hardware Setup";

export type ConsultationFormValues = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceCategory: ServiceCategory | "";
  details: string;
  website: string;
};

export type ConsultationFieldErrors = Partial<
  Record<keyof ConsultationFormValues | "form", string>
>;

export type ConsultationActionState = {
  status: "idle" | "error";
  message: string;
  fieldErrors: ConsultationFieldErrors;
  values: ConsultationFormValues;
};

const allowedServiceCategories: ServiceCategory[] = [
  "Website Development",
  "Office Networking",
  "Hardware Setup",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const lastSubmissionByKey = new Map<string, number>();

function valueFrom(formData: FormData, key: keyof ConsultationFormValues) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readValues(formData: FormData): ConsultationFormValues {
  const serviceCategory = valueFrom(formData, "serviceCategory");

  return {
    fullName: valueFrom(formData, "fullName"),
    companyName: valueFrom(formData, "companyName"),
    email: valueFrom(formData, "email"),
    phone: valueFrom(formData, "phone"),
    serviceCategory: allowedServiceCategories.includes(
      serviceCategory as ServiceCategory,
    )
      ? (serviceCategory as ServiceCategory)
      : "",
    details: valueFrom(formData, "details"),
    website: valueFrom(formData, "website"),
  };
}

function validateValues(values: ConsultationFormValues) {
  const fieldErrors: ConsultationFieldErrors = {};

  if (!values.fullName) {
    fieldErrors.fullName = "Enter your full name.";
  }

  if (!values.email) {
    fieldErrors.email = "Enter your email address.";
  } else if (!emailPattern.test(values.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!values.phone) {
    fieldErrors.phone = "Enter a phone number.";
  }

  if (!values.serviceCategory) {
    fieldErrors.serviceCategory =
      "Choose the kind of project you need help with.";
  }

  if (!values.details) {
    fieldErrors.details = "Describe what you are trying to accomplish.";
  } else if (values.details.length > 1600) {
    fieldErrors.details = "Keep the project details under 1,600 characters.";
  }

  if (values.website) {
    fieldErrors.form = "Something went wrong. Please try again.";
  }

  return fieldErrors;
}

type EnvConfig =
  | {
      ok: true;
      office365Email: string;
      office365AppPassword: string;
      leadNotificationTo: string;
    }
  | {
      ok: false;
      error: string;
    };

function getEnvConfig(): EnvConfig {
  const office365Email = process.env.OFFICE365_EMAIL?.trim();
  const office365AppPassword = process.env.OFFICE365_APP_PASSWORD?.trim();
  const leadNotificationTo = process.env.LEAD_NOTIFICATION_TO?.trim();

  if (!office365Email || !office365AppPassword || !leadNotificationTo) {
    return {
      ok: false,
      error:
        "Email delivery is not configured yet. Please try again later or contact us directly.",
    };
  }

  return {
    ok: true,
    office365Email,
    office365AppPassword,
    leadNotificationTo,
  };
}

function isRateLimited(values: ConsultationFormValues) {
  const key = `${values.email.toLowerCase()}|${values.phone}`;
  const now = Date.now();
  const previousSubmission = lastSubmissionByKey.get(key);

  if (previousSubmission && now - previousSubmission < 30_000) {
    return true;
  }

  lastSubmissionByKey.set(key, now);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildLeadEmail(values: ConsultationFormValues) {
  const company = values.companyName || "Not provided";
  const submittedAt = new Date().toISOString();

  const text = [
    "New consultation request",
    "",
    `Name: ${values.fullName}`,
    `Company: ${company}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    `Service category: ${values.serviceCategory}`,
    `Submitted: ${submittedAt}`,
    "",
    "Project details:",
    values.details,
  ].join("\n");

  const rows = [
    ["Name", values.fullName],
    ["Company", company],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Service category", values.serviceCategory],
    ["Submitted", submittedAt],
  ];

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(
          label,
        )}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const html = `
    <h1>New consultation request</h1>
    <table>${htmlRows}</table>
    <h2>Project details</h2>
    <p>${escapeHtml(values.details).replaceAll("\n", "<br>")}</p>
  `;

  return { text, html };
}

function buildAutoReplyEmail(values: ConsultationFormValues) {
  const text = [
    `Hi ${values.fullName},`,
    "",
    "Thanks for contacting Chartiers Creek Business Technology. We received your request and will review the details you sent.",
    "",
    "Summary:",
    `Service category: ${values.serviceCategory}`,
    "",
    values.details,
  ].join("\n");

  const html = `
    <p>Hi ${escapeHtml(values.fullName)},</p>
    <p>Thanks for contacting Chartiers Creek Business Technology. We received your request and will review the details you sent.</p>
    <p><strong>Service category:</strong> ${escapeHtml(values.serviceCategory)}</p>
    <p>${escapeHtml(values.details).replaceAll("\n", "<br>")}</p>
  `;

  return { text, html };
}

function errorState(
  values: ConsultationFormValues,
  message: string,
  fieldErrors: ConsultationFieldErrors = {},
): ConsultationActionState {
  return {
    status: "error",
    message,
    fieldErrors,
    values,
  };
}

export async function submitConsultationRequest(
  _previousState: ConsultationActionState,
  formData: FormData,
): Promise<ConsultationActionState> {
  const values = readValues(formData);
  const fieldErrors = validateValues(values);

  if (Object.keys(fieldErrors).length > 0) {
    return errorState(
      values,
      "Please fix the highlighted fields and send the form again.",
      fieldErrors,
    );
  }

  if (isRateLimited(values)) {
    return errorState(values, "Please wait a moment before sending again.", {
      form: "Please wait a moment before sending again.",
    });
  }

  const envConfig = getEnvConfig();

  if (!envConfig.ok) {
    return errorState(values, envConfig.error, { form: envConfig.error });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: envConfig.office365Email,
      pass: envConfig.office365AppPassword,
    },
  });

  const leadEmail = buildLeadEmail(values);
  const autoReplyEmail = buildAutoReplyEmail(values);

  try {
    await transporter.sendMail({
      from: envConfig.office365Email,
      to: envConfig.leadNotificationTo,
      replyTo: values.email,
      subject: `New CCB Tech lead: ${values.serviceCategory}`,
      text: leadEmail.text,
      html: leadEmail.html,
    });

    await transporter.sendMail({
      from: envConfig.office365Email,
      to: values.email,
      subject: "We received your CCB Tech request",
      text: autoReplyEmail.text,
      html: autoReplyEmail.html,
    });
  } catch (error) {
    console.error("Consultation email delivery failed", error);

    return errorState(values, "We could not send the form. Please try again.", {
      form: "We could not send the form. Please try again.",
    });
  }

  redirect("/thank-you");
}
