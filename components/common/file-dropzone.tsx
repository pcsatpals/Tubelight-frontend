"use client";

import React, { useRef } from "react";
import { UploadCloud, Upload, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            className="relative h-full cursor-pointer shrink-0 border rounded-2xl shadow-sm hover:shadow-lg shadow-white/30 min-h-150 min-w-120 bg-black/10 backdrop-blur-3xl flex items-center justify-center transition"
        >
            {/* hidden input */}
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
            />

            <div className="absolute top-[10%] right-10 [&_svg]:size-10">
                <FileUp />
            </div>

            {value ? (
                // ✅ File Selected UI
                <div className="flex flex-col items-center gap-4 text-center">
                    <UploadCloud className="size-12 text-green-500" />

                    <p className="text-xl font-semibold">{value.name}</p>

                    <p className="text-sm opacity-70">
                        {(value.size / 1024 / 1024).toFixed(2)} MB
                    </p>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(null);
                        }}
                    >
                        Remove File
                    </Button>
                </div>
            ) : (
                // ✅ Empty State UI
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
            )}
        </div>
    );
}
