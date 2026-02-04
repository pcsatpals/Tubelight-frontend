"use client";

import FileDropzone from '@/components/common/file-dropzone';
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field';
import { Form, FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import FormFieldWrapper from '@/features/dashboard/components/common/form-field-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileUp, HatGlasses, TextCursorInput, Upload, UploadCloud, Users } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";

const fileOrUrl = z.union([
    z.any().refine((file) => file instanceof File, {
        message: "Must be a file",
    }),
    z.string().url("Must be a valid URL"),
]);

const videoFormSchema = z.object({
    videoFile: fileOrUrl,
    thumbnail: fileOrUrl,
    title: z
        .string()
        .min(5, "Title must be at least 5 characters.")
        .max(32, "Title must be at most 32 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters.")
        .max(100, "Description must be at most 100 characters."),
    duration: z.number()
        .positive("Duration must be greater than 0"),
    isPublic: z.boolean(),
    isPublished: z.boolean(),
});

type VideoFormData = z.infer<typeof videoFormSchema>;

const CreateVideo = () => {
    const form = useForm<VideoFormData>({
        resolver: zodResolver(videoFormSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: 1,
            isPublic: true,
            isPublished: true,
            thumbnail: undefined,
            videoFile: undefined,
        },
    });

    return (
        <div className='p-6 flex flex-col gap-4 grow'>
            <div className='flex flex-col gap-2 pb-4 border-b'>
                <h1 className='text-5xl font-bold text-stroke-1'>Upload Your Video File</h1>
                <p className='text-sm sm:text-base text-white/80'>Upload your video file and other details related to the Video</p>
            </div>
            <Form {...form}>
                <form className='flex gap-10 grow'>
                    <Controller
                        name='videoFile'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className='w-fit h-full'>
                                <FileDropzone
                                    onChange={field.onChange}
                                    value={field.value}
                                />
                            </Field>
                        )}
                    />
                    <div className='flex flex-col grow gap-4 [&_label]:-mb-1 [&_label]:text-lg'>
                        <FormFieldWrapper
                            component={Input}
                            control={form.control}
                            name='title'
                            label='Title'
                            placeholder='Enter Video Title here'
                            className='pl-12 rounded-full h-12'
                            icon={<TextCursorInput />}
                        />
                        <Controller
                            name='isPublic'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex gap-0.5 text-sm font-inter ">
                                        <span>Who can View</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Select value={field.value ? "public" : "private"} onValueChange={(v) => {
                                            field.onChange(v == "private" ? false : true)
                                        }}>
                                            <SelectTrigger className='w-full text-base'>
                                                <SelectValue placeholder="Who can view this Video" />
                                            </SelectTrigger>
                                            <SelectContent align='end' position='popper' className='bg-white text-black '>
                                                <SelectItem value="public"><Users />All People (Public)</SelectItem>
                                                <SelectItem value="private"><HatGlasses />Subscribers only (Private)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormFieldWrapper
                            component={Textarea}
                            control={form.control}
                            name='description'
                            label='Description'
                            placeholder='Enter Video Details'
                            className='rounded-3xl min-h-30 p-4'
                        />
                    </div>
                </form>
            </Form>

        </div >
    )
}

export default CreateVideo
