"use server";

import { redirect } from "next/navigation";
import { sendGraphMail, type GraphMailConfig } from "@/lib/graph-mail";
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
  | { ok: true; mail: GraphMailConfig; leadNotificationTo: string }
  | { ok: false; error: string };

function getEnvConfig(): EnvConfig {
  const tenantId = process.env.AZURE_TENANT_ID?.trim();
  const clientId = process.env.AZURE_CLIENT_ID?.trim();
  const clientSecret = process.env.AZURE_CLIENT_SECRET?.trim();
  const senderMailbox = process.env.MAIL_SENDER?.trim();
  const fromAddress = process.env.MAIL_FROM?.trim() || undefined;
  const leadNotificationTo = process.env.LEAD_NOTIFICATION_TO?.trim();

  if (
    !tenantId ||
    !clientId ||
    !clientSecret ||
    !senderMailbox ||
    !leadNotificationTo
  ) {
    return {
      ok: false,
      error: `The form is not set up to send yet. Email ${site.email} instead.`,
    };
  }

  return {
    ok: true,
    mail: { tenantId, clientId, clientSecret, senderMailbox, fromAddress },
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

  return `
    <h1>New project request</h1>
    <table>${htmlRows}</table>
    <h2>Details</h2>
    <p>${escapeHtml(values.details).replaceAll("\n", "<br>")}</p>
  `;
}

function buildAutoReplyEmail(values: ConsultationFormValues) {
  return `
    <p>Hi ${escapeHtml(values.fullName)},</p>
    <p>Thanks for getting in touch with ${escapeHtml(site.name)}. We have your note and will reply within one business day.</p>
    <p><strong>Project type:</strong> ${escapeHtml(values.projectType)}</p>
    <p>${escapeHtml(values.details).replaceAll("\n", "<br>")}</p>
    <p>${escapeHtml(site.owner.name)}<br>${escapeHtml(site.legalName)}</p>
  `;
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

  try {
    await sendGraphMail(envConfig.mail, {
      to: envConfig.leadNotificationTo,
      replyTo: values.email,
      subject: `New ${site.name} lead: ${values.projectType}`,
      html: buildLeadEmail(values),
    });

    await sendGraphMail(envConfig.mail, {
      to: values.email,
      subject: `We got your note (${site.name})`,
      html: buildAutoReplyEmail(values),
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
