"use client";

import LightRays from '@/components/animation/LightRays'
import StarBorder from '@/components/animation/StarBorder'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldGroup, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LockKeyhole, LogIn, Mail, Upload, User } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'

const SignUp = () => {
    return (
        <div className='w-full min-h-screen relative bg-black font-figtree'>
            <LightRays
                raysOrigin="top-center"
                raysColor="#9179af"
                raysSpeed={1.5}
                lightSpread={0.8}
                rayLength={1.2}
                followMouse={true}
                mouseInfluence={0.1}
                noiseAmount={0.1}
                distortion={0.05}
                className="custom-rays"
            />
            <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center py-6 px-3'>
                <SignupForm />
            </div>
        </div >
    )
}

export default SignUp



function SignupForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [profilePic, setProfilePic] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, profilePic: "Image must be less than 5MB" })
                return
            }

            if (!file.type.startsWith("image/")) {
                setErrors({ ...errors, profilePic: "Please upload a valid image file" })
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePic(reader.result as string)
                setErrors({ ...errors, profilePic: "" })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
        setErrors({ ...errors, [name]: "" })
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!profilePic) {
            newErrors.profilePic = "Profile picture is required"
        }

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters"
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            console.log("[v0] Form submitted:", { ...formData, profilePic })
            // Handle signup logic here
            alert("Signup successful!")
        }
    }

    return (
        <Card className=" mx-auto bg-background/40 rounded-3xl border-2 backdrop-blur-4xl w-125 h-fit max-h-fit pb-6">
            <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>Enter your details below to create your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <Avatar className="w-24 h-24">
                                {profilePic ? (
                                    <AvatarImage src={profilePic || "/placeholder.svg"} alt="Profile" />
                                ) : (
                                    <AvatarFallback className="bg-muted">
                                        <User className="w-12 h-12 text-muted-foreground" />
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <label
                                htmlFor="profile-pic"
                                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                <input id="profile-pic" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                            </label>
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium">Profile Picture *</p>
                            <p className="text-xs text-muted-foreground">Click the icon to upload (Max 5MB)</p>
                            {errors.profilePic && <p className="text-xs text-destructive mt-1">{errors.profilePic}</p>}
                        </div>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={errors.fullName ? "border-destructive" : ""}
                        />
                        {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password *</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={errors.password ? "border-destructive" : ""}
                        />
                        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password *</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={errors.confirmPassword ? "border-destructive" : ""}
                        />
                        {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                    </div>

                    <StarBorder
                        className="h-12 w-full"
                        color="cyan"
                        speed="5s"
                    >
                        <p className="w-full h-full flex text-center items-center justify-center">
                            Sign Up
                        </p>
                    </StarBorder>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}