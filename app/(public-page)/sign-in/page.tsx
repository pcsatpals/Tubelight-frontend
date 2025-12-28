"use client"

import StarBorder from '@/components/animation/StarBorder'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Eye, EyeClosed, LockKeyhole, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import GoogleLogo from "@/public/google-logo.svg"
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useState } from 'react'

const loginSchema = z.object({
    email: z.string().email("Invalid email address").trim(),
    password: z.string().nonempty("Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false)
    // 2. Initialize Form
    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 3. Submit Handler
    async function onSubmit(values: LoginFormData) {
        await toast.promise(
            (async () => {
                const result = await signIn("credentials", {
                    ...values,
                    redirect: false, // Must be false to handle errors manually
                });

                if (result?.error) {
                    // This triggers the 'error' state in toast.promise
                    throw new Error(result.error);
                }

                // Success - manually redirect
                window.location.href = "/dashboard";
                return result;
            })(),
            {
                pending: "Logging in...",
                success: "Log in successful! Redirecting...",
                error: {
                    render({ data }) {
                        // 'data' here is the error object thrown by handleRegisterAction
                        return data && typeof data == "object" && "message" in data ? data?.message as string : "Login failed. Please try again.";
                    },
                },
            });
    }


    async function handleGoogleLogin() {
        try {
            toast.info("Redirecting to Google...", { autoClose: 2000 });

            // OAuth providers usually need redirect: true to function correctly
            // because they must leave your site to go to accounts.google.com
            await signIn("google", {
                callbackUrl: "/dashboard", // Where to go after Google is done
                redirect: true,
            });
        } catch (error) {
            toast.error("Failed to initialize Google login.");
            console.error(error);
        }
    }

    return (
        <Card className="mx-auto bg-background/40 rounded-3xl border backdrop-blur-xl w-125 sm:p-8 p-5">
            <CardHeader className="flex flex-col items-center px-0">
                <div className='md:w-16 md:h-16 h-12 w-12 md:[&_svg]:size-8 [&_svg]:size-5 flex items-center justify-center bg-white shrink-0 text-background rounded-2xl'>
                    <LogIn />
                </div>
                <div className='flex mt-4 flex-col item-center text-center gap-1 '>
                    <CardTitle className='md:text-2xl text-xl font-bold'>Sign in with email</CardTitle>
                    <CardDescription
                        className='md:text-sm text-xs'>
                        Sign in to enjoy a personalized, video‑first experience with interactive thumbnails, smooth animations, and a fully responsive layout.
                    </CardDescription>
                </div>

                <FieldGroup className='mt-2'>
                    <Field>
                        {/* <Button variant="outline" type="button" className='rounded-3xl'>
                            <AppleLogo />
                            Login with Apple
                        </Button> */}
                        <Button variant="outline" type="button" className='rounded-3xl' onClick={handleGoogleLogin}>
                            <GoogleLogo />
                            Login with Google
                        </Button>
                    </Field>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                        Or continue with
                    </FieldSeparator>
                </FieldGroup>
            </CardHeader>
            <CardContent className='px-0'>
                <Form {...form}>
                    <form
                        className='w-full mt-4 flex flex-col gap-2'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col relative [&_svg]:size-5">
                                    <Mail className='absolute left-3 top-5 -translate-y-1/2' />
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className='h-10 pl-12 rounded-xl'
                                            placeholder="Email"
                                            required
                                        />
                                    </FormControl>

                                    <FormMessage className='-mt-3 mb-3' />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center relative [&_svg]:size-5">
                                    <LockKeyhole className='absolute left-3 top-5 -translate-y-1/2' />
                                    <FormControl>
                                        <Input
                                            className='h-10 pl-12'
                                            {...field}
                                            placeholder='Password'
                                            type={showPassword ? "text" : "password"}
                                            required
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-5 -translate-y-1/2 h-full px-3 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                                    </Button>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <a
                            href="#"
                            className="float-end my-1 mb-3 text-sm underline-offset-4 hover:underline"
                        >
                            Forgot your password?
                        </a>

                        <StarBorder
                            className="h-12 w-full"
                            color="cyan"
                            speed="5s"
                        >
                            <p className="w-full h-full flex text-center items-center justify-center">
                                Sign in
                            </p>
                        </StarBorder>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className='px-0'>
                <FieldDescription className="text-center mx-auto">
                    Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
            </CardFooter>
        </Card >
    )
}

export default SignIn
