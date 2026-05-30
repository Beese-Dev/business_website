"use client";

import { FormEvent, useActionState, useMemo, useState } from "react";
import {
  submitConsultationRequest,
  type ConsultationActionState,
} from "@/app/actions/consultation";

type ServiceCategory =
  | "Website Development"
  | "Office Networking"
  | "Hardware Setup";

type FormValues = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  serviceCategory: ServiceCategory | "";
  details: string;
  website: string;
};

type FormErrors = Partial<Record<keyof FormValues | "form", string>>;

const initialValues: FormValues = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  serviceCategory: "",
  details: "",
  website: "",
};

const initialActionState: ConsultationActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: initialValues,
};

const steps = ["Contact", "Service", "Details"] as const;

const serviceCategories: Array<{
  value: ServiceCategory;
  label: string;
  description: string;
}> = [
  {
    value: "Website Development",
    label: "Website Development",
    description: "A new site, site refresh, landing page, or local web presence.",
  },
  {
    value: "Office Networking",
    label: "Office Networking",
    description: "Wi-Fi, routing, switches, printers, or small-office connectivity.",
  },
  {
    value: "Hardware Setup",
    label: "Hardware Setup",
    description: "Workstations, monitors, printers, network gear, or peripherals.",
  },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getStepErrors(step: number, values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (step === 0) {
    if (!values.fullName.trim()) {
      errors.fullName = "Enter your full name.";
    }

    if (!values.email.trim()) {
      errors.email = "Enter your email address.";
    } else if (!emailPattern.test(values.email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!values.phone.trim()) {
      errors.phone = "Enter a phone number.";
    }
  }

  if (step === 1 && !values.serviceCategory) {
    errors.serviceCategory = "Choose the kind of project you need help with.";
  }

  if (step === 2) {
    if (!values.details.trim()) {
      errors.details = "Describe what you are trying to accomplish.";
    } else if (values.details.trim().length > 1600) {
      errors.details = "Keep the project details under 1,600 characters.";
    }

    if (values.website.trim()) {
      errors.form = "Something went wrong. Please try again.";
    }
  }

  return errors;
}

function hasErrors(errors: FormErrors) {
  return Object.keys(errors).length > 0;
}

export function ConsultationForm() {
  const [actionState, formAction, isPending] = useActionState(
    submitConsultationRequest,
    initialActionState,
  );
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hideServerErrors, setHideServerErrors] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [touchedSteps, setTouchedSteps] = useState<Set<number>>(new Set());

  const serverErrors =
    actionState.status === "error" && !hideServerErrors
      ? {
          ...actionState.fieldErrors,
          form: actionState.fieldErrors.form ?? actionState.message,
        }
      : {};
  const displayErrors = { ...serverErrors, ...errors };
  const detailsRemaining = 1600 - values.details.length;
  const progressLabel = useMemo(
    () => `Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep]}`,
    [currentStep],
  );

  function updateValue<Field extends keyof FormValues>(
    field: Field,
    value: FormValues[Field],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setHideServerErrors(true);
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });
  }

  function validateAndSetErrors(step: number) {
    const nextErrors = getStepErrors(step, values);
    setErrors(nextErrors);
    setTouchedSteps((current) => new Set(current).add(step));
    return !hasErrors(nextErrors);
  }

  function goToStep(step: number) {
    if (step <= currentStep) {
      setCurrentStep(step);
      setErrors({});
      return;
    }

    if (validateAndSetErrors(currentStep)) {
      setCurrentStep(step);
      setErrors({});
    }
  }

  function goNext() {
    if (validateAndSetErrors(currentStep)) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
      setErrors({});
    }
  }

  function goBack() {
    setCurrentStep((step) => Math.max(step - 1, 0));
    setErrors({});
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const allErrors = [0, 1, 2].reduce<FormErrors>(
      (nextErrors, step) => ({ ...nextErrors, ...getStepErrors(step, values) }),
      {},
    );

    if (hasErrors(allErrors)) {
      event.preventDefault();
      setErrors(allErrors);
      setTouchedSteps(new Set([0, 1, 2]));

      const firstInvalidStep = [0, 1, 2].find((step) =>
        hasErrors(getStepErrors(step, values)),
      );
      setCurrentStep(firstInvalidStep ?? 0);
      return;
    }

    setHideServerErrors(false);
    setErrors({});
  }

  return (
    <form
      action={formAction}
      className="border border-border bg-surface p-6 shadow-[0_24px_60px_rgba(16,47,73,0.12)] md:p-8"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="sr-only" aria-live="polite">
        {progressLabel}
      </div>

      <div className="flex flex-col gap-4 border-b border-border pb-6">
        <p className="text-sm font-bold uppercase text-brand-river">
          {progressLabel}
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {steps.map((step, index) => {
            const isCurrent = index === currentStep;
            const hasStepError =
              (touchedSteps.has(index) &&
                hasErrors(getStepErrors(index, values))) ||
              (index === 0 &&
                Boolean(
                  displayErrors.fullName ||
                    displayErrors.email ||
                    displayErrors.phone,
                )) ||
              (index === 1 && Boolean(displayErrors.serviceCategory)) ||
              (index === 2 &&
                Boolean(displayErrors.details || displayErrors.form));

            return (
              <button
                key={step}
                type="button"
                aria-current={isCurrent ? "step" : undefined}
                className={`min-h-11 border px-3 text-left text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 ${
                  isCurrent
                    ? "border-brand-primary bg-brand-primary text-brand-light"
                    : "border-border bg-brand-light text-brand-primary hover:border-brand-river"
                }`}
                onClick={() => goToStep(index)}
              >
                <span className="block text-xs uppercase opacity-75">
                  0{index + 1}
                </span>
                {step}
                {hasStepError ? (
                  <span className="ml-2 text-brand-accent" aria-hidden="true">
                    *
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <input
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        name="website"
        tabIndex={-1}
        type="text"
        value={values.website}
        onChange={(event) => updateValue("website", event.target.value)}
      />
      <input name="fullName" type="hidden" value={values.fullName} />
      <input name="companyName" type="hidden" value={values.companyName} />
      <input name="email" type="hidden" value={values.email} />
      <input name="phone" type="hidden" value={values.phone} />
      <input
        name="serviceCategory"
        type="hidden"
        value={values.serviceCategory}
      />
      <input name="details" type="hidden" value={values.details} />

      {currentStep === 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <TextField
            autoComplete="name"
            error={displayErrors.fullName}
            id="fullName"
            label="Full name"
            value={values.fullName}
            onChange={(value) => updateValue("fullName", value)}
          />
          <TextField
            autoComplete="organization"
            error={displayErrors.companyName}
            id="companyName"
            label="Company name"
            optional
            value={values.companyName}
            onChange={(value) => updateValue("companyName", value)}
          />
          <TextField
            autoComplete="email"
            error={displayErrors.email}
            id="email"
            label="Email"
            type="email"
            value={values.email}
            onChange={(value) => updateValue("email", value)}
          />
          <TextField
            autoComplete="tel"
            error={displayErrors.phone}
            id="phone"
            label="Phone"
            type="tel"
            value={values.phone}
            onChange={(value) => updateValue("phone", value)}
          />
        </div>
      ) : null}

      {currentStep === 1 ? (
        <fieldset className="mt-6">
          <legend className="text-sm font-bold text-brand-dark">
            What are you looking for help with?
          </legend>
          {displayErrors.serviceCategory ? (
            <p
              className="mt-2 text-sm font-semibold text-red-700"
              id="serviceCategory-error"
            >
              {displayErrors.serviceCategory}
            </p>
          ) : null}
          <div className="mt-4 grid gap-3">
            {serviceCategories.map((category) => (
              <label
                key={category.value}
                className={`flex cursor-pointer gap-4 border p-4 transition-colors ${
                  values.serviceCategory === category.value
                    ? "border-brand-primary bg-brand-light"
                    : "border-border bg-surface hover:border-brand-river"
                }`}
              >
                <input
                  aria-describedby={
                    displayErrors.serviceCategory
                      ? "serviceCategory-error"
                      : undefined
                  }
                  checked={values.serviceCategory === category.value}
                  className="mt-1 h-4 w-4 accent-brand-primary"
                  name="serviceCategoryChoice"
                  type="radio"
                  value={category.value}
                  onChange={() =>
                    updateValue("serviceCategory", category.value)
                  }
                />
                <span>
                  <span className="block text-sm font-bold text-brand-dark">
                    {category.label}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-muted">
                    {category.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      {currentStep === 2 ? (
        <div className="mt-6">
          <label
            className="grid gap-2 text-sm font-bold text-brand-dark"
            htmlFor="details"
          >
            Briefly describe your current setup and what you are looking to
            achieve
          </label>
          <textarea
            aria-describedby={`details-help${
              displayErrors.details ? " details-error" : ""
            }`}
            aria-invalid={Boolean(displayErrors.details)}
            className="mt-2 min-h-40 w-full resize-y border border-border bg-brand-light px-4 py-3 text-base font-normal leading-7 text-brand-dark outline-none transition-colors focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40"
            id="details"
            maxLength={1600}
            value={values.details}
            onChange={(event) => updateValue("details", event.target.value)}
          />
          <div
            className="mt-2 flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between"
            id="details-help"
          >
            <span className="text-muted">
              A few plain-English sentences are enough.
            </span>
            <span className="font-semibold text-brand-primary">
              {detailsRemaining} characters left
            </span>
          </div>
          {displayErrors.details ? (
            <p
              className="mt-2 text-sm font-semibold text-red-700"
              id="details-error"
            >
              {displayErrors.details}
            </p>
          ) : null}
        </div>
      ) : null}

      {displayErrors.form ? (
        <p
          aria-live="polite"
          className="mt-6 border border-brand-accent bg-brand-light px-4 py-3 text-sm font-semibold text-brand-dark"
        >
          {displayErrors.form}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
        <button
          className="inline-flex h-12 items-center justify-center border border-brand-primary/30 bg-surface px-6 text-sm font-bold text-brand-primary transition-colors hover:border-brand-river hover:text-brand-river focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={currentStep === 0 || isPending}
          type="button"
          onClick={goBack}
        >
          Back
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            className="inline-flex h-12 items-center justify-center bg-brand-primary px-6 text-sm font-bold text-brand-light transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            disabled={isPending}
            type="button"
            onClick={goNext}
          >
            Continue
          </button>
        ) : (
          <button
            className="inline-flex h-12 items-center justify-center bg-brand-primary px-6 text-sm font-bold text-brand-light transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        )}
      </div>
    </form>
  );
}

function TextField({
  autoComplete,
  error,
  id,
  label,
  optional = false,
  type = "text",
  value,
  onChange,
}: {
  autoComplete: string;
  error?: string;
  id: keyof FormValues;
  label: string;
  optional?: boolean;
  type?: "email" | "tel" | "text";
  value: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${id}-error`;

  return (
    <div>
      <label
        className="grid gap-2 text-sm font-bold text-brand-dark"
        htmlFor={id}
      >
        <span>
          {label}
          {optional ? (
            <span className="font-medium text-muted"> optional</span>
          ) : null}
        </span>
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className="mt-2 h-12 w-full border border-border bg-brand-light px-4 text-base font-normal text-brand-dark outline-none transition-colors focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40"
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p className="mt-2 text-sm font-semibold text-red-700" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
