"use client";

import { FormEvent, useState } from "react";
import { Contact } from "../Contact";
import { leadSource } from "@/lib/leadSource";
import { trackLead } from "@/lib/fbq";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setFormState("submitting");

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const response = await fetch("/api/contact", {
        body: JSON.stringify({
          brand: formData.get("brand"),
          name: formData.get("name"),
          painPoint: formData.get("painPoint"),
          email: formData.get("email"),
          source: leadSource("Contact page")
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST"
      });

      if (response.ok) {
        setFormState("success");
        trackLead({ source: "Contact page" });
        form.reset();
        return;
      }

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setErrorMessage(
        payload?.error ?? "The form could not be submitted right now. Please try again in a bit."
      );
      setFormState("error");
    } catch {
      setErrorMessage("The form could not be submitted right now. Please try again in a bit.");
      setFormState("error");
    }
  }

  return <Contact formState={formState} errorMessage={errorMessage} handleSubmit={handleSubmit} />;
}
