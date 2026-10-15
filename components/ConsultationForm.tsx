"use client";

import { useActionState, useId } from "react";
import {
  submitConsultationRequest,
  type ConsultationActionState,
} from "@/app/actions/consultation";
import { projectTypes, type ProjectType } from "@/content/site";
import { Button } from "@/components/ui";

const initialState: ConsultationActionState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: {
    fullName: "",
    email: "",
    phone: "",
    projectType: "",
    details: "",
    website: "",
  },
};

const fieldClass =
  "mt-2 w-full rounded-sm border border-ink-muted bg-surface-raised px-4 text-base text-ink outline-none transition-colors placeholder:text-ink-muted/70 focus-visible:border-brand aria-[invalid=true]:border-error";

export function ConsultationForm({
  defaultProjectType,
}: {
  defaultProjectType?: ProjectType;
}) {
  const [state, formAction, isPending] = useActionState(
    submitConsultationRequest,
    initialState,
  );
  const id = useId();
  const errors = state.fieldErrors;
  const values = state.values;
  const selectedType = values.projectType || defaultProjectType || "";

  return (
    <form
      action={formAction}
      className="rounded-md border border-line bg-surface-raised p-6 md:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          name="fullName"
          label="Name"
          autoComplete="name"
          defaultValue={values.fullName}
          error={errors.fullName}
          required
        />
        <Field
          id={`${id}-email`}
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          defaultValue={values.email}
          error={errors.email}
          required
        />
        <Field
          id={`${id}-phone`}
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          defaultValue={values.phone}
          error={errors.phone}
          optional
          className="sm:col-span-2"
        />
      </div>

      <fieldset className="mt-6">
        <legend className="text-base font-semibold text-ink">
          What is the project?
        </legend>
        {errors.projectType ? (
          <p
            className="t-small mt-2 font-semibold text-error"
            id={`${id}-projectType-error`}
          >
            {errors.projectType}
          </p>
        ) : null}
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {projectTypes.map((type) => (
            <label
              key={type.value}
              className="flex cursor-pointer items-start gap-3 rounded-sm border border-line p-3 transition-colors has-[:checked]:border-brand has-[:checked]:bg-surface-100 hover:border-ink-muted"
            >
              <input
                aria-describedby={
                  errors.projectType ? `${id}-projectType-error` : undefined
                }
                className="mt-1 h-4 w-4 shrink-0 accent-brand"
                defaultChecked={selectedType === type.value}
                name="projectType"
                type="radio"
                value={type.value}
              />
              <span>
                <span className="block text-base font-semibold text-ink">
                  {type.value}
                </span>
                <span className="t-small mt-0.5 block text-ink-muted">
                  {type.description}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label
          className="block text-base font-semibold text-ink"
          htmlFor={`${id}-details`}
        >
          A few sentences about it
        </label>
        <textarea
          aria-describedby={`${id}-details-help${
            errors.details ? ` ${id}-details-error` : ""
          }`}
          aria-invalid={Boolean(errors.details)}
          className={`${fieldClass} min-h-36 resize-y py-3 leading-7`}
          defaultValue={values.details}
          id={`${id}-details`}
          maxLength={1600}
          name="details"
          placeholder="What do you do, what do you need the site or app to do, and when would you like it live?"
          required
        />
        <p className="t-small mt-2 text-ink-muted" id={`${id}-details-help`}>
          Plain words are fine. Links to your current site or anything similar
          help.
        </p>
        {errors.details ? (
          <p
            className="t-small mt-2 font-semibold text-error"
            id={`${id}-details-error`}
          >
            {errors.details}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          autoComplete="off"
          id={`${id}-website`}
          name="website"
          tabIndex={-1}
          type="text"
          defaultValue=""
        />
      </div>

      {errors.form ? (
        <p
          aria-live="polite"
          className="t-body mt-6 rounded-sm border border-error/40 bg-surface-100 px-4 py-3 font-semibold text-ink"
        >
          {errors.form}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button disabled={isPending} type="submit">
          {isPending ? "Sending…" : "Send"}
        </Button>
        <p className="t-small text-ink-muted">
          No newsletter, no follow-up sequence. Just a reply.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  type = "text",
  autoComplete,
  defaultValue,
  error,
  optional = false,
  required = false,
  className = "",
}: {
  id: string;
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  autoComplete: string;
  defaultValue: string;
  error?: string;
  optional?: boolean;
  required?: boolean;
  className?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label className="block text-base font-semibold text-ink" htmlFor={id}>
        {label}
        {optional ? (
          <span className="font-normal text-ink-muted"> (optional)</span>
        ) : null}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={`${fieldClass} h-12`}
        defaultValue={defaultValue}
        id={id}
        name={name}
        required={required}
        type={type}
      />
      {error ? (
        <p className="t-small mt-2 font-semibold text-error" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
