


"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

// Zod validation
const formSchema = z
  .object({
    fullname: z.string().trim().min(1, "Please enter your full name"),
    username: z.string().trim().min(1, "Please enter a username"),
    email: z
      .string()
      .email("Please enter a valid email address"),

    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters long",
      })
      .max(20, {
        message: "Password cannot exceed 20 characters",
      })
      .regex(/[A-Z]/, {
        message: "Must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Must contain at least one special character",
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function RegisterFormComponent() {
  const router = useRouter()

  // React Hook Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Register logic
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // Don't send confirmPassword to the backend
      const postData = {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        password: data.password,
      }

      const res = await fetch(
        "https://sombobaeb.cheat.casa/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        }
      )

      if (res.ok) {
        toast.success("Register Successfully!")

        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        toast.error("Registration failed. Email may already exist.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <Card className="w-full rounded-[2rem] border border-border bg-card text-card-foreground shadow-sm ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
      <Toaster />

      <CardHeader className="gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Your account</p>
        <CardTitle><h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">Make yourself at home.</h1></CardTitle>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">Create your account and start exploring the collection.</p>
      </CardHeader>

      <CardContent>
        <form
          id="form-rhf-register"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-5">
            <Controller
              name="fullname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-fullname">Full name</FieldLabel>
                  <Input
                    className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-950 placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:ring-amber-400/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    {...field}
                    id="register-fullname"
                    placeholder="Enter your full name"
                    autoComplete="name"
                    aria-invalid={fieldState.invalid}
                    aria-describedby={fieldState.invalid ? "register-fullname-error" : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="register-fullname-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-username">Username</FieldLabel>
                  <Input
                    className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-950 placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:ring-amber-400/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    {...field}
                    id="register-username"
                    placeholder="Choose a username"
                    autoComplete="username"
                    autoCapitalize="none"
                    spellCheck={false}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={fieldState.invalid ? "register-username-error" : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="register-username-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-email">
                    Email
                  </FieldLabel>

                  <Input
                    className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-950 placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:ring-amber-400/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    {...field}
                    type="email"
                    id="register-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-password">
                    Password
                  </FieldLabel>

                  <Input
                    className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-950 placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:ring-amber-400/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    {...field}
                    type="password"
                    id="register-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="register-confirm-password">
                    Confirm Password
                  </FieldLabel>

                  <Input
                    className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-950 placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:ring-amber-400/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    {...field}
                    type="password"
                    id="register-confirm-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-5 border-border bg-muted/50">
        <Field orientation="horizontal">
          <Button
            type="submit"
            form="form-rhf-register"
            className="h-12 w-full rounded-full bg-amber-400 text-sm font-bold text-slate-950 shadow-none hover:bg-amber-300 focus-visible:ring-amber-400/40"
          >
            Register
          </Button>
        </Field>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-slate-950 underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-700 dark:text-slate-100">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
