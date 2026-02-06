"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import Link from "next/link";
import { Eye, EyeClosed, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldSeparator } from "@/components/ui/field";
import GoogleLogo from "@/public/google-logo.svg"
import StarBorder from "@/components/animation/StarBorder";
import { signIn } from "next-auth/react";
import { handleRegisterAction } from "../services/auth.api";

// 1. Define Schema
const signupSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters").trim(),
    email: z.string().email("Invalid email address").trim(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    avatar: z.instanceof(File, { message: "Profile picture is required" })
        .refine((file) => file.size <= 5 * 1024 * 1024, "Max file size is 5MB")
        .refine((file) => file.type.startsWith("image/"), "Only image files are accepted"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // 2. Initialize Form
    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    // 3. Submit Handler
    async function onSubmit(values: SignupFormData) {
        const data = new FormData();
        data.append("fullName", values.fullName);
        data.append("email", values.email);
        data.append("password", values.password);
        data.append("avatar", values.avatar);

        await toast.promise((async () => {
            // 1. Call the Server Action (Hides your backend API from Network tab)
            const result = await handleRegisterAction(data);

            if (!result.success) {
                // This will be caught by the 'error' section of toast.promise
                throw new Error(result.message);
            }

            // 2. Registration success! Now sign in to create the session cookie
            const signRes = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false, // Don't redirect yet so toast can finish
            });

            if (signRes?.error) {
                throw new Error("Account created, but could not sign in automatically.");
            }

            // 3. Success! Redirect the user
            window.location.href = "/dashboard";

            return result; // Resolves the promise for the toast
        })(), {
            pending: "Creating your account...",
            success: "Registration successful! Redirecting...",
            error: {
                render({ data }) {
                    return data && typeof data == "object" && "message" in data ? data?.message as string : "Registration failed. Please try again.";
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
            <CardHeader className="px-0">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent className="px-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

                        {/* Avatar Upload Field */}
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field: { value, onChange, ...fieldProps } }) => (
                                <FormItem className="flex flex-col items-center gap-0">
                                    <div className="relative">
                                        <Avatar className="w-24 h-24 border-2">
                                            <AvatarImage src={previewUrl || ""} className="object-cover" />
                                            <AvatarFallback>
                                                <User className="w-12 h-12" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <FormLabel htmlFor="avatar" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:opacity-90">
                                            <Upload className="w-4 h-4 text-accent" />
                                            <Input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setPreviewUrl(URL.createObjectURL(file));
                                                        onChange(file);
                                                    }
                                                }}
                                                {...fieldProps}
                                                id="avatar"
                                            />
                                        </FormLabel>
                                    </div>
                                    <div className="text-center mt-2">
                                        <p className="text-sm font-medium">Profile Picture *</p>
                                        <p className="text-xs text-muted-foreground">Click the icon to upload (Max 5MB)</p>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Full Name */}
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="john@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password *</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                {...field}
                                                placeholder="••••••••"
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password *</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? <Eye className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <StarBorder
                            className="h-12 w-full"
                            color="cyan"
                            speed="5s"
                        >
                            <p className="w-full h-full flex text-center items-center justify-center">
                                {form.formState.isSubmitting ? "Registering..." : "Sign Up"}
                            </p>
                        </StarBorder>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 px-0">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-primary underline">
                        Sign in
                    </Link>
                </p>
                <FieldGroup className='px-0 mt-3'>
                    <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                        Or continue with
                    </FieldSeparator>
                    <Field>
                        {/* <Button variant="outline" type="button" className='rounded-3xl opacity-70'>
                            <AppleLogo />
                            Login with Apple
                        </Button> */}
                        <Button variant="outline" type="button" className='rounded-3xl opacity-70' onClick={handleGoogleLogin}>
                            <GoogleLogo />
                            Login with Google
                        </Button>
                    </Field>
                </FieldGroup>
            </CardFooter>
        </Card>
    );
}