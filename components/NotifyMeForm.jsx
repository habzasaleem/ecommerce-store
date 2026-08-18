"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const notifyMeSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export function NotifyMeForm({ productName = "this product" }) {
  const [submittedEmail, setSubmittedEmail] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(notifyMeSchema),
  });

  const onSubmit = (data) => {
    setSubmittedEmail(data.email);
    reset();
  };

  if (submittedEmail) {
    return (
      <p className="text-sm text-green-700">
        We'll email {submittedEmail} when {productName} is back in stock.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">
      <label htmlFor="notify-email" className="block text-sm font-medium text-neutral-700">
        Notify me when back in stock
      </label>
      <div className="flex gap-2">
        <input
          id="notify-email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "notify-email-error" : undefined}
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          {...register("email")}
        />
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
        >
          Notify me
        </button>
      </div>
      {errors.email && (
        <p id="notify-email-error" role="alert" className="text-xs text-red-600">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}