"use server";

import { redirect } from "next/navigation";
import nodemailer from "nodemailer";
import { projectTypes, site, type ProjectType } from "@/content/site";

export type ConsultationFormValues = {
  fullName: string;
  email: string;
  phone: string;
  projectType: ProjectType | "";
  details: string;
  website: string; // honeypot, must stay empty
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

const allowedProjectTypes = projectTypes.map((type) => type.value);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const lastSubmissionByKey = new Map<string, number>();

function valueFrom(formData: FormData, key: keyof ConsultationFormValues) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function readValues(formData: FormData): ConsultationFormValues {
  const projectType = valueFrom(formData, "projectType");

  return {
    fullName: valueFrom(formData, "fullName"),
    email: valueFrom(formData, "email"),
    phone: valueFrom(formData, "phone"),
    projectType: allowedProjectTypes.includes(projectType as ProjectType)
      ? (projectType as ProjectType)
      : "",
    details: valueFrom(formData, "details"),
    website: valueFrom(formData, "website"),
  };
}

function validateValues(values: ConsultationFormValues) {
  const fieldErrors: ConsultationFieldErrors = {};

  if (!values.fullName) {
    fieldErrors.fullName = "Enter your name.";
  }

  if (!values.email) {
    fieldErrors.email = "Enter your email address.";
  } else if (!emailPattern.test(values.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (!values.projectType) {
    fieldErrors.projectType = "Pick the kind of project.";
  }

  if (!values.details) {
    fieldErrors.details = "Tell us a little about the project.";
  } else if (values.details.length > 1600) {
    fieldErrors.details = "Keep the details under 1,600 characters.";
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
      error: `The form is not set up to send yet. Email ${site.email} instead.`,
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
  const key = values.email.toLowerCase();
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
  const phone = values.phone || "Not provided";
  const submittedAt = new Date().toISOString();

  const text = [
    "New project request",
    "",
    `Name: ${values.fullName}`,
    `Email: ${values.email}`,
    `Phone: ${phone}`,
    `Project type: ${values.projectType}`,
    `Submitted: ${submittedAt}`,
    "",
    "Details:",
    values.details,
  ].join("\n");

  const rows = [
    ["Name", values.fullName],
    ["Email", values.email],
    ["Phone", phone],
    ["Project type", values.projectType],
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
    <h1>New project request</h1>
    <table>${htmlRows}</table>
    <h2>Details</h2>
    <p>${escapeHtml(values.details).replaceAll("\n", "<br>")}</p>
  `;

  return { text, html };
}

function buildAutoReplyEmail(values: ConsultationFormValues) {
  const text = [
    `Hi ${values.fullName},`,
    "",
    `Thanks for getting in touch with ${site.name}. We have your note and will reply within one business day.`,
    "",
    "What you sent:",
    `Project type: ${values.projectType}`,
    "",
    values.details,
    "",
    `${site.owner.name}`,
    `${site.legalName}`,
  ].join("\n");

  const html = `
    <p>Hi ${escapeHtml(values.fullName)},</p>
    <p>Thanks for getting in touch with ${escapeHtml(site.name)}. We have your note and will reply within one business day.</p>
    <p><strong>Project type:</strong> ${escapeHtml(values.projectType)}</p>
    <p>${escapeHtml(values.details).replaceAll("\n", "<br>")}</p>
    <p>${escapeHtml(site.owner.name)}<br>${escapeHtml(site.legalName)}</p>
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
      "Please fix the highlighted fields and send again.",
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
      subject: `New ${site.name} lead: ${values.projectType}`,
      text: leadEmail.text,
      html: leadEmail.html,
    });

    await transporter.sendMail({
      from: envConfig.office365Email,
      to: values.email,
      subject: `We got your note (${site.name})`,
      text: autoReplyEmail.text,
      html: autoReplyEmail.html,
    });
  } catch (error) {
    console.error("Consultation email delivery failed", error);

    return errorState(
      values,
      `We could not send the form. Please try again or email ${site.email}.`,
      {
        form: `We could not send the form. Please try again or email ${site.email}.`,
      },
    );
  }

  redirect("/thank-you");
}
