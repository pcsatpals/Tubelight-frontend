import LightRays from '@/components/animation/LightRays'
import StarBorder from '@/components/animation/StarBorder'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { LockKeyhole, LogIn, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const SignIn = () => {
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
                <div className='bg-background/40 rounded-3xl border-2 backdrop-blur-4xl w-125 h-fit max-h-full flex flex-col items-center sm:p-10 p-5'>
                    <div className='md:w-16 md:h-16 h-12 w-12 md:[&_svg]:size-8 [&_svg]:size-5 flex items-center justify-center bg-white shrink-0 text-background rounded-2xl'>
                        <LogIn />
                    </div>
                    <div className='flex mt-4 flex-col item-center text-center gap-1 '>
                        <h1 className='md:text-2xl text-xl font-bold'>Sign in with email</h1>
                        <p className='md:text-sm text-xs'>Sign in to enjoy a personalized, video‑first experience with interactive thumbnails, smooth animations, and a fully responsive layout.</p>
                    </div>
                    <form className='w-full mt-4'>
                        <FieldGroup>
                            <Field>
                                <Button variant="outline" type="button" className='rounded-3xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Apple
                                </Button>
                                <Button variant="outline" type="button" className='rounded-3xl'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Login with Google
                                </Button>
                            </Field>
                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>
                            <div className='relative h-fit w-full [&_svg]:size-5'>
                                <Mail className='absolute left-3 top-5 -translate-y-1/2' />
                                <Input
                                    id="email"
                                    type="email"
                                    className='h-10 pl-12 rounded-[8px]'
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className='-mt-2 h-fit w-full'>
                                <div className="flex flex-col items-center relative [&_svg]:size-5">
                                    <LockKeyhole className='absolute left-3 top-5 -translate-y-1/2' />
                                    <Input
                                        id="password"
                                        className='h-10 pl-12 rounded-[8px]'
                                        type="password"
                                        placeholder='Password'
                                        required />
                                    <a
                                        href="#"
                                        className="ml-auto mt-1 text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <Field >
                                <StarBorder
                                    className="h-12 w-full"
                                    color="cyan"
                                    speed="5s"
                                >
                                    <p className="w-full h-full flex text-center items-center justify-center">
                                        Sign in
                                    </p>
                                </StarBorder>                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignIn
