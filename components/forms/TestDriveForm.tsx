"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Reveal, FieldShake, PopIn } from "@/components/motion";
import { site } from "@/lib/data";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number")
    .regex(/^[+\d\s()-]+$/, "Use digits and phone characters only"),
  email: z.string().email("Please enter a valid email"),
  city: z.string().min(1, "Select a city"),
  showroomId: z.string().min(1, "Select a showroom"),
  preferredDate: z.string().min(1, "Choose a preferred date"),
  preferredTime: z.string().min(1, "Choose a preferred time"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function TestDriveForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "",
      showroomId: "",
      preferredDate: "",
      preferredTime: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/test-drive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "Something went wrong. Please try again or call us directly.",
      );
    }
  };

  if (status === "success") {
    return (
      <PopIn>
        <div
          className="rounded-sm border border-gold/40 bg-ink-soft p-8"
          role="status"
        >
          <h3 className="font-display text-2xl text-mist">Request received</h3>
          <p className="mt-3 leading-relaxed text-mist-dim">
            Thank you. Our team will confirm your test drive shortly. For a
            faster reply, WhatsApp us on {site.whatsapp}.
          </p>
          <Button
            type="button"
            variant="secondary"
            className="mt-6"
            onClick={() => setStatus("idle")}
          >
            Submit another request
          </Button>
        </div>
      </PopIn>
    );
  }

  return (
    <Reveal>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldShake shake={Boolean(errors.name)}>
            <Input
              label="Full name"
              autoComplete="name"
              error={errors.name?.message}
              {...register("name")}
            />
          </FieldShake>
          <FieldShake shake={Boolean(errors.phone)}>
            <Input
              label="Phone"
              type="tel"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </FieldShake>
        </div>
        <FieldShake shake={Boolean(errors.email)}>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </FieldShake>
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldShake shake={Boolean(errors.city)}>
            <Select
              label="City"
              placeholder="Select a city"
              error={errors.city?.message}
              options={site.cities.map((city) => ({
                value: city,
                label: city,
              }))}
              {...register("city")}
            />
          </FieldShake>
          <FieldShake shake={Boolean(errors.showroomId)}>
            <Select
              label="Preferred showroom"
              placeholder="Select a showroom"
              error={errors.showroomId?.message}
              options={site.showrooms.map((s) => ({
                value: s.id,
                label: `${s.name} — ${s.city}`,
              }))}
              {...register("showroomId")}
            />
          </FieldShake>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FieldShake shake={Boolean(errors.preferredDate)}>
            <Input
              label="Preferred date"
              type="date"
              error={errors.preferredDate?.message}
              {...register("preferredDate")}
            />
          </FieldShake>
          <FieldShake shake={Boolean(errors.preferredTime)}>
            <Input
              label="Preferred time"
              type="time"
              error={errors.preferredTime?.message}
              {...register("preferredTime")}
            />
          </FieldShake>
        </div>
        <FieldShake shake={Boolean(errors.message)}>
          <Textarea
            label="Message (optional)"
            error={errors.message?.message}
            {...register("message")}
          />
        </FieldShake>

        {status === "error" ? (
          <p className="text-sm text-red-500" role="alert">
            {errorMessage}
          </p>
        ) : null}

        <Button type="submit" variant="gold" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Book a Test Drive"}
        </Button>
      </form>
    </Reveal>
  );
}
