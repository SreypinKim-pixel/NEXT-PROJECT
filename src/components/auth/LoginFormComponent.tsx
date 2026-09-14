

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
import { redirect } from "next/navigation"


// using zod validation
const formSchema = z.object({
  email: z
    .string()
    .email("Required @ for email")
   ,
  password: z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password cannot exceed 20 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" })
})

export function LoginFormComponent() {
  // using react hook form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // logic with form 
  function onSubmit(data: z.infer<typeof formSchema>) {
      const postdata = async () =>{
        const res = await fetch('https://sombobaeb.cheat.casa/auth/login',{
          method:'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body:JSON.stringify(data)
        })
        if(res.ok){
          toast.success("Login Successfully!")
          setTimeout(()=> {
            redirect('/product')
          },2000)
        }else{
          toast.error("Incorrect password or email");
        }
      }
      postdata();
  }

  return (
    <Card className="w-full rounded-[2rem] border border-border bg-card text-card-foreground shadow-sm ring-0 [--card-spacing:--spacing(6)] sm:[--card-spacing:--spacing(8)]">
      <Toaster/>
      <CardHeader className="gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Your account</p>
        <CardTitle><h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">Welcome back.</h1></CardTitle>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">Log in to find your next everyday favorite.</p>
        {/* <CardDescription>
          Help us improve by reporting bugs you encounter.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-950 placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:ring-amber-400/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                    {...field}
                    type="email" //input as email
                    id="form-rhf-demo-title"
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
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-description">
                    Password
                  </FieldLabel>
                    <Input
                    className="h-12 rounded-xl border-slate-300 bg-slate-50 px-4 text-slate-950 placeholder:text-slate-400 focus-visible:border-amber-500 focus-visible:ring-amber-400/25 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                      {...field}
                      id="form-rhf-demo-description"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      type="password" //add input as password
                      // className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
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
          {/* <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button> */}
          <Button type="submit" form="form-rhf-demo" className="h-12 w-full rounded-full bg-amber-400 text-sm font-bold text-slate-950 shadow-none hover:bg-amber-300 focus-visible:ring-amber-400/40">
            Login
          </Button>
        </Field>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-slate-950 underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-700 dark:text-slate-100">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
