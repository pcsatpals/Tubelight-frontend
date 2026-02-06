import { Video } from "@/features/dashboard/hooks/use-infinite-videos";
import apiClient from "@/lib/api-client";

export type CreateVideoPayload = {
    video: File;
    thumbnail: File;
    title: string;
    description: string;
    duration: number;
    isPublic: boolean;
    isPublished: boolean;
};

export const createVideo = async (
    body: CreateVideoPayload
): Promise<{ data: Video }> => {
    const formData = new FormData();

    Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
    });

    const { data } = await apiClient.post(
        "/v1/video",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};
