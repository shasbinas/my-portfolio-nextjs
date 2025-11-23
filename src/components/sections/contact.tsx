"use client";

import { User, Mail } from "lucide-react";
import { LuMessageSquareShare } from "react-icons/lu";
import { FaRegCommentDots } from "react-icons/fa";
import { useState, ChangeEvent, FormEvent, ComponentType } from "react";
import { FORM_ENDPOINT } from "../constants/data";

// =============================================
// TYPE DEFINITIONS
// =============================================
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormField {
  name: keyof FormData;
  type: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  placeholder: string;
  rows?: number;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

type SetStateFunction<T> = (value: T | ((prev: T) => T)) => void;

// =============================================
// FORM CONFIGURATION
// =============================================
const FORM_CONFIG = {
  endpoint: FORM_ENDPOINT,
  initialData: { name: "", email: "", message: "" } as FormData,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      icon: User,
      placeholder: "Your name",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      icon: Mail,
      placeholder: "your.email@example.com",
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      icon: FaRegCommentDots,
      placeholder: "What would you like to discuss?",
      rows: 4,
    },
  ] as FormField[],
};

// =============================================
// HELPER FUNCTIONS
// =============================================
const submitForm = async (
  formData: FormData,
  setStatus: SetStateFunction<FormStatus>,
  setErrorMessage: SetStateFunction<string>,
  setFormData: SetStateFunction<FormData>
) => {
  setStatus("submitting");
  setErrorMessage("");

  try {
    const response = await fetch(FORM_CONFIG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("success");
      setFormData(FORM_CONFIG.initialData);
    } else {
      const errorData = await response.json();
      setErrorMessage(
        errorData.error || "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  } catch {
    setErrorMessage("An unexpected error occurred. Please try again.");
    setStatus("error");
  }
};

const renderField = (
  field: FormField,
  formData: FormData,
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
) => {
  const Icon = field.icon;
  const commonClasses =
    "w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-border-hover";

  return (
    <div key={field.name}>
      <label htmlFor={field.name} className="block text-sm font-medium mb-2">
        {field.label}
      </label>
      <div className="relative text-sm">
        <div
          className={`absolute ${field.type === "textarea" ? "top-3" : "inset-y-0"} left-3 flex items-center text-muted-foreground`}
        >
          <Icon className="w-5 h-5" />
        </div>
        {field.type === "textarea" ? (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
            placeholder={field.placeholder}
            rows={field.rows}
            className={`${commonClasses} resize-none`}
          />
        ) : (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
            placeholder={field.placeholder}
            className={commonClasses}
          />
        )}
      </div>
    </div>
  );
};

// =============================================
// MAIN COMPONENT
// =============================================
const Contact = () => {
  const [formData, setFormData] = useState<FormData>(FORM_CONFIG.initialData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitForm(formData, setStatus, setErrorMessage, setFormData);
  };

  return (
    <section className="py-5">
      <h2 className="text-xl font-semibold mb-4">let&apos;s connect.</h2>

      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          I&apos;d love to hear from you! Whether you have a question, want to
          discuss a project, or just want to say hi, feel free to reach out
          using the form below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 p-2">
          {FORM_CONFIG.fields.map((field) =>
            renderField(field, formData, handleChange)
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className={`w-full px-3 py-2 rounded-lg text-sm btn font-medium flex items-center justify-center gap-2 ${status === "submitting" ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {status === "submitting" ? (
              "Sending..."
            ) : (
              <>
                <span>Send Message</span>{" "}
                <LuMessageSquareShare className="w-4 h-4" />
              </>
            )}
          </button>

          {status === "success" && (
            <p className="text-green-600 text-sm text-center">
              Got your message! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
