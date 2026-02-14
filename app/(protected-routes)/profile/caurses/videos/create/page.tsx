"use client";

import FileDropzone from '@/components/common/file-dropzone';
import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field';
import { Form, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { AddPlaylistModel } from '@/features/create-update-video/components/common/add-playlist-dialog';
import { useGetPlaylists } from '@/features/create-update-video/hooks/use-get-playlists';
import { addVideoToPlaylist } from '@/features/create-update-video/services/add-playlist';
import { createVideo, CreateVideoPayload } from '@/features/create-update-video/services/create-video';
import FormFieldWrapper from '@/features/dashboard/components/common/form-field-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { HatGlasses, TextCursorInput, Users } from 'lucide-react'
import { useSession } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from "zod";

const fileOrUrl = z.union([
    z.any().refine((file) => file instanceof File, {
        message: "Must be a file",
    }),
    z.string().url("Must be a valid URL"),
]);

const videoFormSchema = z.object({
    video: fileOrUrl,
    thumbnail: fileOrUrl,
    title: z
        .string()
        .min(5, "Title must be at least 5 characters."),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters."),
    duration: z.number()
        .positive("Duration must be greater than 0"),
    isPublic: z.boolean(),
    hasPlaylist: z.string(),
    playlist: z.string().optional(),
});

type VideoFormData = z.infer<typeof videoFormSchema>;

const CreateVideo = () => {
    const { data } = useSession();
    const { data: playlists, isLoading, refetch } = useGetPlaylists(data?.user.id as string)
    const form = useForm<VideoFormData>({
        resolver: zodResolver(videoFormSchema),
        defaultValues: {
            title: "",
            description: "",
            duration: 1,
            isPublic: true,
            thumbnail: undefined,
            video: undefined,
            hasPlaylist: "None"
        },
    });

    const hasPlaylist = form.watch("hasPlaylist");

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (values: VideoFormData) => {
            const res = await createVideo(values as unknown as CreateVideoPayload);

            if (values.hasPlaylist && values.playlist) {
                await addVideoToPlaylist({
                    playlistId: values.playlist,
                    videoId: res.data._id,
                });
            }

            return res;
        },
    });

    const onSubmit = async (values: VideoFormData) => {
        await toast.promise(
            mutateAsync(values),
            {
                pending: "Uploading video... 🎬",
                success: "Video uploaded successfully 🚀",
                error: "Failed to upload video 🤯",
            }
        );

        form.reset();
    };

    return (
        <div className='p-6 flex flex-col gap-4 grow'>
            <div className='flex flex-col gap-2 pb-4 border-b'>
                <h1 className='text-5xl font-bold text-stroke-1'>Upload Lesson Video</h1>
                <p className='text-sm sm:text-base text-white/80'>Upload your lesson video and provide the necessary details to publish it inside your book.</p>
            </div>
            <Form {...form}>
                <form className='flex xl:flex-row flex-col gap-10 grow' onSubmit={form.handleSubmit(onSubmit)}>
                    <Controller
                        name='video'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className='xl:w-fit w-full xl:h-full'>
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
                                            <SelectTrigger className='w-full text-base !h-12 rounded-full'>
                                                <SelectValue placeholder="Who can view this Video" />
                                            </SelectTrigger>
                                            <SelectContent align='end' position='popper' className='bg-white text-black '>
                                                <SelectItem value="public"><Users />All People (Public)</SelectItem>
                                                <SelectItem value="private"><HatGlasses />Learners only (Private)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
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
                        <Controller
                            name='thumbnail'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className='xl:w-fit w-full xl:h-full'>
                                    <FormLabel className="flex gap-0.5 text-sm font-inter ">
                                        Select Thumbnail
                                    </FormLabel>
                                    <FileDropzone
                                        onChange={field.onChange}
                                        value={field.value}
                                        accept='image/*'
                                    />
                                    <FormMessage />
                                </Field>
                            )}
                        />
                        <Controller
                            name='hasPlaylist'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex gap-0.5 text-sm font-inter ">
                                        <span>Lesson</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className='w-full text-base !h-12 rounded-full'>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent align='end' position='popper' className='bg-white text-black '>
                                                {["None", "Use Existing Lesson", "Create New Lesson"].map(
                                                    (k, ix) => (
                                                        <SelectItem
                                                            value={k}
                                                            key={ix}
                                                            className='capitalize'
                                                        >
                                                            {k}
                                                        </SelectItem>))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        {hasPlaylist == "Use Existing Lesson" && <Controller
                            name='playlist'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex gap-0.5 text-sm font-inter ">
                                        <span>Select Lesson</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className={`w-full text-base !h-12 rounded-full ${isLoading && "[&_svg]:hidden p-0"}`} disabled={isLoading}>
                                                {isLoading ? <Skeleton className='w-full h-10' /> : <SelectValue placeholder="Select Existing Lesson" />}
                                            </SelectTrigger>
                                            <SelectContent align='end' position='popper' className='bg-white text-black '>
                                                {((playlists?.length || 0) > 0) ? playlists?.map(
                                                    (k, ix) => (
                                                        <SelectItem
                                                            value={k._id}
                                                            key={ix}
                                                            className='capitalize'
                                                        >
                                                            {k.name}
                                                        </SelectItem>)) : <p className='py-4 text-center text-sm'>No Result found</p>}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />}
                        {hasPlaylist == "Create New Lesson" && <AddPlaylistModel onSuccess={async (_id) => {
                            await refetch()
                            form.setValue("playlist", _id)
                            form.setValue("hasPlaylist", "Use Existing Lesson")
                        }}
                        />}
                        <div className='w-full flex items-center justify-between'>
                            <Button variant="ghost" type='button' disabled={isPending} onClick={() => {
                                form.reset()
                            }}>
                                Reset
                            </Button>
                            <Button disabled={isPending}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>

        </div >
    )
}

export default CreateVideo
