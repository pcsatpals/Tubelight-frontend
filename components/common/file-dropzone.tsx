"use client";

import React, { useRef } from "react";
import { UploadCloud, Upload, FileUp, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type FileDropzoneProps = {
    value?: File | null;
    onChange: (file: File | null) => void;
    accept?: string;
    maxSizeMB?: number;
};

export default function FileDropzone({
    value,
    onChange,
    accept = "video/mp4,video/webm",
    maxSizeMB = 3,
}: FileDropzoneProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleFile = (file?: File) => {
        if (!file) return;

        // size validation
        if (file.size > maxSizeMB * 1024 * 1024) {
            alert(`File must be smaller than ${maxSizeMB}MB`);
            return;
        }

        onChange(file);
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div
            tabIndex={0}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={accept.includes("video") ? "relative cursor-pointer shrink-0 border rounded-2xl shadow-sm hover:shadow-lg shadow-white/30 xl:min-h-150 h-fit py-10 xl:min-w-120 max-w-full  bg-black/10 backdrop-blur-3xl flex items-center justify-center transition" : ""}
        >
            {/* hidden input */}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
            />



            {value ? (
                <>
                    {accept.includes("video") ? <div className="relative h-full w-full">

                        <video
                            src={URL.createObjectURL(value)}
                            controls
                            className="w-full h-full absolute top-0 bottom-0 left-0"
                        />

                        <Button
                            type="button"
                            variant="ghost"
                            className="absolute right-4 bg-white rounded-full text-black h-8 w-8"

                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(null);
                            }}
                        >
                            <X />
                        </Button>
                    </div> : <div
                        className="flex relative items-center justify-center w-25 h-40 rounded-2xl overflow-hidden group">
                        <Image
                            height={600}
                            width={600}
                            alt={value.name}
                            src={URL.createObjectURL(value)}
                            className="w-full h-full object-cover"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            className="absolute hidden group-hover:flex right-0 top-0 bg-white/10 rounded-full text-black h-6 w-6"

                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(null);
                            }}
                        >
                            <X />
                        </Button>
                    </div>}
                </>
            ) : (
                <>
                    {accept.includes("video") ? <>
                        <div className="absolute top-[10%] right-10 [&_svg]:size-10">
                            <FileUp />
                        </div>
                        <div className="w-fit flex flex-col items-center justify-center gap-6">
                            <div className="flex items-center justify-center bg-white shadow-lg text-purple-600 rounded-full h-12 w-12 [&_svg]:size-8">
                                <UploadCloud />
                            </div>

                            <div className="flex gap-2 flex-col items-center text-center">
                                <p className="text-2xl font-bold">
                                    Select Video to Upload
                                </p>

                                <p>
                                    Supported Format: MP4, WEBM <br />
                                    ({maxSizeMB} MB)
                                </p>
                            </div>

                            <Button
                                type="button"
                                className="rounded-full text-xl font-semibold [&_svg]:!size-5 h-12 !px-6 mt-4"
                            >
                                Select File <Upload />
                            </Button>
                        </div>
                    </> : (
                        <div
                            className="flex items-center justify-center w-25 h-40 border border-dashed border-primary rounded-2xl">
                            <Plus />
                        </div>)
                    }
                </>
            )}
        </div>
    );
}




